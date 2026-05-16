# Upcoming Event RSVP — Setup Guide

The Upcoming Event section lets visitors reserve a seat for the next
community gathering. The list of RSVPs is **shared** across all visitors,
and:

- Each device can RSVP **only once** per event.
- Everyone sees the live list as people add themselves.
- **Only the organizer** (you) can remove a family from the list, using
  a password.
- Removing a family **unlocks their device** so they can RSVP again.

Like the newsletter, this uses a **Google Sheet you own** as the database,
talked to via a free **Google Apps Script web app**. No backend, no
monthly fee.

> **You can ship without this.** If `NEXT_PUBLIC_RSVP_ENDPOINT` is empty,
> the section shows "RSVPs not yet enabled — please call to reserve"
> with your phone number. Set it up whenever you're ready.

Time required: about **15 minutes** (5 more than the newsletter because
of the admin password step).

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and click **Blank**.
2. Rename it (top-left) to **"ASSC Event RSVPs"**.
3. In **row 1**, add these column headers:

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | RSVP ID | Event ID | Name | Count | Created At | Device ID |

   The `Device ID` column is what prevents one device from RSVP-ing twice.
   You can hide it (right-click column F → **Hide column**) if you don't
   want to see it day-to-day.

---

## Step 2 — Add the Apps Script

1. With your spreadsheet open: **Extensions → Apps Script**.
2. Delete any starter code.
3. Paste the entire script below into the editor:

   ```javascript
   // ASSC Upcoming Event RSVP handler
   // Stores one row per RSVP. Enforces one RSVP per device per event.

   // --- 1. Choose your organizer password. ---
   // Visitors don't see this. You'll type it into the "Organizer" login
   // on the website to unlock the trash/delete icons.
   // CHANGE THIS BEFORE DEPLOYING.
   const ADMIN_PASSWORD = "change-me-to-something-secret";

   function doGet(e) {
     try {
       const action = (e && e.parameter && e.parameter.action) || "list";
       const params = (e && e.parameter) || {};

       if (action === "list")   return listRsvps_(params);
       if (action === "add")    return addRsvp_(params);
       if (action === "remove") return removeRsvp_(params);
       if (action === "ping")   return pingAdmin_(params);

       return json_({ ok: false, error: "unknown_action" });
     } catch (err) {
       return json_({ ok: false, error: String(err) });
     }
   }

   function sheet_() {
     return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
   }

   function listRsvps_(params) {
     const eventId = (params.eventId || "").toString();
     const sheet = sheet_();
     const rows = sheet.getDataRange().getValues();
     const out = [];
     // Skip header row at index 0.
     for (let i = 1; i < rows.length; i++) {
       const row = rows[i];
       if (!row[0]) continue;
       if (eventId && row[1] !== eventId) continue;
       out.push({
         id: String(row[0]),
         eventId: String(row[1]),
         name: String(row[2]),
         count: Number(row[3]) || 0,
         createdAt: row[4] instanceof Date ? row[4].toISOString() : String(row[4] || ""),
         // Note: deviceId (column F) is intentionally NOT returned to the client.
       });
     }
     return json_({ ok: true, rsvps: out });
   }

   function addRsvp_(params) {
     const eventId = (params.eventId || "").toString().trim();
     const name = (params.name || "").toString().trim();
     const count = Math.max(1, Math.min(50, parseInt(params.count, 10) || 1));
     const deviceId = (params.deviceId || "").toString().trim();

     if (!eventId || !name || !deviceId) {
       return json_({ ok: false, error: "invalid" });
     }

     const sheet = sheet_();
     const rows = sheet.getDataRange().getValues();
     for (let i = 1; i < rows.length; i++) {
       if (rows[i][1] === eventId && rows[i][5] === deviceId) {
         return json_({ ok: false, error: "already_rsvped" });
       }
     }

     const id = Utilities.getUuid();
     const now = new Date();
     sheet.appendRow([id, eventId, name, count, now, deviceId]);

     return json_({
       ok: true,
       rsvp: {
         id: id,
         eventId: eventId,
         name: name,
         count: count,
         createdAt: now.toISOString(),
       },
     });
   }

   function removeRsvp_(params) {
     if ((params.token || "") !== ADMIN_PASSWORD) {
       return json_({ ok: false, error: "unauthorized" });
     }
     const id = (params.id || "").toString();
     if (!id) return json_({ ok: false, error: "invalid" });

     const sheet = sheet_();
     const rows = sheet.getDataRange().getValues();
     for (let i = 1; i < rows.length; i++) {
       if (rows[i][0] === id) {
         sheet.deleteRow(i + 1); // +1 because sheet rows are 1-indexed
         return json_({ ok: true });
       }
     }
     return json_({ ok: false, error: "not_found" });
   }

   function pingAdmin_(params) {
     if ((params.token || "") !== ADMIN_PASSWORD) {
       return json_({ ok: false, error: "unauthorized" });
     }
     return json_({ ok: true });
   }

   function json_(obj) {
     return ContentService
       .createTextOutput(JSON.stringify(obj))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. **CHANGE THE PASSWORD.** On the line near the top:

   ```javascript
   const ADMIN_PASSWORD = "change-me-to-something-secret";
   ```

   Replace `change-me-to-something-secret` with a password only you know.
   Suggestions:

   - Use 12+ characters
   - Mix letters and numbers
   - **Do not reuse a password from your email or banking**

   Example: `"ASSCorganizer2026!"`

5. Click the **floppy-disk Save icon** (or `Ctrl+S`).

---

## Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment** (top-right).
2. Click the gear icon → **Web app**.
3. Fill in:
   - **Description:** `ASSC RSVPs`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
4. Click **Deploy** → authorize when prompted (Advanced → Go to
   ASSC RSVPs → Allow).
5. **Copy the Web app URL** that appears. It looks like:

   ```
   https://script.google.com/macros/s/AKfycb.................../exec
   ```

---

## Step 4 — Plug the URL into the website

1. Open `.env.local` in the project root.
2. Add (or update) this line:

   ```bash
   NEXT_PUBLIC_RSVP_ENDPOINT="https://script.google.com/macros/s/AKfycb.................../exec"
   ```

3. Save. If the dev server is running, restart it:

   ```bash
   npm run dev
   ```

4. When you deploy the site to a host (Vercel, Netlify, etc.), add the
   same `NEXT_PUBLIC_RSVP_ENDPOINT` variable in that host's environment
   variables.

---

## Step 5 — Test it

1. Open the site → scroll to **Upcoming Event**.
2. Click **Join Event / RSVP**, fill it in, hit confirm.
3. A new row appears in your sheet (and you'll see "You" tagged next
   to your entry in the list).
4. Try to RSVP again → the button is gone, replaced with "You're on
   the list!" — proving the one-per-device rule works.

---

## Day-to-day for the organizer (you)

### Log into organizer mode

1. Scroll to the bottom of any page and click the small **Organizer**
   link in the footer (or visit any page with `?admin` in the URL).
2. The "Organizer Tools" panel appears in the Upcoming Event section.
3. Enter your `ADMIN_PASSWORD` and click **Log in**.
4. Trash icons now appear next to every RSVP.

You stay logged in on that device until you click **Log out**, even
across reloads.

### Remove a family

- Click the trash icon → confirm.
- The row is deleted from the sheet immediately.
- Their device automatically detects the removal and unlocks — they
  can RSVP again.

### Change the event

- Edit `EVENT` at the top of `components/UpcomingEventsSection.tsx`
  (title, date, image, etc.).
- If you change `EVENT.id` to a new value, you start with a fresh
  empty list (previous event RSVPs stay in the sheet under the old
  Event ID, so you have a history).

### Update the script later

If you change the Apps Script code: **Deploy → Manage deployments →
pencil icon → Version: New version → Deploy**. The web app URL stays
the same.

---

## Privacy notes

- The `Device ID` column is a random opaque string — it's not tied to
  any personal info, IP, or account. It just lets the server tell two
  reloads of the same browser apart.
- The Apps Script intentionally **does not return** Device IDs to
  visitors. They only see name + count.
- Your organizer password is sent over HTTPS as part of the request
  URL. This is fine for a small community site, but please don't
  reuse a password that protects anything sensitive.

---

## Troubleshooting

**"This device has already RSVP'd"** even though you've never RSVP'd
- That device's localStorage has a stale device ID matching an existing
  row. Either log in as organizer and delete that family, or have the
  visitor clear their browser cache for your site.

**Organizer login fails even with the right password**
- The web app deployment is older than the password change. Re-deploy
  the script (Deploy → Manage deployments → New version).
- Or `?admin` was visited before the env var was set. Reload the page.

**Visitors see "RSVPs not yet enabled"**
- `NEXT_PUBLIC_RSVP_ENDPOINT` is empty in `.env.local` (or on your
  host's environment variable settings). Add it and restart/redeploy.

**You want to start fresh for a new event**
- Easiest: change `EVENT.id` to `"event-jul-2026"` (or any new string).
  The sheet retains the old rows as history; the list on the page
  shows only the new event.
