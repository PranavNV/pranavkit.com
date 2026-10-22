/* ==========================================================================
   Research Space timeline (home page). A wide constellation plays
   like a short film, adding each year's papers in order; a scrubber below
   (a stacked histogram of papers per year) lets visitors drag through time.
   ========================================================================== */

class TimelineSpace extends ResearchSpace {
  constructor(shell, opts) {
    super(shell, Object.assign({ panel: false }, opts));
    this.v = 0;           // playhead: 0 = first year complete, each dot is one more year
    this.done = false;    // playhead at the end: no dimming
    this.year = 0;        // index of the year under the playhead
  }

  resize() {
    super.resize();
    // a wide box has height to spare: draw bigger, and leave the left side for the caption
    if (this.w > 900) this.scale = Math.min(this.w * 0.3, this.h * 0.55);
    this.offX = this.w > 900 ? this.w * 0.12 : 0;
    // phones put the caption under the stars, so lift the sky into the top half
    this.offY = this.w < 560 ? -this.h * 0.2 : 0;
  }

  project(o, t) {
    const q = super.project(o, t);
    q.sx += this.offX || 0;
    q.sy += this.offY || 0;
    return q;
  }

  frame(t) {
    const nodes = this.nodes, hubs = this.hubs;
    const born = (o, show) => {
      if (!show) o.born = null;
      else if (o.born == null) o.born = this.reduced ? -1e9 : t;
      return show;
    };
    this.nodes = nodes.filter((n) => born(n, n.th < this.v));
    const live = new Set(this.nodes.flatMap((n) => n.p.d));
    this.hubs = Object.fromEntries(Object.entries(hubs).filter(([k, h]) => born(h, k === "T" || live.has(k))));
    super.frame(t);
    this.nodes = nodes;
    this.hubs = hubs;
  }

  drawHub(h, t, activeKey) {
    const k = Math.min(1, (t - this.hubs[h.k].born) / 900);
    this.ctx.globalAlpha = 1 - Math.pow(1 - k, 3);
    super.drawHub(h, t, activeKey);
    this.ctx.globalAlpha = 1;
  }

  drawNode(n, t, hovered, activeKey) {
    const ctx = this.ctx, age = t - n.node.born;
    const k = Math.min(1, age / 500);
    const rr = n.rr;
    n.rr *= 1 - Math.pow(1 - k, 3);
    // earlier years step back so this year's stars read as new
    if (!this.done && n.node.yi < this.year) ctx.globalAlpha = 0.45;
    super.drawNode(n, t, hovered, activeKey);
    n.rr = rr;
    // birth ripple
    if (age < 1200) {
      const e = age / 1200;
      ctx.strokeStyle = hexA(this.col[n.node.p.d[0]], 0.6 * (1 - e));
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(n.sx, n.sy, rr + 4 + e * 26, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
}

function buildTimeline(root) {
  const shell = $(".space-shell", root);
  const space = new TimelineSpace(shell);

  // Years and per-year paper order (data lists newest first; reverse for chronology).
  const years = [...new Set(PUBLICATIONS.map((p) => p.y))].sort();
  const Y = years.length;
  const byYear = years.map((y) => space.nodes.filter((n) => n.p.y === y).reverse());
  byYear.forEach((list, i) => list.forEach((n, j) => {
    n.yi = i;
    // the first year is there from the start; later years fill in on the way to their dot
    n.th = i === 0 ? -1 : i - 0.92 + (0.8 * j) / list.length;
  }));

  // Overlay caption: year, counts, and this year's papers.
  const cap = el("div", "tl-cap");
  shell.appendChild(cap);

  // Scrubber: one column per year with a bar stacked by main domain.
  const bar = $(".tl-bar", root);
  const max = Math.max(...byYear.map((l) => l.length));
  const order = Object.keys(DOMAINS);
  bar.innerHTML = `
    <button class="tl-play icon-btn" aria-label="Play"></button>
    <div class="tl-track" style="--n:${Y}" role="slider" tabindex="0" aria-label="Year" aria-valuemin="${years[0]}" aria-valuemax="${years[Y - 1]}">
      <div class="tl-cols">${byYear.map((l, i) => {
        const seg = order.map((k) => [k, l.filter((n) => n.p.d[0] === k).length]).filter(([, c]) => c);
        return `<div class="tl-col" data-i="${i}">
          <div class="tl-stack" style="height:${(l.length / max) * 100}%">${seg.map(([k, c]) => `<i style="flex:${c};background:${DOMAINS[k].color}"></i>`).join("")}</div>
          <span class="tl-n mono">${l.length}</span>
          <b class="tl-dot"></b>
          <span class="tl-y mono">${years[i]}</span>
        </div>`;
      }).join("")}</div>
      <div class="tl-rail"><div class="tl-fill"></div><div class="tl-knob"></div></div>
    </div>`;
  const track = $(".tl-track", bar), fill = $(".tl-fill", bar), knob = $(".tl-knob", bar), play = $(".tl-play", bar);
  const cols = $$(".tl-col", bar);

  let shown = -1, shownDone = null;
  const render = () => {
    const v = space.v;
    space.year = clamp(Math.ceil(v - 0.001), 0, Y - 1);
    space.done = v >= Y - 1;
    const pct = (v / (Y - 1)) * 100 + "%";
    fill.style.width = pct;
    knob.style.left = pct;
    cols.forEach((c, i) => {
      c.classList.toggle("past", i < space.year || space.done);
      c.classList.toggle("now", i === space.year && !space.done);
    });
    track.setAttribute("aria-valuenow", years[space.year]);
    shell.classList.toggle("tl-done", space.done);

    if (shown === space.year && shownDone === space.done) return;
    shown = space.year; shownDone = space.done;
    const total = byYear.slice(0, space.year + 1).flat().length;
    if (space.done) {
      cap.innerHTML = `<div class="tl-big">${years[0]}<span>–</span>${String(years[Y - 1]).slice(2)}</div>
        <div class="mono muted">${total} papers · ${order.length} domains</div>
        <p>${space.touch ? "Tap a star to read about it, or swipe sideways to spin." : "Hover a star to read about it, drag to spin, or pick a domain."}</p>
        <a class="btn" href="research.html">Open the full explorer →</a>`;
      return;
    }
    const list = byYear[space.year], k = matchMedia("(max-width: 760px)").matches ? 1 : 3;
    cap.innerHTML = `<div class="tl-big">${years[space.year]}</div>
      <div class="mono muted">+${list.length} paper${list.length > 1 ? "s" : ""} · ${total} total</div>
      <ul>${list.slice(-k).reverse().map((n) => `<li><i style="background:${DOMAINS[n.p.d[0]].color}"></i><a href="${n.p.u}" target="_blank" rel="noopener">${n.p.t}</a></li>`).join("")}</ul>
      ${list.length > k ? `<div class="mono muted tl-more">+${list.length - k} more</div>` : ""}`;
  };

  // Playback: one animation loop, started on demand, drives both play and snapping.
  const END = Y - 1, SPEED = 1 / 1700; // years per ms
  let playing = false, last = 0, snap = null, raf = 0;
  const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  const tick = (t) => {
    raf = 0;
    const dt = clamp(t - last, 0, 64);
    last = t;
    if (snap != null) {
      space.v += (snap - space.v) * 0.2;
      if (Math.abs(snap - space.v) < 0.005) { space.v = snap; snap = null; }
    } else if (playing) {
      space.v = Math.min(END, space.v + dt * SPEED);
      if (space.v >= END) setPlaying(false);
    }
    render();
    if (playing || snap != null) raf = requestAnimationFrame(tick);
  };
  const setPlaying = (on) => {
    playing = on;
    play.classList.toggle("on", on);
    play.setAttribute("aria-label", on ? "Pause" : space.v >= END ? "Replay" : "Play");
    play.innerHTML = on ? "❚❚" : space.v >= END ? "↻" : "▶";
    if (on) { snap = null; kick(); }
  };
  const seek = (v, animate) => {
    v = clamp(v, 0, END);
    if (animate) { snap = v; kick(); }
    else { snap = null; space.v = v; render(); }
    setPlaying(false);
    if (animate) play.innerHTML = v >= END ? "↻" : "▶";
  };

  play.addEventListener("click", () => {
    if (playing) return setPlaying(false);
    if (space.v >= END) { space.v = 0; render(); }
    setPlaying(true);
  });

  // Drag the scrubber; release settles on the nearest year's dot.
  const at = (e) => {
    const r = $(".tl-rail", bar).getBoundingClientRect();
    return ((e.clientX - r.left) / r.width) * END;
  };
  let dragging = false;
  track.addEventListener("pointerdown", (e) => {
    dragging = true;
    track.setPointerCapture(e.pointerId);
    track.classList.add("drag");
    seek(at(e));
  });
  track.addEventListener("pointermove", (e) => dragging && seek(at(e)));
  const release = () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("drag");
    seek(Math.round(space.v), true);
  };
  track.addEventListener("pointerup", release);
  track.addEventListener("pointercancel", release);
  track.addEventListener("keydown", (e) => {
    const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (step) {
      e.preventDefault();
      seek(Math.round(space.v) + step, true);
    } else if (e.key === " ") { e.preventDefault(); play.click(); }
  });

  // ?t=2.5 starts at a playhead position, from 0 (first year) to years - 1 (handy for previews)
  const q = new URLSearchParams(location.search).get("t");
  if (space.reduced) { space.v = END; render(); setPlaying(false); }
  else if (q != null) { space.v = clamp(+q, 0, END); render(); setPlaying(false); }
  else {
    render();
    setPlaying(false);
    // Autoplay once, the first time the box is mostly in view.
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      setTimeout(() => setPlaying(true), 400);
    }, { threshold: 0.6 });
    io.observe(shell);
  }
}

