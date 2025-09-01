// generate-lectures-json.js
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve("public");

// match: SEC_AREA_TOPIC_Title.html  OR  SEC_AREATOPIC_Title.html
const PATTERN1 = /^([A-Z]{3})_([IVX]+)_([A-Z])[_-]?.*\.html?$/i;
const PATTERN2 = /^([A-Z]{3})_([IVX]+)([A-Z])[_-]?.*\.html?$/i;

const IGNORE_FILE = /^(index\.html)$/i;       // don't include your homepage
const IGNORE_NAME_PART = /blueprint/i;        // don't include the blueprint page itself

async function walk(dir, out = []) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full, out);
    } else if (e.isFile()) {
      const lower = e.name.toLowerCase();
      if (!lower.endsWith(".html")) continue;
      if (IGNORE_FILE.test(e.name)) continue;
      if (IGNORE_NAME_PART.test(e.name)) continue;
      const rel = path.relative(ROOT, full).replace(/\\/g, "/");
      out.push(rel);
    }
  }
  return out;
}

function validName(name) {
  const base = path.basename(name);
  return PATTERN1.test(base) || PATTERN2.test(base);
}

(async () => {
  try {
    const files = await walk(ROOT);
    files.sort();

    const valid = [];
    const warnings = [];

    for (const f of files) {
      if (validName(f)) valid.push(f);
      else warnings.push(f);
    }

    const outPath = path.join(ROOT, "lectures.json");
    await fs.promises.writeFile(outPath, JSON.stringify(valid, null, 2));

    console.log(`✅ Wrote ${valid.length} entries → ${outPath}`);
    if (warnings.length) {
      console.log("\n⚠️  The following files don't match the naming convention and were skipped:");
      warnings.forEach(w => console.log("   - " + w));
      console.log('\nExpected: SEC_AREA_TOPIC_Title.html  (e.g., TCP_IV_A_My_Topic.html)');
    }
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
