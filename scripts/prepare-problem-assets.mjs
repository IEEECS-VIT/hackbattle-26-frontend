// Normalize the existing artwork's transparent bounds. No artwork is redrawn.
// Run with: node scripts/prepare-problem-assets.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve('next/package.json'));
const sharp = nextRequire('sharp');
const colors = ['black_ball', 'blue_red', 'white_ball', 'purple_ball', 'red_ball'];
const stages = ['glacier', 'stone_land', 'volcano', 'tropic', 'drylands'];
await fs.mkdir('public/problems', { recursive: true });
for (const [folder, names] of [['pokeballs', colors], ['reveal_open', colors], ['stages', stages]]) {
  for (const name of names) {
    const { data, info } = await sharp(`public/${folder}/${name}.svg`, { density: 220 })
      .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let left = info.width, top = info.height, right = 0, bottom = 0;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 12) {
        left = Math.min(left, x); top = Math.min(top, y);
        right = Math.max(right, x); bottom = Math.max(bottom, y);
      }
    }
    await sharp(data, { raw: info }).extract({ left, top, width: right-left+1, height: bottom-top+1 })
      .resize({ width: folder === 'reveal_open' ? 760 : 420 })
      .webp({ quality: 92, alphaQuality: 100 })
      .toFile(`public/problems/${folder}-${name}.webp`);
  }
}
await sharp('public/background/map.svg').resize(1800).webp({ quality: 90 }).toFile('public/problems/landscape.webp');
