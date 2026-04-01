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

    /*
      Email sending is temporarily disabled.
      Commented out for now:
      - SMTP config + transporter verification
      - Admin notification email
      - User auto-response email
    */

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

