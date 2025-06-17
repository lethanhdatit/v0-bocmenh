const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Cấu hình
const localesPath = path.join(__dirname, "../locales/vi"); // folder chứa en.json, vi.json, etc.
const localeFile = "common.json"; // hoặc tùy theo cấu trúc của bạn
const srcPath = path.join(__dirname, "../app"); // nơi chứa code Next.js

// Đọc JSON file
function loadLocaleKeys() {
  const fullPath = path.join(localesPath, localeFile);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const json = JSON.parse(raw);
  const keys = new Set();

  function recurse(obj, prefix = "") {
    for (let k in obj) {
      const val = obj[k];
      const fullKey = prefix ? `${prefix}.${k}` : k;
      if (typeof val === "string") {
        keys.add(fullKey);
      } else if (typeof val === "object") {
        recurse(val, fullKey);
      }
    }
  }

  recurse(json);
  return keys;
}

// Tìm tất cả các key i18n trong code
function extractUsedKeys() {
  const files = glob.sync(`${srcPath}/**/*.{js,jsx,ts,tsx}`);
  const usedKeys = [];

  const regex = /t\(\s*["'`]([\w\d\-.]+)["'`]\s*[,)]/g;

  for (let file of files) {
    const content = fs.readFileSync(file, "utf-8");
    let match;
    while ((match = regex.exec(content)) !== null) {
      usedKeys.push({
        key: match[1],
        file: path.relative(process.cwd(), file),
      });
    }
  }

  return usedKeys;
}

// Thống kê các key thiếu
function findMissingKeys() {
  const definedKeys = loadLocaleKeys();
  const usedKeys = extractUsedKeys();

  const missing = usedKeys.filter(k => !definedKeys.has(k.key));

  const result = {};
  for (let item of missing) {
    if (!result[item.key]) {
      result[item.key] = [];
    }
    result[item.key].push(item.file);
  }

  return result;
}

// Thêm key thiếu vào file common.json
function addMissingKeysToFile(missingKeys) {
  const fullPath = path.join(localesPath, localeFile);
  console.log(`Thêm các key thiếu vào file: ${fullPath}`);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const json = JSON.parse(raw);

  missingKeys.forEach(key => {
    const keys = key.split(".");
    let obj = json;
    keys.forEach((part, index) => {
      if (!obj[part]) {
        obj[part] = index === keys.length - 1 ? "" : {}; // Đặt giá trị rỗng cho key cuối cùng
      }
      obj = obj[part];
    });
  });

  // Ghi lại vào file
  fs.writeFileSync(fullPath, JSON.stringify(json, null, 2));
}

// Chạy và ghi kết quả
const missing = findMissingKeys();
const missingKeys = Object.keys(missing);

if (missingKeys.length === 0) {
  console.log("✅ Không có key i18n nào bị thiếu.");
} else {
  console.log("❌ Các key i18n bị thiếu:");
  for (let key of missingKeys) {
    console.log(`- ${key}:`);
    for (let file of missing[key]) {
      console.log(`   → ${file}`);
    }
  }

  // Thêm các key thiếu vào common.json
  addMissingKeysToFile(missingKeys);
  console.log("\n✅ Các key thiếu đã được thêm vào file common.json với giá trị rỗng.");
}
