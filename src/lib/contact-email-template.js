const ACCENT = "#AC40FF";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function field(label, value, href) {
  if (!value) return "";
  const safeValue = escapeHtml(value);
  const content = href
    ? `<a href="${href}" style="color:${ACCENT};text-decoration:none;">${safeValue}</a>`
    : safeValue;

  return `
    <tr>
      <td style="padding:0 0 28px;">
        <p style="margin:0 0 6px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.45);font-family:Arial,Helvetica,sans-serif;">${label}</p>
        <p style="margin:0;font-size:24px;line-height:1.35;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-weight:600;">${content}</p>
      </td>
    </tr>`;
}

// Notification email sent to the site owner on every contact form
// submission. Values are user-supplied, so everything gets HTML-escaped
// before interpolation.
export function buildContactNotificationEmail({ name, email, phone, message }) {
  const html = `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#000000;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:48px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
            <tr>
              <td style="padding-bottom:8px;">
                <p style="margin:0;font-size:14px;letter-spacing:3px;text-transform:uppercase;color:${ACCENT};font-family:Arial,Helvetica,sans-serif;font-weight:700;">SPKRHED</p>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:36px;">
                <p style="margin:0;font-size:38px;line-height:1.2;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-weight:800;">🌱 A new seed just landed in your inbox!</p>
              </td>
            </tr>
            <tr>
              <td style="background:#141414;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:36px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${field("Name", name)}
                  ${field("Email", email, `mailto:${encodeURIComponent(email)}`)}
                  ${field("Phone", phone, phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : undefined)}
                  <tr>
                    <td>
                      <p style="margin:0 0 6px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.45);font-family:Arial,Helvetica,sans-serif;">Message</p>
                      <p style="margin:0;font-size:19px;line-height:1.55;color:#ffffff;font-family:Arial,Helvetica,sans-serif;white-space:pre-wrap;">${escapeHtml(message)}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding-top:28px;">
                <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);font-family:Arial,Helvetica,sans-serif;">Sent from the SPKRHED contact form.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "A new seed just landed in your inbox!",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  return { html, text };
}
