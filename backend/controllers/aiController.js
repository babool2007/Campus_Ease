import OpenAI from "openai";

import Schedule from "../models/Schedule.js";
import Notice from "../models/Notice.js";
import Complaint from "../models/Complaint.js";
import Approval from "../models/Approval.js";
import Attendance from "../models/Attendance.js";
import Bus from "../models/Bus.js";

/* -----------------------------------------
   INTENT DETECTION
----------------------------------------- */

const detectIntent = (question) => {
  const text = question.toLowerCase().trim();

  // Greetings & Bot identity
  if (
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/.test(text) ||
    text.includes("who are you") ||
    text.includes("what can you do") ||
    text.includes("help me") ||
    text === "help"
  ) {
    return "greeting";
  }

  // Schedule & Timetable
  if (
    text.includes("schedule") ||
    text.includes("class") ||
    text.includes("timetable") ||
    text.includes("lecture") ||
    text.includes("period") ||
    text.includes("timing") ||
    text.includes("today's class") ||
    text.includes("todays class")
  ) {
    return "schedule";
  }

  // Attendance
  if (
    text.includes("attendance") ||
    text.includes("present") ||
    text.includes("absent") ||
    text.includes("percentage") ||
    text.includes("eligibility") ||
    text.includes("shortage")
  ) {
    return "attendance";
  }

  // Notices & Circulars
  if (
    text.includes("notice") ||
    text.includes("circular") ||
    text.includes("announcement") ||
    text.includes("update") ||
    text.includes("exam date") ||
    text.includes("holiday")
  ) {
    return "notices";
  }

  // Complaints & Grievances
  if (
    text.includes("complaint") ||
    text.includes("issue") ||
    text.includes("problem") ||
    text.includes("maintenance") ||
    text.includes("repair") ||
    text.includes("broken") ||
    text.includes("wifi") ||
    text.includes("water") ||
    text.includes("electricity")
  ) {
    return "complaints";
  }

  // Approvals & Permissions
  if (
    text.includes("approval") ||
    text.includes("request") ||
    text.includes("pending") ||
    text.includes("leave") ||
    text.includes("permission") ||
    text.includes("bonafide") ||
    text.includes("gate pass") ||
    text.includes("id card")
  ) {
    return "approvals";
  }

  // Bus & Transport
  if (
    text.includes("bus") ||
    text.includes("transport") ||
    text.includes("route") ||
    text.includes("driver") ||
    text.includes("pickup") ||
    text.includes("drop") ||
    text.includes("bus timing")
  ) {
    return "buses";
  }

  // Campus Services / Information
  if (
    text.includes("library") ||
    text.includes("cafeteria") ||
    text.includes("canteen") ||
    text.includes("hostel") ||
    text.includes("sports") ||
    text.includes("gym") ||
    text.includes("contact") ||
    text.includes("emergency") ||
    text.includes("phone") ||
    text.includes("helpline")
  ) {
    return "campus_info";
  }

  return "general";
};

/* -----------------------------------------
   CLEAN DATABASE DATA
----------------------------------------- */

const cleanSchedule = (item) => ({
  subject: item.subject,
  teacher: item.teacher,
  room: item.room,
  day: item.day,
  startTime: item.startTime,
  endTime: item.endTime,
  branch: item.branch,
  year: item.year,
});

const cleanNotice = (item) => ({
  title: item.title,
  description: item.description,
  category: item.category,
  priority: item.priority,
  audience: item.audience,
  publishedAt: item.createdAt,
});

const cleanComplaint = (item) => ({
  title: item.title,
  description: item.description,
  category: item.category,
  location: item.location,
  status: item.status,
  priority: item.priority,
  assignedTo: item.assignedTo || "Not assigned",
  reportedAt: item.createdAt,
});

const cleanApproval = (item) => ({
  title: item.title,
  description: item.description,
  category: item.category,
  status: item.status,
  remarks: item.remarks || "",
  requestedAt: item.createdAt,
});

const cleanAttendance = (item) => ({
  date: item.date,
  subject: item.subject,
  status: item.status,
});

const cleanBus = (item) => ({
  busNumber: item.busNumber,
  route: item.route,
  driver: item.driver,
  contact: item.contact,
  departureTime: item.departureTime,
  returnTime: item.returnTime,
  status: item.status,
  stops: item.stops,
});

/* -----------------------------------------
   INTELLIGENT LOCAL CAMPUS KNOWLEDGE ENGINE
   (Reliable RAG Fallback when LLM API is out of quota)
----------------------------------------- */

const generateLocalCampusResponse = ({ question, intent, user, campusData }) => {
  const userName = user?.name || "there";
  const userRole = user?.role || "student";

  // 1. GREETING
  if (intent === "greeting") {
    return `Hello **${userName}**! 👋

I am your **CampusEase AI Assistant**, ready to help with verified campus information.

Here is what you can ask me:
• 📅 **Schedule:** *"What classes do I have today?"* or *"Show class timetable"*
• 📊 **Attendance:** *"What is my attendance percentage?"*
• 📢 **Notices:** *"Show the latest campus notices"*
• 🛠️ **Complaints:** *"What is the status of my complaint?"*
• 📋 **Approvals:** *"Check pending approvals or leave status"*
• 🚌 **Transport:** *"What are the campus bus routes and timings?"*

How can I help you right now?`;
  }

  // 2. SCHEDULE
  if (intent === "schedule") {
    const list = campusData.schedules || [];
    if (list.length === 0) {
      return `📅 **Class Schedule**

No classes are currently scheduled in the system.
• If you believe this is an error, please check the **Schedule** section or contact your department administrator.`;
    }

    const items = list.slice(0, 8).map(
      (s) =>
        `• **${s.subject}** (${s.day || "Scheduled"})
   ⏰ **Time:** ${s.startTime} - ${s.endTime}
   📍 **Room:** ${s.room} | 👨‍🏫 **Faculty:** ${s.teacher}
   🎓 **Batch:** ${s.branch} (Year ${s.year})`
    );

    return `📅 **Campus Class Schedule:**

${items.join("\n\n")}

*Note: For the full weekly timetable, visit your Schedule dashboard.*`;
  }

  // 3. ATTENDANCE
  if (intent === "attendance") {
    const records = campusData.attendance || [];
    if (records.length === 0) {
      return `📊 **Attendance Summary for ${userName}:**

No attendance records are currently logged for your account.
• Once faculty members mark attendance for your subjects, your live attendance statistics and percentages will appear here automatically.
• **Requirement:** Minimum university exam eligibility threshold is **75%**.`;
    }

    const total = records.length;
    const presentCount = records.filter((r) => r.status === "Present").length;
    const absentCount = total - presentCount;
    const percentage = ((presentCount / total) * 100).toFixed(1);
    const isSafe = Number(percentage) >= 75;

    const recent = records
      .slice(0, 5)
      .map((r) => `  - ${r.date} | ${r.subject}: **${r.status}**`)
      .join("\n");

    return `📊 **Attendance Overview for ${userName}:**

• **Total Classes Recorded:** ${total}
• **Present:** ${presentCount} classes
• **Absent:** ${absentCount} classes
• **Overall Attendance:** **${percentage}%**
• **Status:** ${
      isSafe
        ? "✅ **Good Standing** (Above 75% examination eligibility threshold)"
        : "⚠️ **Low Attendance Warning** (Below required 75% threshold)"
    }

**Recent Sessions:**
${recent}

*Visit the Attendance tab for complete subject-by-subject insights.*`;
  }

  // 4. NOTICES
  if (intent === "notices") {
    const notices = campusData.notices || [];
    if (notices.length === 0) {
      return `📢 **Campus Notices & Announcements**

There are currently no new circulars or notices posted on the campus board. Check back later for academic and event updates!`;
    }

    const noticeList = notices.slice(0, 5).map((n, idx) => {
      const priorityBadge =
        n.priority === "Urgent" ? "🚨 [URGENT]" : n.priority === "Important" ? "⭐ [IMPORTANT]" : "📌";
      return `${idx + 1}. ${priorityBadge} **${n.title}**
   📂 Category: **${n.category}** | Audience: ${n.audience}
   📝 ${n.description}`;
    });

    return `📢 **Latest Campus Circulars & Notices:**

${noticeList.join("\n\n")}

*Access all downloadable attachments directly from the Notices portal.*`;
  }

  // 5. COMPLAINTS
  if (intent === "complaints") {
    const complaints = campusData.complaints || [];

    if (userRole === "student") {
      if (complaints.length === 0) {
        return `🛠️ **Campus Complaints**

You have not submitted any complaints yet.
• If you encounter facility, electrical, plumbing, hostel, or IT issues, you can file a new complaint easily under the **Complaints** tab.`;
      }

      const list = complaints.slice(0, 6).map((c, idx) => {
        const statusEmoji =
          c.status === "Resolved"
            ? "✅"
            : c.status === "In Progress"
            ? "🔄"
            : c.status === "Assigned"
            ? "👷"
            : "⏳";
        return `${idx + 1}. **${c.title}** (${c.category})
   ${statusEmoji} **Status:** **${c.status}** | Priority: ${c.priority}
   📍 **Location:** ${c.location}
   💬 ${c.description}`;
      });

      return `🛠️ **Your Registered Complaints (${complaints.length}):**

${list.join("\n\n")}

*Campus facilities personnel update progress directly in the system.*`;
    }

    // Faculty or Admin view
    return `🛠️ **Campus Grievance System Overview:**
Total Complaints Registered: **${complaints.length}**
Open Tickets: **${complaints.filter((c) => c.status !== "Resolved").length}**
Resolved Tickets: **${complaints.filter((c) => c.status === "Resolved").length}**

Review and assign tickets in the Complaints Management panel.`;
  }

  // 6. APPROVALS
  if (intent === "approvals") {
    const approvals = campusData.approvals || [];

    if (userRole === "student") {
      if (approvals.length === 0) {
        return `📋 **Approval Requests**

You have no pending or active approval requests.
• You can apply for leave, bonafide certificates, ID card re-issues, and on-duty permissions via the **Approvals** portal.`;
      }

      const list = approvals.slice(0, 6).map((a, idx) => {
        const statusEmoji =
          a.status === "Approved" ? "✅" : a.status === "Rejected" ? "❌" : "⏳";
        return `${idx + 1}. **${a.title}** (${a.category})
   ${statusEmoji} **Status:** **${a.status}**
   📝 ${a.description}${a.remarks ? `\n   💬 Remarks: *${a.remarks}*` : ""}`;
      });

      return `📋 **Your Approval Requests (${approvals.length}):**

${list.join("\n\n")}`;
    }

    // Faculty/Admin
    const pendingCount = approvals.filter((a) => a.status === "Pending").length;
    return `📋 **Approvals Management:**
Total Requests: **${approvals.length}**
Pending Verification: **${pendingCount}**

Go to the Approvals section to review, approve, or reject student requests.`;
  }

  // 7. BUSES
  if (intent === "buses") {
    const buses = campusData.buses || [];
    if (buses.length === 0) {
      return `🚌 **Campus Transportation**

No campus bus routes are currently registered in the database. Please contact the campus transport office or check notice boards for seasonal schedules.`;
    }

    const busList = buses.slice(0, 6).map((b) => {
      const stopsText =
        b.stops && b.stops.length > 0 ? b.stops.join(" ➔ ") : "Designated campus stops";
      return `• **Bus #${b.busNumber}** — **Route:** ${b.route}
   ⏰ **Departure:** ${b.departureTime} | **Return:** ${b.returnTime}
   👨‍✈️ **Driver:** ${b.driver} ${b.contact ? `(📞 ${b.contact})` : ""}
   📍 **Stops:** ${stopsText}
   🟢 **Status:** ${b.status || "Active"}`;
    });

    return `🚌 **Campus Bus Routes & Timetables:**

${busList.join("\n\n")}

*Please arrive at least 5 minutes prior to departure times at your designated stop.*`;
  }

  // 8. CAMPUS INFO / FACILITIES
  if (intent === "campus_info") {
    return `🏫 **Campus Services & Facilities Information:**

• 📚 **Central Library:** Open Monday to Saturday from 8:00 AM – 8:00 PM. Digital catalog and study rooms available.
• 🍽️ **Food Court / Cafeteria:** Serves meals and refreshments from 8:00 AM – 8:30 PM daily.
• 🏥 **Medical / First Aid Cell:** Located on the Ground Floor, Block A. Emergency staff on call.
• 🚌 **Transport Office:** Inquiries regarding bus passes and routes are handled at Counter 3, Admin Building.
• 💻 **IT Helpdesk:** Report computer lab or Wi-Fi connectivity issues via the Complaints tab or Block C, Room 102.

Need help with something specific? Just ask!`;
  }

  // 9. GENERAL
  return `Thank you for your question!

CampusEase is your unified digital campus portal. Here is how I can best help you:
• Ask *"What is my schedule?"* to check today's classes and lecture timings.
• Ask *"Show my attendance"* for your attendance percentage and records.
• Ask *"Show notices"* to view new official university notifications.
• Ask *"What is my complaint status?"* to track submitted facility maintenance issues.
• Ask *"Show bus routes"* to check campus transport buses, drivers, and timings.

If you have a specific request, let me know how I can assist!`;
};

/* -----------------------------------------
   AI CONTROLLER
----------------------------------------- */

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question",
      });
    }

    const user = req.user;
    const intent = detectIntent(question);
    let campusData = {};

    /* -----------------------------------------
       STUDENT DATA FETCHING
    ----------------------------------------- */
    if (user.role === "student") {
      if (intent === "schedule" || intent === "general") {
        campusData.schedules = (
          await Schedule.find().limit(50).lean()
        ).map(cleanSchedule);
      }

      if (intent === "notices" || intent === "general") {
        campusData.notices = (
          await Notice.find({
            audience: { $in: ["All", "Students", "Students & Faculty"] },
          })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean()
        ).map(cleanNotice);
      }

      if (intent === "complaints") {
        campusData.complaints = (
          await Complaint.find({ reportedBy: user._id })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean()
        ).map(cleanComplaint);
      }

      if (intent === "approvals") {
        campusData.approvals = (
          await Approval.find({ requestedBy: user._id })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean()
        ).map(cleanApproval);
      }

      if (intent === "attendance") {
        campusData.attendance = (
          await Attendance.find({ student: user._id })
            .sort({ date: -1 })
            .limit(100)
            .lean()
        ).map(cleanAttendance);
      }

      if (intent === "buses") {
        campusData.buses = (
          await Bus.find({ status: { $ne: "Inactive" } })
            .limit(30)
            .lean()
        ).map(cleanBus);
      }
    }

    /* -----------------------------------------
       FACULTY DATA FETCHING
    ----------------------------------------- */
    if (user.role === "faculty") {
      if (intent === "schedule" || intent === "general") {
        campusData.schedules = (
          await Schedule.find().limit(50).lean()
        ).map(cleanSchedule);
      }

      if (intent === "notices" || intent === "general") {
        campusData.notices = (
          await Notice.find({
            audience: { $in: ["All", "Faculty", "Students & Faculty"] },
          })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean()
        ).map(cleanNotice);
      }

      if (intent === "attendance") {
        campusData.attendance = (
          await Attendance.find().sort({ date: -1 }).limit(100).lean()
        ).map(cleanAttendance);
      }

      if (intent === "complaints") {
        campusData.complaints = (
          await Complaint.find().sort({ createdAt: -1 }).limit(30).lean()
        ).map(cleanComplaint);
      }

      if (intent === "approvals") {
        campusData.approvals = (
          await Approval.find().sort({ createdAt: -1 }).limit(30).lean()
        ).map(cleanApproval);
      }

      if (intent === "buses") {
        campusData.buses = (
          await Bus.find().limit(30).lean()
        ).map(cleanBus);
      }
    }

    /* -----------------------------------------
       ADMIN DATA FETCHING
    ----------------------------------------- */
    if (user.role === "admin") {
      if (intent === "schedule" || intent === "general") {
        campusData.schedules = (
          await Schedule.find().limit(100).lean()
        ).map(cleanSchedule);
      }

      if (intent === "notices" || intent === "general") {
        campusData.notices = (
          await Notice.find().sort({ createdAt: -1 }).limit(50).lean()
        ).map(cleanNotice);
      }

      if (intent === "complaints") {
        campusData.complaints = (
          await Complaint.find().sort({ createdAt: -1 }).limit(100).lean()
        ).map(cleanComplaint);
      }

      if (intent === "approvals") {
        campusData.approvals = (
          await Approval.find().sort({ createdAt: -1 }).limit(100).lean()
        ).map(cleanApproval);
      }

      if (intent === "attendance") {
        campusData.attendance = (
          await Attendance.find().sort({ date: -1 }).limit(200).lean()
        ).map(cleanAttendance);
      }

      if (intent === "buses") {
        campusData.buses = (
          await Bus.find().limit(50).lean()
        ).map(cleanBus);
      }
    }

    /* -----------------------------------------
       TRY OPENAI FIRST (IF CONFIGURED)
    ----------------------------------------- */
    let answer = null;
    let source = "campus_knowledge_engine";

    if (process.env.OPENAI_API_KEY) {
      try {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
          maxRetries: 0,
          timeout: 5000,
        });

        const systemPrompt = `You are CampusEase AI Assistant, a friendly and intelligent campus guide.
CampusEase is an AI-powered digital campus platform for students, faculty and administrators.

USER INFORMATION:
Name: ${user.name}
Role: ${user.role}

DETECTED TOPIC: ${intent}

VERIFIED CAMPUS DATA FROM DATABASE:
${JSON.stringify(campusData, null, 2)}

GUIDELINES:
1. Answer the user's question directly, accurately, and professionally.
2. For campus-specific inquiries (schedules, attendance, notices, complaints, approvals, buses), ground your answers in the VERIFIED CAMPUS DATA above.
3. If campus data is empty for the requested query, politely inform them and guide them on what to do.
4. Format responses cleanly with markdown bullet points, bold headers, and emojis when appropriate.
5. If the user asks a general academic or educational question, answer helpfully using your knowledge.`;

        const modelName = process.env.OPENAI_MODEL || "gpt-4o-mini";

        const completion = await openai.chat.completions.create({
          model: modelName,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question.trim() },
          ],
          temperature: 0.7,
          max_tokens: 650,
        });

        if (completion.choices && completion.choices[0]?.message?.content) {
          answer = completion.choices[0].message.content.trim();
          source = "openai";
        }
      } catch (llmError) {
        console.warn(
          `[CampusEase AI] OpenAI call failed (${llmError.message}). Seamlessly engaging CampusEase Knowledge Engine fallback.`
        );
      }
    }

    // If OpenAI was not configured or threw an error (e.g. 429 quota / no credits / network error),
    // serve the answer using our resilient CampusEase Knowledge Engine!
    if (!answer) {
      answer = generateLocalCampusResponse({
        question: question.trim(),
        intent,
        user,
        campusData,
      });
      source = "campus_knowledge_engine";
    }

    return res.json({
      success: true,
      intent,
      answer,
      source,
    });
  } catch (error) {
    console.error("AI Error:", error);

    // Ultimate fallback so the user NEVER encounters a dead end
    return res.status(200).json({
      success: true,
      intent: "fallback",
      answer:
        "Hello! I am your CampusEase AI Assistant. I can assist you with your class timetable, attendance percentage, circulars, complaints, and campus bus timings. How can I help you today?",
      source: "recovery_engine",
    });
  }
};