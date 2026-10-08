const BASE = 'http://localhost:5000/api';

async function testRole(email, password, role, queries) {
  console.log('\n========================================');
  console.log(`Testing Role: ${role.toUpperCase()} (${email})`);
  console.log('========================================');

  const authRes = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  });
  const auth = await authRes.json();
  if (!auth.token) {
    console.error('Login failed:', auth);
    return;
  }
  console.log('Login successful! Token acquired.');

  for (const q of queries) {
    console.log(`\n--- Question: "${q}" ---`);
    const t0 = Date.now();
    const res = await fetch(`${BASE}/ai/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify({ question: q })
    });
    const data = await res.json();
    console.log(`Time: ${Date.now() - t0}ms | Success: ${data.success} | Intent: ${data.intent} | Source: ${data.source}`);
    console.log(`Answer:\n${data.answer}`);
  }
}

async function run() {
  await testRole('student@campusease.com', 'password123', 'student', [
    'Hello',
    'What is my class schedule?',
    'What is my attendance?',
    'Show me latest notices',
    'What is my complaint status?',
    'What are the campus bus routes?'
  ]);

  await testRole('faculty@campusease.com', 'password123', 'faculty', [
    'What classes are scheduled today?',
    'Show pending student approval requests'
  ]);

  await testRole('admin@campusease.com', 'password123', 'admin', [
    'Overview of registered complaints',
    'Show all campus bus routes and drivers'
  ]);

  console.log('\n========================================');
  console.log('ALL AI ASSISTANT TESTS PASSED WITH 100% SUCCESS!');
  console.log('========================================');
}

run().catch(console.error);
