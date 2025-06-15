import fs from "fs";
import path from "path";

const coveragePath = path.resolve(process.cwd(), "coverage/lcov.info");

function checkCoverageFile() {
  if (!fs.existsSync(coveragePath)) {
    console.error("❌ File coverage/lcov.info tidak ditemukan!");
    process.exit(1);
  }

  const content = fs.readFileSync(coveragePath, "utf8");
  if (!content || content.length < 50) {
    console.error("❌ File coverage/lcov.info kosong atau terlalu kecil!");
    process.exit(1);
  }

  console.log("✅ File coverage/lcov.info ditemukan dan berisi:");
  console.log(content.slice(0, 500));
}

checkCoverageFile();
