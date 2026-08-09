const RISK_BADGE = {
  "Low Risk": "badge-low",
  "Medium Risk": "badge-medium",
  "High Risk": "badge-high",
};

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("segmentGrid");
  try {
    const { segments } = await Api.segments();
    grid.innerHTML = segments
      .map((s) => {
        const center = CLUSTER_CENTERS[s.cluster];
        return `
      <div class="card segment-card">
        <div class="seg-head">
          <div>
            <h3>${s.segment}</h3>
            <span class="center-coords">center: (${center[0].toFixed(1)}, ${center[1].toFixed(1)})</span>
          </div>
          <span class="badge ${RISK_BADGE[s.risk] || "badge-medium"}">${s.risk}</span>
        </div>
        <p class="desc">${s.description}</p>
        <div class="seg-stats">
          <div class="seg-stat"><div class="n">${s.customers}</div><div class="l">Customers</div></div>
          <div class="seg-stat"><div class="n">₹${(s.avg_income * 1000).toLocaleString("en-IN")}</div><div class="l">Avg Income</div></div>
          <div class="seg-stat"><div class="n">${s.avg_spending_score}</div><div class="l">Avg Spend Score</div></div>
        </div>
      </div>`;
      })
      .join("");
  } catch (err) {
    grid.innerHTML = `<div class="card" style="grid-column:1/-1;color:var(--text-dim)">Couldn't load segments &mdash; is the backend running at ${API_BASE_URL}?</div>`;
  }
});
