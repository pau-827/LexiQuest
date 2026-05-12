const BASE_URL = 'http://localhost:5000/api'

export async function analyzeCode(code) {
  const res = await fetch(`${BASE_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })
  if (!res.ok) throw new Error(`Server error: ${res.status}`)
  return res.json()
}
