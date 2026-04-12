/**
 * DaengTalk 광고 소재 스크린샷 스크립트
 * 모든 메시지가 표시된 최종 상태로 PNG 저장
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ADS = [
  { name: 'creative-a-feed',  w: 1080, h: 1080 },
  { name: 'creative-a-story', w: 1080, h: 1920 },
  { name: 'creative-b-feed',  w: 1080, h: 1080 },
  { name: 'creative-b-story', w: 1080, h: 1920 },
];

const OUTPUT_DIR = path.join(__dirname, 'output');

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

  const browser = await chromium.launch();

  for (const ad of ADS) {
    console.log(`📸 Screenshot: ${ad.name}`);

    const context = await browser.newContext({
      viewport: { width: ad.w, height: ad.h },
    });

    const page = await context.newPage();
    const htmlPath = path.join(__dirname, `${ad.name}.html`);
    await page.goto(`file://${htmlPath}`);

    // 모든 메시지 즉시 표시
    await page.addStyleTag({ content: '.msg-item { opacity: 1 !important; transform: none !important; transition: none !important; }' });

    // 폰트 렌더링 대기
    await page.waitForTimeout(1000);

    const pngPath = path.join(OUTPUT_DIR, `${ad.name}.png`);
    await page.screenshot({ path: pngPath, fullPage: false });
    await context.close();

    console.log(`  ✅ output/${ad.name}.png`);
  }

  await browser.close();
  console.log('\n🎉 완료! output/ 폴더에서 확인하세요.');
})();
