# 📊 Connecting Your Wedding RSVPs to Google Sheets

Yes, connecting to **Google Sheets** via Google Apps Script is the **gold-standard solution** for wedding invitations.

---

## Why Google Sheets is the Best Choice:
1. **100% Free Forever**: No database hosting fees, no subscription limits.
2. **Family Collaboration**: You and your family can open the sheet directly on your phones in the Google Sheets app, filter by side (Groom/Bride) or day, and see real-time headcounts.
3. **Caterer & Vendor Ready**: Instantly export to Excel or share a view-only link with event planners and caterers.
4. **Offline Safety**: The website also stores all RSVPs locally in the browser's `localStorage` as a safety net so no response is ever lost.

---

## 3-Minute Setup Instructions:

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Name it e.g., **Swapnil & Sarvani Wedding RSVPs**.

---

### Step 2: Add the Apps Script Webhook
1. In the top menu of your sheet, click **Extensions** > **Apps Script**.
2. Delete whatever is in `Code.gs` and paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Automatically creates styled column headers on first RSVP
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Side",
        "Name",
        "Family Name",
        "No. of Guests",
        "City",
        "Contact Number",
        "Day(s) Attending"
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#f4ecdd");
    }
    
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.timestamp || new Date(),
      data.side || "",
      data.name || "",
      data.familyName || "",
      data.guestCount || "",
      data.city || "",
      data.contact || "",
      data.attendingDay || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

### Step 3: Deploy as Web App
1. At the top right, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `RSVP Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Important: Select "Anyone" so guests can submit without needing to log into Google)*
4. Click **Deploy**.
5. Grant permissions if prompted (click *Advanced* > *Go to Untitled project (unsafe)*).
6. Copy the **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).

---

### Step 4: Paste URL into `index.html`
Open [index.html](file:///c:/Users/Vishal/Downloads/our-wedding-main/index.html) and paste your URL into line 14:
```html
<script>
  window.GOOGLE_SHEET_URL = "YOUR_WEB_APP_URL_HERE";
</script>
```
*(Or simply send the URL here in chat and I will paste it into the codebase for you!)*
