// ── DaengTalk 사전등록 Google Apps Script ──────────────────
// 사용법:
// 1. Google Sheets 새 파일 생성
// 2. 확장 프로그램 > Apps Script 열기
// 3. 이 코드 전체 붙여넣기
// 4. 저장 후 "배포" > "새 배포" > 유형: 웹 앱
//    - 실행 계정: 나
//    - 액세스 권한: 모든 사용자
// 5. 배포 URL을 복사해서 daengtalk-v7.html의 APPS_SCRIPT_URL에 붙여넣기

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 헤더가 없으면 첫 행에 추가
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['타임스탬프', '입력값', '타입']);
    }

    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.value,
      data.type   // 'tel' 또는 'email'
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

// 배포 URL 접속 테스트용
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
