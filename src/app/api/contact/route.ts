import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const TO_EMAIL = "thegeneral.acc@gmail.com";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, phone, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPassRaw = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || smtpUser;

    if (!smtpUser || !smtpPassRaw) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not configured. Please set SMTP_USER and SMTP_PASS.",
        },
        { status: 500 }
      );
    }

    // Gmail App Passwords are often shown with spaces; remove them safely.
    const smtpPass = smtpPassRaw.replace(/\s+/g, "");

    // Gmail SMTP (explicit host avoids nodemailer TransportOptions typing issues with `service`).
    // pool: false avoids reusing connections that may have been closed by the server.
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      pool: false,
      connectionTimeout: 25_000,
      greetingTimeout: 25_000,
      socketTimeout: 25_000,
    } as nodemailer.TransportOptions);

    // Verify SMTP connection before sending.
    await transporter.verify();

    const safeName = escapeHtml(String(name));
    const safeCompany = escapeHtml(String(company || "-"));
    const safePhone = escapeHtml(String(phone));
    const safeEmail = escapeHtml(String(email));
    const safeSubject = escapeHtml(String(subject));
    const safeMessage = escapeHtml(String(message)).replace(/\n/g, "<br/>");

    const submittedAt = new Date().toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>New Contact Message</title>
  </head>
  <body style="margin:0; padding:0; background:#F6F7FB;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
      New contact message from ${safeName} (${safeEmail}) — ${safeSubject}
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#F6F7FB; padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px; width:100%;">
            <tr>
              <td style="padding: 0 6px 14px 6px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="left" style="font-family: Arial, Helvetica, sans-serif;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-right:10px;">
                            <img
                              src="cid:nasqo-logo"
                              alt="NASQO Properties"
                              width="52"
                              height="52"
                              style="display:block;"
                            />
                          </td>
                          <td>
                            <div style="display:inline-block; padding:8px 14px; border-radius:999px; background:#FFFFFF; border:1px solid #E8EAF2;">
                              <span style="font-weight:800; letter-spacing:-0.3px; color:#191723; font-size:14px;">NASQO Properties</span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td align="right" style="font-family: Arial, Helvetica, sans-serif; color:#6B7280; font-size:12px;">
                      ${escapeHtml(submittedAt)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="background:#FFFFFF; border:1px solid #E8EAF2; border-radius:22px; overflow:hidden;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding:22px 22px 0 22px;">
                      <div style="font-family: Arial, Helvetica, sans-serif; color:#191723;">
                        <p style="margin:0; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#4361EE;">
                          New Contact Submission
                        </p>
                        <h1 style="margin:10px 0 0 0; font-size:22px; line-height:1.25; letter-spacing:-0.4px;">
                          ${safeSubject}
                        </h1>
                        <p style="margin:10px 0 0 0; font-size:14px; line-height:1.6; color:#6B7280;">
                          A visitor just sent a message from the contact form.
                        </p>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 22px 0 22px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate; border-spacing:0;">
                        <tr>
                          <td style="background:#F6F7FB; border:1px solid #E8EAF2; border-radius:16px; padding:14px 14px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td style="font-family: Arial, Helvetica, sans-serif; color:#6B7280; font-size:12px; padding-bottom:10px;">
                                  Sender details
                                </td>
                              </tr>
                              <tr>
                                <td style="font-family: Arial, Helvetica, sans-serif; color:#191723; font-size:14px; line-height:1.7;">
                                  <strong style="color:#111827;">Name:</strong> ${safeName}<br/>
                                  <strong style="color:#111827;">Email:</strong> <a href="mailto:${safeEmail}" style="color:#4361EE; text-decoration:none;">${safeEmail}</a><br/>
                                  <strong style="color:#111827;">Phone:</strong> ${safePhone}<br/>
                                  <strong style="color:#111827;">Company:</strong> ${safeCompany}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:16px 22px 0 22px;">
                      <div style="font-family: Arial, Helvetica, sans-serif; color:#6B7280; font-size:12px; margin-bottom:8px;">
                        Message
                      </div>
                      <div style="font-family: Arial, Helvetica, sans-serif; color:#111827; font-size:14px; line-height:1.8; background:#FFFFFF; border:1px solid #E8EAF2; border-radius:16px; padding:14px;">
                        ${safeMessage}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 22px 22px 22px;">
                      <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(
                        String(subject)
                      )}" style="display:inline-block; background:#4361EE; color:#FFFFFF; text-decoration:none; font-family: Arial, Helvetica, sans-serif; font-weight:700; font-size:14px; padding:12px 20px; border-radius:999px;">
                        Reply to sender
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 6px 0 6px; font-family: Arial, Helvetica, sans-serif; color:#9CA3AF; font-size:12px; line-height:1.6;">
                This email was generated from the NASQO Properties contact form. If you believe this was sent in error, you can ignore it.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    // 1) Send message to company inbox
    await transporter.sendMail({
      from: smtpFrom,
      to: TO_EMAIL,
      subject: `New contact form submission: ${subject}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Company: ${company || "-"}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html,
      attachments: [
        {
          filename: "Main_Logo.svg",
          path: `${process.cwd()}/public/Main_Assets/Main_Logo.svg`,
          cid: "nasqo-logo",
        },
      ],
    });

    // 2) Send quick thank-you email to the sender
    const thankYouHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Thank you for contacting NASQO</title>
  </head>
  <body style="margin:0; padding:0; background:#0F172A;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0F172A; padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px; width:100%; border-radius:24px; overflow:hidden; box-shadow:0 26px 80px rgba(0,0,0,0.55);">
            <tr>
              <!-- Banner -->
              <td style="background:linear-gradient(135deg,#111827 0%,#1D2640 40%,#4361EE 100%); padding:22px 22px 18px 22px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="left" style="font-family: Arial, Helvetica, sans-serif;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-right:10px;">
                            <img
                              src="cid:nasqo-logo"
                              alt="NASQO Properties"
                              width="52"
                              height="52"
                              style="display:block;"
                            />
                          </td>
                          <td>
                            <div style="display:inline-block; padding:8px 14px; border-radius:999px; background:rgba(15,23,42,0.85); border:1px solid rgba(148,163,184,0.4);">
                              <span style="font-weight:800; letter-spacing:-0.3px; color:#E5E7EB; font-size:14px;">NASQO Properties</span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td align="right" style="font-family: Arial, Helvetica, sans-serif; color:#E5E7EB; font-size:12px;">
                      ${escapeHtml(submittedAt)}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top:16px;">
                      <p style="margin:0 0 6px 0; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.16em; color:rgba(191,219,254,0.9);">
                        Thank you for getting in touch
                      </p>
                      <p style="margin:0; font-size:22px; line-height:1.35; letter-spacing:-0.04em; color:#F9FAFB; font-weight:700;">
                        We’ve received your message, ${safeName}.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <!-- Main body -->
              <td style="background:#FFFFFF;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding:20px 24px 16px 24px; font-family: Arial, Helvetica, sans-serif; color:#111827;">
                      <p style="margin:0; font-size:14px; line-height:1.7; color:#4B5563;">
                        Thanks for contacting <strong>NASQO Properties</strong>. Your enquiry is important to us, and a member of our team will review your message and get back to you as soon as possible.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 24px 18px 24px; font-family: Arial, Helvetica, sans-serif;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-radius:14px; background:#F9FAFB; border:1px solid #E5E7EB;">
                        <tr>
                          <td style="padding:14px 16px; font-size:12px; color:#6B7280;">
                            <div style="margin-bottom:4px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em;">
                              Summary
                            </div>
                            <div style="font-size:13px; color:#111827; line-height:1.6;">
                              <strong style="color:#111827;">Subject:</strong> ${safeSubject}<br/>
                              <strong style="color:#111827;">Sent from:</strong> ${safeEmail}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 24px 22px 24px; font-family: Arial, Helvetica, sans-serif; color:#6B7280; font-size:12px; line-height:1.6;">
                      In the meantime, feel free to explore our latest properties and services on our website or follow us on social channels for updates.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 6px 0 6px; font-family: Arial, Helvetica, sans-serif; color:#9CA3AF; font-size:11px; line-height:1.6; text-align:left;">
                This is an automatic acknowledgement from NASQO Properties. There’s no need to reply to this email unless you’d like to share more details.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    await transporter.sendMail({
      from: smtpFrom,
      to: safeEmail,
      subject: "Thank you for contacting NASQO Properties",
      text:
        "Thank you for contacting NASQO Properties.\n\nWe’ve received your message and will get back to you as soon as possible.\n\nBest regards,\nNASQO Properties",
      html: thankYouHtml,
      attachments: [
        {
          filename: "Main_Logo.svg",
          path: `${process.cwd()}/public/Main_Assets/Main_Logo.svg`,
          cid: "nasqo-logo",
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error)?.message || "Failed to send message."
            : "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}

