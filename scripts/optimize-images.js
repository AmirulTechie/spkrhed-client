const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PUBLIC_IMAGES_DIR = path.join(__dirname, "../public/images");

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if ([".png", ".jpg", ".jpeg"].includes(ext)) {
        results.push(filePath);
      }
    }
  });
  return results;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const originalSize = stat.size;

  if (originalSize < 200 * 1024) {
    return { skipped: true, path: filePath, originalSize, newSize: originalSize };
  }

  try {
    const inputBuffer = fs.readFileSync(filePath);
    const metadata = await sharp(inputBuffer).metadata();

    let transform = sharp(inputBuffer);

    const MAX_DIMENSION = 1920;
    if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
      if (metadata.width >= metadata.height) {
        transform = transform.resize({ width: MAX_DIMENSION, withoutEnlargement: true });
      } else {
        transform = transform.resize({ height: MAX_DIMENSION, withoutEnlargement: true });
      }
    }

    let buffer;
    if (ext === ".png") {
      buffer = await transform
        .png({
          compressionLevel: 9,
          quality: 90,
          palette: true,
          effort: 7,
        })
        .toBuffer();
    } else if (ext === ".jpg" || ext === ".jpeg") {
      buffer = await transform
        .jpeg({
          quality: 85,
          mozjpeg: true,
        })
        .toBuffer();
    }

    if (buffer && buffer.length < originalSize) {
      fs.writeFileSync(filePath, buffer);
      return {
        path: filePath,
        originalSize,
        newSize: buffer.length,
        saved: originalSize - buffer.length,
        success: true,
      };
    } else {
      return { skipped: true, path: filePath, originalSize, newSize: originalSize };
    }
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err.message);
    return { error: err.message, path: filePath };
  }
}

async function main() {
  console.log("🔍 Scanning for remaining images to optimize...");
  const files = getFiles(PUBLIC_IMAGES_DIR);

  let totalOriginal = 0;
  let totalNew = 0;
  let optimizedCount = 0;

  for (const file of files) {
    const res = await optimizeImage(file);
    totalOriginal += res.originalSize || 0;
    totalNew += res.newSize || 0;
    if (res.success) {
      optimizedCount++;
      const origMB = (res.originalSize / 1024 / 1024).toFixed(2);
      const newMB = (res.newSize / 1024 / 1024).toFixed(2);
      const relPath = path.relative(path.join(__dirname, "../public"), res.path);
      console.log(`✓ ${relPath}: ${origMB}MB -> ${newMB}MB (-${Math.round(((res.originalSize - res.newSize) / res.originalSize) * 100)}%)`);
    }
  }

  const savedMB = ((totalOriginal - totalNew) / 1024 / 1024).toFixed(2);
  const finalMB = (totalNew / 1024 / 1024).toFixed(2);
  console.log("\n===============================");
  console.log(`🎉 Optimization Complete!`);
  console.log(`Optimized: ${optimizedCount} files`);
  console.log(`Saved: ${savedMB} MB`);
  console.log(`Total public images size now: ${finalMB} MB`);
  console.log("===============================");
}

main();
