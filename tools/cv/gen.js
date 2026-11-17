// Writes the data-driven CV sections (publications, press, awards) from js/data.js.
// Usage: node tools/cv/gen.js   (then tools/cv/build.sh)
const fs = require("fs"), path = require("path"), vm = require("vm");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../../js/data.js"), "utf8") +
  "\n;this.D={PUBLICATIONS,PRESS,AWARDS};", ctx);
const { PUBLICATIONS, PRESS, AWARDS } = ctx.D;

const tex = (s) => s.replace(/\\/g, "\\textbackslash{}").replace(/([&%$#_{}])/g, "\\$1")
  .replace(/~/g, "\\textasciitilde{}").replace(/—/g, "---").replace(/–/g, "--")
  .replace(/'/g, "’");
const me = (a) => tex(a).replace(/Venkit, P\.(\\\*|\*)?/, (m) => `\\textbf{${m}}`);
const url = (u) => u.replace(/([%#])/g, "\\$1");
const item = (p) => `  \\item {${me(p.a)} (${p.y}). \\href{${url(p.u)}}{${tex(p.t)}}${/[?!]$/.test(p.t) ? "" : "."} \\textit{${tex(p.v.replace(/ — to appear$/, ""))}}` +
  `${/to appear/.test(p.v) ? " (to appear)" : ""}.${p.award ? ` \\textbf{[${tex(p.award)}]}` : ""}}`;

const peer = PUBLICATIONS.filter((p) => p.vs !== "Preprint" && p.vs !== "PhD Thesis" && !/Tutorial/.test(p.vs));
const pre = PUBLICATIONS.filter((p) => p.vs === "Preprint" && p.y >= 2026);
const thesis = PUBLICATIONS.filter((p) => p.vs === "PhD Thesis");

let pubs = `\\cvsection{Publications}\n\n{\\paragraphstyle\n\\cvsubsection{Peer-Reviewed Conference and Journal Papers}\n\\vspace{3mm}\\begin{cvitems}\n` +
  peer.map(item).join("\n") + `\n\\end{cvitems}\n\n\\cvsubsection{Recent Preprints}\n\\vspace{3mm}\\begin{cvitems}\n` +
  pre.map(item).join("\n") + `\n\\end{cvitems}\n\n\\needspace{5\\baselineskip}\\cvsubsection{Dissertation}\n\\vspace{3mm}\\begin{cvitems}\n` +
  thesis.map(item).join("\n") + `\n\\end{cvitems}\n}\n`;
fs.writeFileSync(path.join(__dirname, "publications.tex"), pubs);

const seen = new Set();
const press = PRESS.filter((p) => !seen.has(p.t.toLowerCase()) && seen.add(p.t.toLowerCase()));
fs.writeFileSync(path.join(__dirname, "press.tex"),
  `\\cvsection{News and Media Mentions}\n\n{\\paragraphstyle\n\\vspace{3mm}\\begin{cvitems}\n` +
  press.map((p) => `  \\item {\\href{${url(p.u)}}{“${tex(p.t)}”} (${tex(p.o)}, ${p.d})}`).join("\n") + `\n\\end{cvitems}\n}\n`);

fs.writeFileSync(path.join(__dirname, "awards.tex"),
  `\\cvsection{Awards \\& Honors}\n\n\\begin{cvhonors}\n` +
  AWARDS.map((a) => `  \\cvhonor{${tex(a.t)}}{${tex(a.note)}}{${tex(a.o)}}{${a.y}}`).join("\n") + `\n\\end{cvhonors}\n`);
console.log(`publications: ${peer.length} peer-reviewed, ${pre.length} preprints; press: ${press.length}; awards: ${AWARDS.length}`);
