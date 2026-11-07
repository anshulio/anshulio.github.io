/**
 * Build & Static Asset Verification Script
 * Validates that all critical assets, scripts, styles, and links are intact and ready for GitHub Pages.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("🔍 Verifying portfolio files and assets for GitHub Pages deployment...\n");

const requiredFiles = [
  "index.html",
  "css/style.css",
  "js/data.js",
  "js/main.js",
  "assets/mountain-art.png",
  "assets/favicon.svg"
];

let hasErrors = false;

// 1. Check required files
for (const file of requiredFiles) {
  const fullPath = path.join(rootDir, file);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`  ✓ Found ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`  ✗ Missing required file: ${file}`);
    hasErrors = true;
  }
}

// 2. Verify relative paths in index.html
const htmlPath = path.join(rootDir, "index.html");
if (fs.existsSync(htmlPath)) {
  const htmlContent = fs.readFileSync(htmlPath, "utf-8");
  const assetRegex = /(?:href|src)=["'](\.\/[^"']+)["']/g;
  let match;
  console.log("\n📦 Checking relative asset references in index.html...");
  while ((match = assetRegex.exec(htmlContent)) !== null) {
    const relAsset = match[1].replace("./", "");
    const targetFile = path.join(rootDir, relAsset);
    if (fs.existsSync(targetFile)) {
      console.log(`  ✓ Linked: ${match[1]}`);
    } else {
      console.error(`  ✗ Broken asset reference: ${match[1]}`);
      hasErrors = true;
    }
  }
}

if (hasErrors) {
  console.error("\n❌ Verification failed with errors.");
  process.exit(1);
} else {
  console.log("\n✨ All files verified successfully! Ready for GitHub Pages deployment.");
}
