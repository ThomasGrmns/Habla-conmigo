// Builds the app into docs/ (served by GitHub Pages) from src/template.html, src/vocab.js and OpenMoji.
// Usage: npm install && npm run build
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..");
const OM = path.join(ROOT, "node_modules/openmoji");
const FONTS = path.join(ROOT, "node_modules/@fontsource/atkinson-hyperlegible/files");
const DOCS = path.join(ROOT, "docs");
const data = require(path.join(OM, "data/openmoji.json"));
const { cats, library } = require("./vocab.js");

const norm = s => s.replace(/️/g, "");
const byEmoji = new Map();
for (const d of data) if (d.emoji && !byEmoji.has(norm(d.emoji))) byEmoji.set(norm(d.emoji), d.hexcode);

function minify(svg) {
  return svg.replace(/<\?xml[^>]*>/g, "").replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<title>[\s\S]*?<\/title>/g, "").replace(/<desc>[\s\S]*?<\/desc>/g, "")
    .replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
}
function omFile(hex) {
  const p = path.join(OM, "color/svg", hex + ".svg");
  if (!fs.existsSync(p)) return null;
  return minify(fs.readFileSync(p, "utf8"));
}

// ---------- Drawn body pictures ----------
const RED = "#e53935", BASE = "#cfd8e3", ST = "#2c3e50", HAIR = "#9aa5b1";
function body(part, back) {
  const f = p => (part === "all" || part === p) ? RED : BASE;
  const s = `stroke="${ST}" stroke-width="2"`;
  const arms = `<rect x="20" y="36" width="11" height="34" rx="5.5" fill="${f("arm")}" ${s}/>
    <rect x="69" y="36" width="11" height="34" rx="5.5" fill="${part === "all" ? RED : BASE}" ${s}/>
    <circle cx="25.5" cy="75" r="5.5" fill="${f("hand")}" ${s}/>
    <circle cx="74.5" cy="75" r="5.5" fill="${part === "all" ? RED : BASE}" ${s}/>`;
  const torso = back
    ? `<rect x="32" y="34" width="36" height="44" rx="8" fill="${RED}" ${s}/><line x1="50" y1="38" x2="50" y2="74" stroke="${ST}" stroke-width="2" stroke-dasharray="3 3"/>`
    : `<path d="M40 34 H60 Q68 34 68 42 V56 H32 V42 Q32 34 40 34 Z" fill="${f("chest")}" ${s}/>
       <path d="M32 56 H68 V70 Q68 78 60 78 H40 Q32 78 32 70 Z" fill="${f("belly")}" ${s}/>`;
  const legs = `<rect x="35" y="78" width="13" height="40" rx="6" fill="${f("leg")}" ${s}/>
    <rect x="52" y="78" width="13" height="40" rx="6" fill="${part === "all" ? RED : BASE}" ${s}/>
    ${part === "knee" ? `<circle cx="41.5" cy="98" r="6" fill="${RED}" ${s}/>` : ""}
    <ellipse cx="39" cy="121" rx="8" ry="4.5" fill="${f("foot")}" ${s}/>
    <ellipse cx="61" cy="121" rx="8" ry="4.5" fill="${part === "all" ? RED : BASE}" ${s}/>`;
  const head = back
    ? `<rect x="45" y="26" width="10" height="9" fill="${BASE}" ${s}/><circle cx="50" cy="16" r="12" fill="${HAIR}" ${s}/>`
    : `<rect x="45" y="26" width="10" height="9" fill="${part === "all" ? RED : BASE}" ${s}/>
       <circle cx="50" cy="16" r="12" fill="${part === "all" ? RED : BASE}" ${s}/>
       <path d="M38.5 12 Q40 3 50 3.5 Q60 3 61.5 12 Q56 8 50 8 Q44 8 38.5 12 Z" fill="${HAIR}"/>
       <circle cx="45.5" cy="16" r="1.7" fill="${ST}"/><circle cx="54.5" cy="16" r="1.7" fill="${ST}"/>
       <path d="M45.5 21.5 Q50 24.5 54.5 21.5" fill="none" stroke="${ST}" stroke-width="1.6" stroke-linecap="round"/>`;
  return minify(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130">${head}${arms}${torso}${legs}</svg>`);
}
function face(part) {
  const f = p => part === p ? RED : BASE;
  const s = `stroke="${ST}" stroke-width="2.2"`;
  const eyeFill = part === "eyes" ? RED : "#ffffff";
  return minify(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M12 100 Q12 84 38 81 H62 Q88 84 88 100 Z" fill="${BASE}" ${s}/>
    <rect x="40" y="62" width="20" height="22" fill="${f("neck")}" ${s}/>
    <ellipse cx="21" cy="45" rx="6.5" ry="10" fill="${f("ears")}" ${s}/>
    <ellipse cx="79" cy="45" rx="6.5" ry="10" fill="${f("ears")}" ${s}/>
    <ellipse cx="50" cy="42" rx="28" ry="31" fill="${BASE}" ${s}/>
    ${part === "head"
      ? `<path d="M22.5 40 Q21 9 50 9 Q79 9 77.5 40 Q72 31 50 31 Q28 31 22.5 40 Z" fill="${RED}" ${s}/>
         <path d="M30 4 l4 4 M50 0 v5 M70 4 l-4 4" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>`
      : `<path d="M22 38 Q22 9 50 9 Q78 9 78 38 Q72 22 50 22 Q28 22 22 38 Z" fill="${HAIR}" ${s}/>`}
    <ellipse cx="39" cy="41" rx="6.5" ry="4.5" fill="${eyeFill}" ${s}/><circle cx="39" cy="41" r="2.2" fill="${ST}"/>
    <ellipse cx="61" cy="41" rx="6.5" ry="4.5" fill="${eyeFill}" ${s}/><circle cx="61" cy="41" r="2.2" fill="${ST}"/>
    <path d="M50 45 L46.5 54 H52" fill="none" stroke="${ST}" stroke-width="2" stroke-linejoin="round"/>
    <rect x="39" y="58" width="22" height="9" rx="4.5" fill="${part === "mouth" ? RED : "#ffffff"}" ${s}/>
    <line x1="39" y1="62.5" x2="61" y2="62.5" stroke="${ST}" stroke-width="1.4"/>
    <line x1="46" y1="58" x2="46" y2="67" stroke="${ST}" stroke-width="1.2"/><line x1="54" y1="58" x2="54" y2="67" stroke="${ST}" stroke-width="1.2"/>
  </svg>`);
}


// ---------- Drawn everyday objects (OpenMoji-like style, 72x72) ----------
const K = 'stroke="#000" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"';
const W = s => minify(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">${s}</svg>`);
const DRAW = {
  remote: () => W(`<rect x="24" y="5" width="24" height="62" rx="7" fill="#3f3f3f" ${K}/>
    <circle cx="36" cy="14" r="4" fill="#ea5a47" ${K}/>
    <circle cx="36" cy="30" r="8" fill="#9b9b9a" ${K}/><circle cx="36" cy="30" r="3" fill="#d0cfce" ${K}/>
    ${[44,51,58].map(y=>[29,34,39].map(x=>`<rect x="${x}" y="${y}" width="4" height="4" rx="1" fill="#d0cfce"/>`).join("")).join("")}`),
  quilt: () => W(`${[0,1,2].map(r=>[0,1,2,3].map(c=>`<rect x="${8+c*14}" y="${16+r*13}" width="14" height="13" fill="${["#ea5a47","#f1d100","#61b2e4","#b1cc33"][(r+c)%4]}"/>`).join("")).join("")}
    <rect x="8" y="16" width="56" height="39" rx="2" fill="none" ${K}/>
    <rect x="11" y="19" width="50" height="33" fill="none" stroke="#fff" stroke-width="1.4" stroke-dasharray="2.5 2"/>
    <path d="M64 41 L50 55 L64 55 Z" fill="#fff" ${K}/>
    <path d="M8 55 Q10 61 16 61 H58 Q63 61 64 55" fill="#d0cfce" ${K}/>`),
  sweater: () => W(`<path d="M26 10 Q36 17 46 10 L58 14 Q64 16 65 22 L68 54 L59 56 L56 32 L56 62 H16 L16 32 L13 56 L4 54 L7 22 Q8 16 14 14 Z" fill="#d22f27" ${K}/>
    <path d="M26 10 Q36 20 46 10" fill="none" stroke="#000" stroke-width="2"/><path d="M27 10.5 Q36 23 45 10.5" fill="none" stroke="#a51d15" stroke-width="2"/>
    <rect x="16" y="55" width="40" height="7" fill="#a51d15" ${K}/>
    <path d="M4 54 L13 56 L13.6 51 L4.6 49.4 Z M68 54 L59 56 L58.4 51 L67.4 49.4 Z" fill="#a51d15" ${K}/>
    <polyline points="18,36 22,32 26,36 30,32 34,36 38,32 42,36 46,32 50,36 54,32" fill="none" stroke="#fff" stroke-width="2.2"/>
    <polyline points="18,44 22,40 26,44 30,40 34,44 38,40 42,44 46,40 50,44 54,40" fill="none" stroke="#fff" stroke-width="2.2"/>
    ${[22,29,36,43,50].map(x=>`<line x1="${x}" y1="56" x2="${x}" y2="61" stroke="#000" stroke-width="1"/>`).join("")}`),
  can: () => W(`<rect x="21" y="10" width="30" height="54" rx="5" fill="#d22f27" ${K}/>
    <path d="M22 16 H50 M22 58 H50" stroke="#000" stroke-width="2"/>
    <rect x="23" y="8" width="26" height="6" rx="3" fill="#d0cfce" ${K}/>
    <rect x="23" y="60" width="26" height="5" rx="2.5" fill="#d0cfce" ${K}/>
    <ellipse cx="36" cy="10.5" rx="4" ry="1.6" fill="#9b9b9a" stroke="#000" stroke-width="1.2"/>
    <circle cx="30" cy="30" r="2" fill="#fff"/><circle cx="40" cy="38" r="2.6" fill="#fff"/><circle cx="32" cy="46" r="1.6" fill="#fff"/>`),
  "window-closed": () => W(`<rect x="12" y="8" width="48" height="52" rx="2" fill="#fff" ${K}/>
    <rect x="16" y="12" width="19" height="44" fill="#92d3f5" ${K}/><rect x="37" y="12" width="19" height="44" fill="#92d3f5" ${K}/>
    <line x1="16" y1="34" x2="35" y2="34" stroke="#000" stroke-width="2"/><line x1="37" y1="34" x2="56" y2="34" stroke="#000" stroke-width="2"/>
    <rect x="33.5" y="30" width="5" height="9" rx="1.5" fill="#f1d100" ${K}/>
    <rect x="8" y="60" width="56" height="5" rx="1" fill="#d0cfce" ${K}/>`),
  "window-open": () => W(`<rect x="20" y="8" width="32" height="52" fill="#c7e9fb" ${K}/>
    <path d="M21 52 Q30 40 40 46 Q46 42 51 46 V59 H21 Z" fill="#b1cc33"/>
    <circle cx="42" cy="20" r="5" fill="#f1d100"/>
    <rect x="20" y="8" width="32" height="52" fill="none" ${K}/>
    <path d="M20 8 L7 14 V54 L20 60 Z" fill="#92d3f5" ${K}/><path d="M52 8 L65 14 V54 L52 60 Z" fill="#92d3f5" ${K}/>
    <line x1="7" y1="34" x2="20" y2="34" stroke="#000" stroke-width="2"/><line x1="52" y1="34" x2="65" y2="34" stroke="#000" stroke-width="2"/>
    <rect x="4" y="60" width="64" height="5" rx="1" fill="#d0cfce" ${K}/>`),
  "door-closed": () => W(`<rect x="16" y="5" width="40" height="62" fill="#6a462f" ${K}/>
    <rect x="20" y="9" width="32" height="56" fill="#a57939" ${K}/>
    <rect x="25" y="14" width="22" height="20" rx="1" fill="none" stroke="#6a462f" stroke-width="2"/>
    <rect x="25" y="40" width="22" height="20" rx="1" fill="none" stroke="#6a462f" stroke-width="2"/>
    <circle cx="46" cy="38" r="3" fill="#f1d100" ${K}/>`),
  "door-open": () => W(`<rect x="22" y="5" width="40" height="62" fill="#6a462f" ${K}/>
    <rect x="26" y="9" width="32" height="56" fill="#c7e9fb"/>
    <path d="M26 50 Q36 42 46 47 Q52 44 58 46 V65 H26 Z" fill="#b1cc33"/>
    <circle cx="48" cy="20" r="5" fill="#f1d100"/>
    <rect x="26" y="9" width="32" height="56" fill="none" ${K}/>
    <path d="M26 9 L8 3 V71 L26 65 Z" fill="#a57939" ${K}/>
    <circle cx="12" cy="38" r="2.6" fill="#f1d100" ${K}/>`),
  pipi: () => {
    const toilet = omFile(byEmoji.get(norm("🚽")));
    return toilet.replace(/<\/svg>$/, `<path d="M14 6 C14 6 6 16 6 21 a8 8 0 0 0 16 0 C22 16 14 6 14 6 Z" fill="#f1d100" ${K}/></svg>`);
  }
};

const ICONS = {}, missing = [];
function resolve(key) {
  if (ICONS[key]) return;
  let svg = null;
  if (key.startsWith("draw:")) svg = DRAW[key.slice(5)] ? DRAW[key.slice(5)]() : null;
  else if (key.startsWith("body:")) svg = body(key.slice(5), false);
  else if (key.startsWith("back:")) svg = body(key.slice(5), true);
  else if (key.startsWith("face:")) svg = face(key.slice(5));
  else if (key.startsWith("x:")) svg = omFile(key.slice(2));
  else { const hex = byEmoji.get(norm(key)); svg = hex && omFile(hex); }
  if (svg) ICONS[key] = svg; else missing.push(key);
}

// ---------- Default board ----------
let n = 0;
const id = () => "t" + (++n).toString(36);
const board = { v: 2, pages: cats.map(c => {
  resolve(c.icon);
  return { id: c.id, name: c.name, icon: c.icon, k: c.k, mode: c.mode,
    tiles: c.items.map(([icon, t, nav]) => {
      resolve(icon);
      if (nav && !cats.some(x => x.id === nav)) throw new Error("Unknown category " + nav);
      return nav ? { id: id(), icon, t, nav } : { id: id(), icon, t };
    }) };
}) };
library.forEach(resolve);
const lib = [...new Set([...cats.flatMap(c => [c.icon, ...c.items.map(i => i[0])]), ...library])].filter(k => ICONS[k]);
if (missing.length) { console.error("MISSING ICONS:", missing.join(" ")); process.exit(1); }

// ---------- Fonts (inlined so the app works offline) ----------
const font = w => "data:font/woff2;base64," + fs.readFileSync(path.join(FONTS, `atkinson-hyperlegible-latin-${w}-normal.woff2`)).toString("base64");

// ---------- Write docs/ ----------
const tpl = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
const html = tpl
  .replace("/*__BOARD__*/", () => JSON.stringify(board))
  .replace("/*__ICONS__*/", () => JSON.stringify(ICONS))
  .replace("/*__LIBRARY__*/", () => JSON.stringify(lib))
  .replace("__FONT400__", () => font(400))
  .replace("__FONT700__", () => font(700));
const version = crypto.createHash("sha1").update(html).digest("hex").slice(0, 8);
const out = html.replace(/__VERSION__/g, version);
fs.mkdirSync(DOCS, { recursive: true });
fs.writeFileSync(path.join(DOCS, "index.html"), out);
const sw = fs.readFileSync(path.join(__dirname, "sw.js"), "utf8").replace(/__VERSION__/g, version);
fs.writeFileSync(path.join(DOCS, "sw.js"), sw);
fs.copyFileSync(path.join(__dirname, "manifest.webmanifest"), path.join(DOCS, "manifest.webmanifest"));
fs.writeFileSync(path.join(DOCS, ".nojekyll"), "");
console.log("version", version, "| icons", Object.keys(ICONS).length, "| library", lib.length, "| index.html", (out.length / 1024).toFixed(0) + " KB");
