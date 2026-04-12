/**
 * DaengTalk 광고 소재 자동 녹화 스크립트
 * ffmpeg-static 사용 (시스템 ffmpeg 불필요)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);

const ADS = [
  { name: 'creative-a-feed',  w: 1080, h: 1080,  duration: 8000 },
  { name: 'creative-a-story', w: 1080, h: 1920,  duration: 8000 },
  { name: 'creative-b-feed',  w: 1080, h: 1080,  duration: 8000 },
  { name: 'creative-b-story', w: 1080, h: 1920,  duration: 8000 },
];

const OUTPUT_DIR = path.join(__dirname, 'output');

function convertToMp4(input, output) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .videoCodec('libx264')
      .outputOptions(['-pix_fmt yuv420p', '-movflags +faststart'])
      .on('end', resolve)
      .on('error', reject)
      .save(output);
  });
}

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

  const browser = await chromium.launch();

  for (const ad of ADS) {
    console.log(`\n📹 Recording: ${ad.name}`);

    const context = await browser.newContext({
      viewport: { width: ad.w, height: ad.h },
      recordVideo: { dir: OUTPUT_DIR, size: { width: ad.w, height: ad.h } }
    });

    const page = await context.newPage();
    const htmlPath = path.join(__dirname, `${ad.name}.html`);
    await page.goto(`file://${htmlPath}`);
    await page.waitForTimeout(ad.duration);

    const webmPath = await page.video().path();
    await context.close();

    const mp4Path = path.join(OUTPUT_DIR, `${ad.name}.mp4`);
    console.log(`  Converting to MP4...`);
    await convertToMp4(webmPath, mp4Path);
    fs.unlinkSync(webmPath);

    console.log(`  ✅ output/${ad.name}.mp4`);
  }

  await browser.close();
  console.log('\n🎉 완료! output/ 폴더에서 확인하세요.');
})();
