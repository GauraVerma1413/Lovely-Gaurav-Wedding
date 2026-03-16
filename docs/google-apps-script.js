/**
 * ============================================================
 * GOOGLE APPS SCRIPT — Wedding RSVP Form Handler
 * Lovely & Gaurav Wedding 2026
 * ============================================================
 *
 * SETUP INSTRUCTIONS:
 * ───────────────────
 * 1. Go to https://sheets.google.com and create a new spreadsheet
 *    Name it: "Lovely & Gaurav — RSVP 2026"
 *
 * 2. In Row 1, add these headers (one per column):
 *    A: Timestamp | B: Name | C: Attending | D: Guest Count
 *
 * 3. In the spreadsheet, go to Extensions → Apps Script
 *
 * 4. Delete any existing code in the editor and paste THIS entire file
 *
 * 5. Save the project (Ctrl+S) and name it "Wedding RSVP Handler"
 *
 * 6. Click Deploy → New Deployment
 *    - Type: Web App
 *    - Description: Wedding RSVP v1
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone
 *    Then click Deploy and authorize permissions when prompted.
 *
 * 7. Copy the Web App URL shown after deployment.
 *    It looks like: https://script.google.com/macros/s/ABC.../exec
 *
 * 8. Open index.html and replace:
 *    const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
 *    with your actual URL.
 *
 * ============================================================
 */

// ← Replace with your actual Google Sheet ID (from its URL)
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'RSVPs'; // The tab name in your spreadsheet

/**
 * Handles POST requests from the RSVP form.
 * Appends a new row to the Google Sheet.
 */
function doPost(e) {
  try {
    const ss    = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

    const name      = e.parameter.name      || '';
    const attending = e.parameter.attending  || '';
    const guests    = e.parameter.guests     || '1';
    const timestamp = e.parameter.timestamp  || new Date().toISOString();

    sheet.appendRow([timestamp, name, attending, guests]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (used to test the deployment is live).
 */
function doGet() {
  return ContentService
    .createTextOutput('Lovely & Gaurav RSVP endpoint is live ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}
