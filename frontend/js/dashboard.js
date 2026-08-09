document.addEventListener("DOMContentLoaded", async () => {
  const statGrid = document.getElementById("statGrid");

  try {
    const stats = await Api.statistics();
    statGrid.innerHTML = `
      <div class="card stat-card"><div class="stat-label">Total Customers</div><div class="stat-value cyan">${stats.total_customers}</div></div>
      <div class="card stat-card"><div class="stat-label">Segments</div><div class="stat-value cyan">${stats.total_segments}</div></div>
      <div class="card stat-card"><div class="stat-label">Low Risk</div><div class="stat-value mint">${stats.low_risk}</div></div>
      <div class="card stat-card"><div class="stat-label">High Risk</div><div class="stat-value coral">${stats.high_risk}</div></div>
    `;
  } catch (err) {
    statGrid.innerHTML = `<div class="card" style="grid-column:1/-1;color:var(--text-dim)">Couldn't load live stats &mdash; is the backend running at ${API_BASE_URL}?</div>`;
  }

  try {
    const { points } = await Api.scatterData();
    document.getElementById("heroPointCount").textContent = `n=${points.length}`;
    makeScatterChart(document.getElementById("heroScatter"), points);
    renderLegend(document.getElementById("heroLegend"));
  } catch (err) {
    document.getElementById("heroPointCount").textContent = "offline";
  }
});

function renderLegend(container) {
  const labels = {
    0: "Standard",
    1: "Premium",
    2: "Impulsive Spender",
    3: "Conservative",
    4: "Budget / At-Risk",
  };
  container.innerHTML = Object.entries(labels)
    .map(
      ([id, name]) => `
      <div class="legend-item">
        <span class="legend-swatch" style="background:${CLUSTER_COLORS[id]}"></span>${name}
      </div>`
    )
    .join("");
}
