Chart.defaults.color = "#8ca0b3";
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.borderColor = "rgba(255,255,255,0.06)";

const SEGMENT_LABELS = {
  0: "Standard",
  1: "Premium",
  2: "Impulsive Spender",
  3: "Conservative",
  4: "Budget / At-Risk",
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadStats();
  await loadPieAndRisk();
  await loadScatter();
  await loadClusterStats();
});

async function loadStats() {
  const grid = document.getElementById("statGrid");
  try {
    const s = await Api.statistics();
    grid.innerHTML = `
      <div class="card stat-card"><div class="stat-label">Total Customers</div><div class="stat-value cyan">${s.total_customers}</div></div>
      <div class="card stat-card"><div class="stat-label">Segments</div><div class="stat-value cyan">${s.total_segments}</div></div>
      <div class="card stat-card"><div class="stat-label">Low Risk</div><div class="stat-value mint">${s.low_risk}</div></div>
      <div class="card stat-card"><div class="stat-label">High Risk</div><div class="stat-value coral">${s.high_risk}</div></div>
    `;
  } catch (err) {
    grid.innerHTML = `<div class="card" style="grid-column:1/-1;color:var(--text-dim)">Couldn't load statistics &mdash; is the backend running at ${API_BASE_URL}?</div>`;
  }
}

async function loadPieAndRisk() {
  try {
    const { distribution } = await Api.segmentDistribution();
    new Chart(document.getElementById("segmentPieChart"), {
      type: "doughnut",
      data: {
        labels: distribution.map((d) => d.segment),
        datasets: [
          {
            data: distribution.map((d) => d.count),
            backgroundColor: Object.values(CLUSTER_COLORS),
            borderColor: "#10161d",
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: { legend: { position: "bottom", labels: { boxWidth: 10, padding: 14 } } },
      },
    });
  } catch (err) {
    showToast("Chart unavailable", "Couldn't load segment distribution.");
  }

  try {
    const s = await Api.statistics();
    new Chart(document.getElementById("riskChart"), {
      type: "bar",
      data: {
        labels: ["Low Risk", "Medium Risk", "High Risk"],
        datasets: [
          {
            data: [s.low_risk, s.medium_risk, s.high_risk],
            backgroundColor: ["#4ADE9C", "#F5B94D", "#FF6B6B"],
            borderRadius: 6,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: "rgba(255,255,255,0.06)" } },
          x: { grid: { display: false } },
        },
      },
    });
  } catch (err) {
    // already toasted above if same failure
  }
}

async function loadScatter() {
  try {
    const { points } = await Api.scatterData();
    makeScatterChart(document.getElementById("analyticsScatter"), points);
    document.getElementById("analyticsLegend").innerHTML = Object.entries(SEGMENT_LABELS)
      .map(
        ([id, name]) => `
        <div class="legend-item">
          <span class="legend-swatch" style="background:${CLUSTER_COLORS[id]}"></span>${name}
        </div>`
      )
      .join("");
  } catch (err) {
    showToast("Chart unavailable", "Couldn't load the income vs spending plot.");
  }
}

async function loadClusterStats() {
  try {
    const { clusters } = await Api.clusterAnalysis();
    new Chart(document.getElementById("clusterStatsChart"), {
      type: "bar",
      data: {
        labels: clusters.map((c) => SEGMENT_LABELS[c.cluster] || `Cluster ${c.cluster}`),
        datasets: [
          { label: "Avg Age", data: clusters.map((c) => c.avg_age), backgroundColor: "#8CA0B3", borderRadius: 5 },
          { label: "Avg Income (k$)", data: clusters.map((c) => c.avg_income), backgroundColor: "#35E6D6", borderRadius: 5 },
          { label: "Avg Spending Score", data: clusters.map((c) => c.avg_spending_score), backgroundColor: "#F5B94D", borderRadius: 5 },
        ],
      },
      options: {
        plugins: { legend: { position: "bottom", labels: { boxWidth: 10, padding: 14 } } },
        scales: {
          y: { beginAtZero: true, grid: { color: "rgba(255,255,255,0.06)" } },
          x: { grid: { display: false } },
        },
      },
    });
  } catch (err) {
    showToast("Chart unavailable", "Couldn't load cluster statistics.");
  }
}
