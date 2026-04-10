// ── Woofi Waitlist Google Apps Script ──────────────────
// Setup:
// 1. Create a new Google Spreadsheet
// 2. Go to Extensions > Apps Script
// 3. Paste this entire code
// 4. Save, then Deploy > New deployment > Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the deployment URL and paste it into daengtalk-en.html as APPS_SCRIPT_URL

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Value', 'Type', 'Source']);
    }

    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.value,
      data.type,   // 'tel' or 'email'
      data.source || 'woofi-en'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test endpoint
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
