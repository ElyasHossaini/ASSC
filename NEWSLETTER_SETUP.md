# Newsletter / Member Signup — Setup Guide

This site has a newsletter signup form at the bottom of the homepage (the
"Stay Connected" / **Join our community list** section). Every time someone
fills it out, you want their info to land in a spreadsheet you can open
in Excel or Google Sheets.

The site sends the form data directly to a **Google Sheet** you own.
No third-party service, no monthly fee, no server to maintain.

> **Quick start:** If you don't want to set this up today, **skip this
> guide entirely**. The form already works — it will open the visitor's
> email app with their info pre-filled and send it to your inbox. You
> can come back and connect it to a sheet anytime later.

---

## What you'll build

```
┌──────────────────┐    submit    ┌────────────────────┐    append    ┌────────────────┐
│ Website form     │ ───────────► │ Google Apps Script │ ───────────► │ Google Sheet   │
│ (name, email...) │              │ web app (free)     │              │ (one row each) │
└──────────────────┘              └────────────────────┘              └────────────────┘
```

You'll need: a free Google account (Gmail). That's it. No coding required —
just copy/paste the script below.

Time required: about **10 minutes**.

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and click **Blank** to
   create a new spreadsheet.
2. Rename it (top-left) to something like **"ASSC Newsletter Signups"**.
3. In **row 1**, add these column headers (one per cell, left to right):

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | Timestamp | First Name | Last Name | Email | Phone | Source |

4. Leave the rest of the sheet empty — the script will fill it in as
   people sign up.

> **Tip:** Anytime you want an Excel `.xlsx` file, go to
> **File → Download → Microsoft Excel (.xlsx)**.

---

## Step 2 — Add the Apps Script

1. With your spreadsheet open, click **Extensions → Apps Script** in the
   menu bar. A new tab will open with a code editor.
2. Delete any starter code in the editor.
3. Paste the entire script below into the editor:

   ```javascript
   // ASSC newsletter signup handler
   // Appends a row to the active sheet every time someone submits the form.

   function doPost(e) {
     try {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
       const data = (e && e.parameter) || {};

       sheet.appendRow([
         new Date(),
         (data.firstName || "").toString().trim(),
         (data.lastName || "").toString().trim(),
         (data.email || "").toString().trim(),
         (data.phone || "").toString().trim(),
         (data.source || "website").toString().trim(),
       ]);

       return ContentService
         .createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService
         .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }

   function doGet() {
     return ContentService
       .createTextOutput(JSON.stringify({ ok: true, ping: "alive" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. Click the **floppy-disk Save icon** (or `Ctrl+S` / `Cmd+S`).
   Name the project something like **"ASSC Newsletter"**.

---

## Step 3 — Deploy the script as a Web App

1. Click the blue **Deploy** button (top-right) → **New deployment**.
2. Click the gear/cog icon next to "Select type" → choose **Web app**.
3. Fill in:
   - **Description:** `ASSC newsletter signup`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone` *(this is required — visitors aren't
     logged into Google. Don't worry: the script only knows how to
     append rows, it doesn't expose your sheet.)*
4. Click **Deploy**.
5. Google will ask for permissions — click **Authorize access** → pick
   your Google account → click **Advanced** → **Go to ASSC Newsletter
   (unsafe)** → **Allow**. (It's only "unsafe" because Google hasn't
   reviewed your personal script. It's just your own code accessing
   your own sheet.)
6. Copy the **Web app URL** that's shown. It looks like:

   ```
   https://script.google.com/macros/s/AKfycb.................../exec
   ```

   Keep this tab open — you'll need this URL in the next step.

---

## Step 4 — Plug the URL into the website

1. In the project folder, find the file called **`.env.example`**.
   Make a copy of it and rename the copy to **`.env.local`**
   (note the leading dot).
2. Open `.env.local` in a text editor and paste the URL from Step 3:

   ```bash
   NEXT_PUBLIC_NEWSLETTER_ENDPOINT="https://script.google.com/macros/s/AKfycb.................../exec"
   ```

3. Save the file.
4. If the site is running, **restart it** so the new value is picked up:

   ```bash
   npm run dev
   ```

   When you eventually deploy the site to a host (Vercel, Netlify, etc.),
   add the same `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` variable in that host's
   environment-variables settings.

---

## Step 5 — Test it

1. Open the site and scroll to the bottom **"Join our community list"**
   section.
2. Fill in fake info and click **Subscribe**.
3. Switch back to your Google Sheet — a new row should appear within a
   few seconds with a timestamp, name, email, and phone.

---

## How your client uses it day-to-day

- Open the Google Sheet anytime to see all signups (newest at the bottom).
- **Download to Excel:** `File → Download → Microsoft Excel (.xlsx)`.
- **Filter / sort:** use the column headers like any normal spreadsheet.
- **Share with helpers:** click **Share** in the top-right of the sheet —
  anyone you share with can see/edit signups too.

---

## Updating the script later

If you change the Apps Script code (e.g., add a new field), you need to
re-deploy it. Click **Deploy → Manage deployments → pencil/edit icon
on your existing deployment → Version: New version → Deploy**.
The web app URL stays the same, so you don't need to update `.env.local`.

---

## Troubleshooting

**Form says "Thank you!" but no row appears in the sheet**
- Make sure **Who has access** was set to `Anyone` (Step 3).
- Open the web app URL in a browser — you should see
  `{"ok":true,"ping":"alive"}`. If not, the deployment didn't go through.

**You get a CORS error in the browser console**
- The form intentionally uses `mode: "no-cors"`, so a CORS error in the
  console can be safely ignored as long as a row is being appended.

**You want to stop receiving signups temporarily**
- In Apps Script, go to **Deploy → Manage deployments → Archive**. The
  form will still submit but no rows will be written. Re-deploy when ready.

**You want signups emailed to you instead of (or in addition to) the sheet**
- Either leave `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` empty (uses the email
  fallback), or add this line inside `doPost` after `appendRow(...)`:

  ```javascript
  MailApp.sendEmail(
    "Assc954@gmail.com",
    "New ASSC signup",
    `${data.firstName} ${data.lastName} — ${data.email} — ${data.phone}`
  );
  ```

  Save and re-deploy (Step 3 manage deployments → new version).
