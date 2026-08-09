// Reusable Income vs Spending Score scatter plot, rendered on a <canvas>.
// Used both as the hero's signature visual and on the analysis page,
// where a predicted customer point is overlaid and animated in.

const CLUSTER_COLORS = {
  0: "#8CA0B3", // Standard Customer
  1: "#4ADE9C", // Premium Customer
  2: "#F5B94D", // Impulsive Spender
  3: "#35E6D6", // Conservative Customer
  4: "#FF6B6B", // Budget / At-Risk Customer
};

const CLUSTER_CENTERS = {
  0: [55.3, 49.52],
  1: [86.54, 82.13],
  2: [25.73, 79.36],
  3: [88.2, 17.11],
  4: [26.3, 20.91],
};

function makeScatterChart(canvas, points) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  const PAD = { top: 16, right: 16, bottom: 34, left: 40 };
  const xMax = 140; // income k$
  const yMax = 100; // spending score

  let cssW, cssH;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    cssW = rect.width;
    cssH = rect.width * 0.66;
    canvas.style.height = cssH + "px";
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  function toPx(income, spending) {
    const x = PAD.left + (income / xMax) * (cssW - PAD.left - PAD.right);
    const y = cssH - PAD.bottom - (spending / yMax) * (cssH - PAD.top - PAD.bottom);
    return [x, y];
  }

  let highlight = null; // { income, spending, cluster, animT }
  let animRAF = null;

  function drawAxes() {
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#566674";

    for (let g = 0; g <= yMax; g += 25) {
      const [, y] = toPx(0, g);
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(cssW - PAD.right, y);
      ctx.stroke();
      ctx.fillText(g, 4, y + 3);
    }
    for (let g = 0; g <= xMax; g += 20) {
      const [x] = toPx(g, 0);
      ctx.beginPath();
      ctx.moveTo(x, PAD.top);
      ctx.lineTo(x, cssH - PAD.bottom);
      ctx.stroke();
      ctx.fillText(g, x - 6, cssH - PAD.bottom + 14);
    }
    ctx.fillStyle = "#8ca0b3";
    ctx.font = "10px Inter, sans-serif";
    ctx.fillText("Annual Income (k$)", cssW - PAD.right - 100, cssH - 4);
    ctx.save();
    ctx.translate(12, PAD.top + 6);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Spending Score", 0, 0);
    ctx.restore();
  }

  function drawPoints() {
    points.forEach((p) => {
      const [x, y] = toPx(p.income, p.spending_score);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = (CLUSTER_COLORS[p.cluster] || "#8CA0B3") + "aa";
      ctx.fill();
    });
  }

  function drawCenters() {
    Object.entries(CLUSTER_CENTERS).forEach(([cluster, [inc, sp]]) => {
      const [x, y] = toPx(inc, sp);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = CLUSTER_COLORS[cluster];
      ctx.fillRect(-5, -5, 10, 10);
      ctx.strokeStyle = "#070b10";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-5, -5, 10, 10);
      ctx.restore();
    });
  }

  function drawHighlight() {
    if (!highlight) return;
    const [x, y] = toPx(highlight.income, highlight.spending);
    const r = 6 + Math.sin(highlight.animT * 4) * 3;
    ctx.beginPath();
    ctx.arc(x, y, 10 + r, 0, Math.PI * 2);
    ctx.strokeStyle = (CLUSTER_COLORS[highlight.cluster] || "#35E6D6") + "88";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = CLUSTER_COLORS[highlight.cluster] || "#35E6D6";
    ctx.fill();
    ctx.strokeStyle = "#070b10";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, cssW, cssH);
    drawAxes();
    drawPoints();
    drawCenters();
    drawHighlight();
  }

  function animateHighlight(income, spending, cluster) {
    highlight = { income, spending, cluster, animT: 0 };
    if (animRAF) cancelAnimationFrame(animRAF);
    const start = performance.now();
    function tick(now) {
      highlight.animT = (now - start) / 1000;
      draw();
      animRAF = requestAnimationFrame(tick);
    }
    animRAF = requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  resize();

  return { setHighlight: animateHighlight, redraw: draw };
}
