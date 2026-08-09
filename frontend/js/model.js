const RISK_BADGE = {
  "Low Risk": "badge-low",
  "Medium Risk": "badge-medium",
  "High Risk": "badge-high",
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const info = await Api.modelInfo();

    document.getElementById("infoRows").innerHTML = `
      <div class="info-row"><span class="k">Algorithm</span><span class="v">${info.algorithm}</span></div>
      <div class="info-row"><span class="k">Learning Type</span><span class="v">${info.learning_type}</span></div>
      <div class="info-row"><span class="k">Number of Clusters</span><span class="v">${info.number_of_clusters}</span></div>
      <div class="info-row"><span class="k">Preprocessing</span><span class="v">${info.preprocessing}</span></div>
      <div class="info-row"><span class="k">Model Status</span><span class="v">${info.model_status}</span></div>
      <div class="info-row"><span class="k">Prediction Type</span><span class="v">${info.prediction_type}</span></div>
    `;
    document.getElementById("infoNote").textContent = info.note;

    document.getElementById("featureChips").innerHTML = info.features_used
      .map((f) => `<span class="feature-chip">${f}</span>`)
      .join("");

    document.getElementById("mappingRows").innerHTML = info.segments
      .map(
        (s) => `
      <div class="info-row">
        <span class="k">Cluster ${s.cluster} &rarr; ${s.segment}</span>
        <span class="badge ${RISK_BADGE[s.risk] || "badge-medium"}">${s.risk}</span>
      </div>`
      )
      .join("");
  } catch (err) {
    document.getElementById("infoRows").innerHTML = `<div style="color:var(--text-dim)">Couldn't load model info &mdash; is the backend running at ${API_BASE_URL}?</div>`;
  }
});
