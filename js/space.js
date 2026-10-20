/* ==========================================================================
   Research Space — a draggable 3D constellation of research domains.
   Trust & Safety sits at the core; the other domains orbit it. Each paper is
   a star placed between the hubs of every domain it belongs to, larger for
   first-author and award papers. Hover for details, click to open,
   drag to rotate. On touch, a tap previews, a second tap opens, and a
   sideways swipe rotates. Colors are read from the CSS theme variables.
   ========================================================================== */

class ResearchSpace {
  constructor(shell, opts = {}) {
    this.shell = shell;
    this.opts = Object.assign({ zoomable: false, panel: true }, opts);
    this.papers = PUBLICATIONS;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.touch = matchMedia("(pointer: coarse)").matches;

    this.yaw = 0.6;
    this.pitch = -0.32;
    this.vyaw = 0;
    this.vpitch = 0;
    this.zoom = 1;
    this.targetZoom = 1;
    this.focusKey = null;
    this.hover = null;
    this.intro = 0;
    this.running = false;
    this.t = 0;

    this.readColors();
    addEventListener("themechange", () => this.readColors());
    this.buildDOM();
    this.buildScene();
    this.bind();
    this.resize();
  }

  /* ---------- Theme colors ---------- */
  readColors() {
    const cs = getComputedStyle(document.documentElement);
    const v = (name) => cs.getPropertyValue(name).trim();
    this.col = Object.fromEntries(Object.entries(DOMAINS).map(([k, d]) => [k, v(d.cv)]));
    this.fg = v("--fg-rgb");
    this.bg = v("--bg-rgb");
    this.gold = v("--star");
    this.light = document.documentElement.dataset.theme === "light";
  }

  /* ---------- DOM scaffolding ---------- */
  buildDOM() {
    const s = this.shell;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "space-canvas";
    this.canvas.setAttribute("role", "img");
    this.canvas.setAttribute("aria-label", "Interactive 3D map of research domains and publications. A text list of the same papers follows.");
    s.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.tip = el("div", "space-tip");
    s.appendChild(this.tip);

    const legend = el("div", "space-legend");
    this.chips = {};
    for (const [k, d] of Object.entries(DOMAINS)) {
      const n = this.papers.filter((p) => p.d.includes(k)).length;
      const c = el("button", "chip");
      c.innerHTML = `<i style="background:${d.color};box-shadow:0 0 10px ${d.color}"></i>${d.short}<span class="n">${n}</span>`;
      c.addEventListener("click", () => this.focus(this.focusKey === k ? null : k));
      legend.appendChild(c);
      this.chips[k] = c;
    }
    s.appendChild(legend);

    const ctr = el("div", "space-controls");
    const mk = (label, title, fn) => {
      const b = el("button", "icon-btn");
      b.innerHTML = label;
      b.title = title;
      b.setAttribute("aria-label", title);
      b.addEventListener("click", fn);
      ctr.appendChild(b);
    };
    mk("+", "Zoom in", () => (this.targetZoom = Math.min(2.2, this.targetZoom * 1.2)));
    mk("−", "Zoom out", () => (this.targetZoom = Math.max(0.6, this.targetZoom / 1.2)));
    mk("⟲", "Reset view", () => {
      this.targetZoom = 1;
      this.focus(null);
    });
    s.appendChild(ctr);

    if (this.opts.panel) {
      this.panel = el("div", "space-panel");
      s.appendChild(this.panel);
    }

    const hint = el("div", "space-hint mono");
    hint.innerHTML = this.touch
      ? "<span>Swipe to rotate</span><span>Tap a star</span><span>Tap again to open</span>"
      : "<span>Drag to rotate</span><span>Hover a star</span><span>Click to open</span>";
    s.appendChild(hint);

    // Text alternative for screen readers
    const fb = el("ul", "space-fallback");
    fb.innerHTML = this.papers.map((p) => `<li><a href="${p.u}">${p.t}</a> — ${p.vs}, ${p.y}</li>`).join("");
    s.appendChild(fb);
  }

  /* ---------- Geometry ---------- */
  buildScene() {
    const rand = mulberry32(7);
    const R = 1;
    // Trust & Safety at the core; the rest on a tilted ring around it.
    const ring = ["D", "A", "C", "P", "H"];
    this.hubs = { T: { k: "T", x: 0, y: 0, z: 0 } };
    ring.forEach((k, i) => {
      const a = (i / ring.length) * Math.PI * 2;
      this.hubs[k] = { k, x: Math.cos(a) * R, y: (i % 2 ? 0.34 : -0.3) * R, z: Math.sin(a) * R };
    });

    this.nodes = this.papers.map((p, i) => {
      let x = 0, y = 0, z = 0, w = 0;
      p.d.forEach((k, j) => {
        const h = this.hubs[k];
        const wt = j === 0 ? 1.5 : 1;
        x += h.x * wt; y += h.y * wt; z += h.z * wt; w += wt;
      });
      x /= w; y /= w; z /= w;
      // Scatter around the anchor; T-only papers form a shell around the core.
      const onlyCore = p.d.length === 1 && p.d[0] === "T";
      const spread = onlyCore ? 0.32 + rand() * 0.14 : p.d.length === 1 ? 0.12 + rand() * 0.2 : 0.06 + rand() * 0.14;
      const u = rand() * 2 - 1, th = rand() * Math.PI * 2, s = Math.sqrt(1 - u * u);
      x += s * Math.cos(th) * spread;
      y += u * spread * 0.8;
      z += s * Math.sin(th) * spread;
      const r = 3.4 + (p.first ? 2.2 : 0) + (p.award ? 1.6 : 0);
      return { p, i, x, y, z, ph: rand() * Math.PI * 2, r };
    });

    this.dust = Array.from({ length: 420 }, () => {
      const u = rand() * 2 - 1, th = rand() * Math.PI * 2, s = Math.sqrt(1 - u * u), r = 0.5 + rand() * 1.5;
      return { x: s * Math.cos(th) * r, y: u * r * 0.7, z: s * Math.sin(th) * r, a: 0.15 + rand() * 0.5 };
    });
  }

  /* ---------- Events ---------- */
  bind() {
    const c = this.canvas;
    let down = null, moved = 0, last = null;

    c.addEventListener("pointerdown", (e) => {
      const r = c.getBoundingClientRect();
      this.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
      down = { x: e.clientX, y: e.clientY };
      last = { x: e.clientX, y: e.clientY, t: performance.now() };
      moved = 0;
      c.setPointerCapture(e.pointerId);
      c.classList.add("dragging");
    });
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      this.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (down) {
        const dx = e.clientX - last.x, dy = e.clientY - last.y;
        moved += Math.abs(dx) + Math.abs(dy);
        this.yaw += dx * 0.006;
        this.pitch = clamp(this.pitch + dy * 0.004, -1.2, 1.2);
        this.vyaw = dx * 0.006;
        this.vpitch = dy * 0.004;
        last = { x: e.clientX, y: e.clientY, t: performance.now() };
        if (moved > 6) this.hideTip();
      } else {
        this.pick();
      }
    });
    const up = (e) => {
      c.classList.remove("dragging");
      if (down && moved < 6) {
        const r = c.getBoundingClientRect();
        this.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
        const prev = this.hover;
        this.pick();
        const h = this.hover;
        if (h && h.type === "paper") {
          // Touch: first tap previews, second tap on the same star opens.
          if (e.pointerType !== "mouse" && (!prev || prev.node !== h.node)) return (down = null);
          window.open(h.node.p.u, "_blank", "noopener");
        } else if (h && h.type === "hub") {
          this.focus(this.focusKey === h.key ? null : h.key);
        }
      }
      down = null;
    };
    c.addEventListener("pointerup", up);
    // pointercancel fires when a vertical swipe hands over to page scrolling
    c.addEventListener("pointercancel", () => { down = null; c.classList.remove("dragging"); });
    // Touch pointers "leave" as the finger lifts; keep the tapped star selected.
    c.addEventListener("pointerleave", (e) => {
      if (!down && e.pointerType === "mouse") { this.mouse = null; this.hover = null; this.hideTip(); c.classList.remove("pointing"); }
    });
    c.addEventListener("wheel", (e) => {
      if (!this.opts.zoomable && !e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      this.targetZoom = clamp(this.targetZoom * (e.deltaY > 0 ? 0.92 : 1.08), 0.6, 2.2);
    }, { passive: false });

    new ResizeObserver(() => this.resize()).observe(this.shell);
    new IntersectionObserver(([en]) => (en.isIntersecting ? this.start() : this.stop()), { threshold: 0.05 }).observe(this.shell);
  }

  resize() {
    const r = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = r.width;
    this.h = r.height;
    this.canvas.width = r.width * dpr;
    this.canvas.height = r.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // narrow screens need extra side margin so hub labels stay on canvas
    this.scale = Math.min(this.w * (this.w < 560 ? 0.27 : 0.34), this.h * 0.47);
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = (ts) => {
      if (!this.running) return;
      this.frame(ts);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
  stop() { this.running = false; }

  /* ---------- Focus a domain ---------- */
  focus(key) {
    this.focusKey = key;
    for (const [k, c] of Object.entries(this.chips)) {
      c.classList.toggle("on", k === key);
      c.classList.toggle("off", key && k !== key);
    }
    if (key && key !== "T") {
      const h = this.hubs[key];
      // rotate so this hub swings toward the viewer
      this.targetYaw = Math.atan2(-h.x, -h.z);
      this.targetYaw = this.yaw + wrapAngle(this.targetYaw - this.yaw);
      this.targetPitch = -0.18;
    } else {
      this.targetYaw = null;
    }
    if (this.panel) {
      if (!key) return this.panel.classList.remove("show");
      const d = DOMAINS[key];
      const list = this.papers.filter((p) => p.d.includes(key));
      this.panel.innerHTML = `
        <div class="mono" style="color:${d.color}">${list.length} papers</div>
        <h3>${d.name}</h3>
        <p>${d.blurb}</p>
        <div class="mono muted" style="margin-bottom:8px">Latest</div>
        ${list.slice(0, 3).map((p) => `<p style="margin:0 0 10px;font-size:.85rem"><a href="${p.u}" target="_blank" rel="noopener">${p.t}</a></p>`).join("")}
        <a class="more mono" href="research.html#domain-${key}">Explore domain →</a>`;
      this.panel.classList.add("show");
    }
  }

  /* ---------- Projection ---------- */
  project(o, t) {
    const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    const k = this.intro;
    const bob = o.ph !== undefined && !this.reduced ? Math.sin(t * 0.0006 + o.ph) * 0.018 : 0;
    let x = o.x * k, y = o.y * k + bob, z = o.z * k;
    let x1 = x * cy - z * sy, z1 = x * sy + z * cy;
    let y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
    const D = 3.1;
    const f = (D / (D + z2)) * this.zoom;
    return { sx: this.w / 2 + x1 * this.scale * f, sy: this.h / 2 + y1 * this.scale * f, z: z2, f };
  }

  /* ---------- Hit testing ---------- */
  pick() {
    if (!this.mouse || !this.proj) return;
    const { x, y } = this.mouse;
    let best = null, bd = Infinity;
    for (const n of this.proj.nodes) {
      if (!this.visible(n.node)) continue;
      const d = Math.hypot(n.sx - x, n.sy - y);
      if (d < Math.max(this.touch ? 20 : 10, n.rr + (this.touch ? 12 : 6)) && d - n.z * 3 < bd) { bd = d - n.z * 3; best = { type: "paper", node: n.node, sx: n.sx, sy: n.sy }; }
    }
    if (!best) {
      for (const h of this.proj.hubs) {
        if (Math.hypot(h.sx - x, h.sy - y) < (this.touch ? 34 : 26)) { best = { type: "hub", key: h.k, sx: h.sx, sy: h.sy }; break; }
      }
    }
    this.hover = best;
    this.canvas.classList.toggle("pointing", !!best);
    best && best.type === "paper" ? this.showTip(best) : this.hideTip();
  }

  visible(node) { return !this.focusKey || node.p.d.includes(this.focusKey); }

  showTip(h) {
    const p = h.node.p;
    const d0 = DOMAINS[p.d[0]];
    if (this.tipFor !== p) this.tip.innerHTML = `
      <div class="tip-meta mono"><span style="color:${d0.color}">${p.vs}</span><span>${p.y}</span></div>
      <h4>${p.t}</h4>
      <div class="tip-auth">${boldMe(p.a)}</div>
      <div class="tip-tags">${p.award ? `<span class="award-pill">★ ${p.award}</span>` : ""}${p.d.map((k) => `<span class="tag" style="color:${DOMAINS[k].color}">${DOMAINS[k].short}</span>`).join("")}</div>
      ${this.touch ? `<div class="tip-open mono">Tap the star again to open ↗</div>` : ""}`;
    this.tipFor = p;
    if (this.touch && this.w < 560) {
      // Phones: dock the card at the top or bottom, away from the finger.
      const th = this.tip.offsetHeight || 160;
      this.tip.style.left = "16px";
      this.tip.style.top = (h.sy > this.h / 2 ? 70 : this.h - th - 70) + "px";
      this.tip.classList.add("show");
      return;
    }
    const tw = 320, pad = 16;
    let left = h.sx + 18, top = h.sy + 14;
    if (left + tw > this.w - pad) left = h.sx - tw - 18;
    if (left < pad) left = pad;
    const th = this.tip.offsetHeight || 160;
    if (top + th > this.h - pad) top = h.sy - th - 14;
    this.tip.style.left = left + "px";
    this.tip.style.top = Math.max(pad, top) + "px";
    this.tip.classList.add("show");
  }
  hideTip() { this.tip.classList.remove("show"); this.tipFor = null; }

  /* ---------- Render ---------- */
  frame(t) {
    const dt = Math.min(48, t - (this.t || t));
    this.t = t;
    const ctx = this.ctx;

    // intro expansion
    if (this.introStart == null) this.introStart = t;
    this.intro = this.reduced ? 1 : Math.min(1, (t - this.introStart) / 1600);
    const ik = 1 - Math.pow(1 - this.intro, 3);
    const savedIntro = this.intro;
    this.intro = ik;

    // motion: inertia, auto-rotate, focus easing
    const dragging = this.canvas.classList.contains("dragging");
    if (!dragging) {
      this.yaw += this.vyaw;
      this.pitch = clamp(this.pitch + this.vpitch, -1.2, 1.2);
      this.vyaw *= 0.94;
      this.vpitch *= 0.9;
      if (this.targetYaw != null) {
        this.yaw += (this.targetYaw - this.yaw) * 0.06;
        this.pitch += (this.targetPitch - this.pitch) * 0.06;
        if (Math.abs(this.targetYaw - this.yaw) < 0.002) this.targetYaw = null;
      } else if (!this.hover && !this.reduced) {
        this.yaw += dt * 0.00009;
      }
    }
    this.zoom += (this.targetZoom - this.zoom) * 0.12;

    ctx.clearRect(0, 0, this.w, this.h);

    // dust
    for (const d of this.dust) {
      const q = this.project(d, t);
      const a = d.a * clamp(1.1 - q.z * 0.35, 0.1, 1);
      ctx.fillStyle = `rgba(${this.fg},${a * (this.light ? 0.4 : 0.55)})`;
      ctx.fillRect(q.sx, q.sy, 1.2 * q.f, 1.2 * q.f);
    }

    // project hubs + nodes
    const hubs = Object.values(this.hubs).map((h) => Object.assign({ k: h.k }, this.project(h, t)));
    const hubMap = Object.fromEntries(hubs.map((h) => [h.k, h]));
    const nodes = this.nodes.map((n) => {
      const q = this.project(n, t);
      return Object.assign(q, { node: n, rr: n.r * q.f });
    });
    this.proj = { hubs, nodes };

    const hovered = this.hover && this.hover.type === "paper" ? this.hover.node : null;
    const hoverHub = this.hover && this.hover.type === "hub" ? this.hover.key : null;
    const activeKey = this.focusKey || hoverHub;

    // hub-to-hub rails
    ctx.lineWidth = 1;
    for (const h of hubs) {
      if (h.k === "T") continue;
      const c = hubMap.T;
      const g = ctx.createLinearGradient(c.sx, c.sy, h.sx, h.sy);
      g.addColorStop(0, hexA(this.col.T, 0.22));
      g.addColorStop(1, hexA(this.col[h.k], 0.22));
      ctx.strokeStyle = g;
      ctx.setLineDash([2, 6]);
      ctx.beginPath(); ctx.moveTo(c.sx, c.sy); ctx.lineTo(h.sx, h.sy); ctx.stroke();
    }
    ctx.setLineDash([]);

    // paper → hub links
    for (const n of nodes) {
      const p = n.node.p;
      const isHover = hovered === n.node;
      const inFocus = activeKey && p.d.includes(activeKey);
      for (const k of p.d) {
        const h = hubMap[k];
        let a = 0.07;
        if (activeKey) a = inFocus && k === activeKey ? 0.35 : 0.025;
        if (isHover) a = 0.85;
        ctx.strokeStyle = hexA(this.col[k], a * (this.focusKey && !this.visible(n.node) ? 0.3 : 1));
        ctx.lineWidth = isHover ? 1.4 : 1;
        ctx.beginPath(); ctx.moveTo(n.sx, n.sy); ctx.lineTo(h.sx, h.sy); ctx.stroke();
      }
    }

    // draw hubs and nodes back-to-front
    const items = [...hubs.map((h) => ({ kind: "hub", z: h.z, h })), ...nodes.map((n) => ({ kind: "node", z: n.z, n }))];
    items.sort((a, b) => b.z - a.z);

    for (const it of items) {
      if (it.kind === "hub") this.drawHub(it.h, t, activeKey);
      else this.drawNode(it.n, t, hovered, activeKey);
    }

    this.intro = savedIntro;
    if (this.mouse && !dragging) this.pick();
  }

  drawHub(h, t, activeKey) {
    const ctx = this.ctx;
    const d = DOMAINS[h.k], color = this.col[h.k];
    const on = activeKey === h.k;
    const dim = activeKey && !on;
    const pulse = this.reduced ? 1 : 1 + Math.sin(t * 0.002 + h.k.charCodeAt(0)) * 0.08;
    const R = (h.k === "T" ? 44 : 34) * h.f * pulse * (on ? 1.25 : 1);
    const g = ctx.createRadialGradient(h.sx, h.sy, 0, h.sx, h.sy, R);
    g.addColorStop(0, hexA(color, dim ? 0.25 : 0.9));
    g.addColorStop(0.25, hexA(color, dim ? 0.1 : 0.35));
    g.addColorStop(1, hexA(color, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(h.sx, h.sy, R, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = this.light ? `rgba(${this.fg},${dim ? 0.35 : 0.9})` : `rgba(255,255,255,${dim ? 0.4 : 1})`;
    ctx.beginPath(); ctx.arc(h.sx, h.sy, 4 * h.f, 0, Math.PI * 2); ctx.fill();

    ctx.font = `600 ${Math.round(10.5 * clamp(h.f, 0.85, 1.25))}px "Geist Mono", monospace`;
    ctx.textAlign = "center";
    ctx.fillStyle = dim ? `rgba(${this.fg},.3)` : color;
    const label = d.short.toUpperCase();
    ctx.letterSpacing = "1.5px";
    ctx.lineWidth = 4;
    ctx.strokeStyle = `rgba(${this.bg},.85)`;
    ctx.lineJoin = "round";
    ctx.strokeText(label, h.sx, h.sy + R * 0.55 + 16);
    ctx.fillText(label, h.sx, h.sy + R * 0.55 + 16);
    ctx.letterSpacing = "0px";
  }

  drawNode(n, t, hovered, activeKey) {
    const ctx = this.ctx;
    const p = n.node.p;
    const c = this.col[p.d[0]];
    const isHover = hovered === n.node;
    let alpha = clamp(1.15 - n.z * 0.3, 0.35, 1);
    if (activeKey && !p.d.includes(activeKey)) alpha *= 0.14;
    if (hovered && !isHover) alpha *= 0.55;
    const r = n.rr * (isHover ? 1.5 : 1);

    // halo
    const g = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, r * 3.2);
    g.addColorStop(0, hexA(c, 0.45 * alpha));
    g.addColorStop(1, hexA(c, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(n.sx, n.sy, r * 3.2, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = hexA(c, alpha);
    ctx.beginPath(); ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2); ctx.fill();

    // secondary-domain ring
    if (p.d[1]) {
      ctx.strokeStyle = hexA(this.col[p.d[1]], alpha * 0.9);
      ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.arc(n.sx, n.sy, r + 3, 0, Math.PI * 2); ctx.stroke();
    }
    // first-author core
    if (p.first) {
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.9})`;
      ctx.beginPath(); ctx.arc(n.sx, n.sy, Math.max(1, r * 0.34), 0, Math.PI * 2); ctx.fill();
    }
    // award sparkle
    if (p.award) {
      const s = (r + 7) * (this.reduced ? 1 : 1 + Math.sin(t * 0.004 + n.node.ph) * 0.15);
      ctx.strokeStyle = hexA(this.gold, alpha);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(n.sx - s, n.sy); ctx.lineTo(n.sx + s, n.sy);
      ctx.moveTo(n.sx, n.sy - s); ctx.lineTo(n.sx, n.sy + s);
      ctx.stroke();
    }
    if (isHover) {
      ctx.strokeStyle = `rgb(${this.light ? this.fg : "255,255,255"})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(n.sx, n.sy, r + 7, 0, Math.PI * 2); ctx.stroke();
    }
  }
}

/* ---------- helpers ---------- */
function el(tag, cls) { const e = document.createElement(tag); if (cls) e.className = cls; return e; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function wrapAngle(a) { return Math.atan2(Math.sin(a), Math.cos(a)); }
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${clamp(a, 0, 1)})`;
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function boldMe(authors) { return authors.replace(/Venkit, P\.\*?|PN Venkit\*?/g, (m) => `<b>${m}</b>`); }
