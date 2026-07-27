// Isolated submission boundary for the contact form. The UI only ever calls
// this function — the actual transport (currently our own /api/contact
// route, which relays to Resend) can change without touching ContactHero.jsx.
export async function submitContactForm(payload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(result.error ?? "Failed to send message.");
  }

  return result;
}
