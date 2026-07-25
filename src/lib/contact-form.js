// Isolated submission boundary for the contact form. The UI only ever calls
// this function — swapping the placeholder below for a real API/CRM call
// later won't require touching ContactHero.jsx.
export async function submitContactForm(payload) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (process.env.NODE_ENV !== "production") {
    console.log("Contact form submission (no backend wired yet):", payload);
  }

  return { ok: true };
}
