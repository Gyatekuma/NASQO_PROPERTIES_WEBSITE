# Vercel Deployment

This project deploys to Vercel from `github.com/Inovalink/NASQO_PROPERTIES_WEBSITE`.

## Vercel Settings

- **Root Directory:** Leave empty (default) – the repo root is this project
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default, auto-detected for Next.js)

## Environment Variables

Add these in Vercel Project → Settings → Environment Variables:

| Variable   | Description                          |
|-----------|--------------------------------------|
| `SMTP_USER` | Gmail address for contact form     |
| `SMTP_PASS` | Gmail App Password (not regular password) |
| `SMTP_FROM` | (Optional) Sender email            |
