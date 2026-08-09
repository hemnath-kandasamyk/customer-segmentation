let scatterChart = null;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { points } = await Api.scatterData();
    scatterChart = makeScatterChart(document.getElementById("analysisScatter"), points);
    renderAnalysisLegend();
  } catch (err) {
    // scatter is supplementary; fail silently, form still works
  }

  document.getElementById("analysisForm").addEventListener("submit", onSubmit);
});

function renderAnalysisLegend() {
  const labels = {
    0: "Standard",
    1: "Premium",
    2: "Impulsive Spender",
    3: "Conservative",
    4: "Budget / At-Risk",
  };
  document.getElementById("analysisLegend").innerHTML = Object.entries(labels)
    .map(
      ([id, name]) => `
      <div class="legend-item">
        <span class="legend-swatch" style="background:${CLUSTER_COLORS[id]}"></span>${name}
      </div>`
    )
    .join("");
}

function clearFieldErrors() {
  document.querySelectorAll(".field-error").forEach((el) => {
    el.classList.remove("show");
    el.textContent = "";
  });
  document.querySelectorAll(".input").forEach((el) => el.classList.remove("error"));
  const banner = document.getElementById("formErrorBanner");
  banner.classList.remove("show");
  banner.textContent = "";
}

function showBanner(msg) {
  const banner = document.getElementById("formErrorBanner");
  banner.textContent = msg;
  banner.classList.add("show");
}

function validateClientSide(annualIncome, spendingScore, age) {
  let ok = true;

  if (annualIncome === "" || isNaN(annualIncome) || Number(annualIncome) < 0) {
    setFieldError("annualIncome", "Enter a valid, non-negative income.");
    ok = false;
  }
  if (
    spendingScore === "" ||
    isNaN(spendingScore) ||
    Number(spendingScore) < 1 ||
    Number(spendingScore) > 100
  ) {
    setFieldError("spendingScore", "Spending score must be between 1 and 100.");
    ok = false;
  }
  if (age !== "" && (isNaN(age) || Number(age) < 18 || Number(age) > 100)) {
    setFieldError("age", "Age must be between 18 and 100.");
    ok = false;
  }
  return ok;
}

function setFieldError(fieldId, msg) {
  const input = document.getElementById(fieldId);
  const err = document.getElementById(fieldId + "Error");
  input.classList.add("error");
  err.textContent = msg;
  err.classList.add("show");
}

async function onSubmit(e) {
  e.preventDefault();
  clearFieldErrors();

  const submitBtn = document.getElementById("submitBtn");
  const customerName = document.getElementById("customerName").value.trim();
  const age = document.getElementById("age").value;
  const annualIncome = document.getElementById("annualIncome").value;
  const spendingScore = document.getElementById("spendingScore").value;

  if (!validateClientSide(annualIncome, spendingScore, age)) {
    showBanner("Please fix the highlighted fields before analyzing.");
    return;
  }

  submitBtn.disabled = true;
  const originalLabel = submitBtn.innerHTML;
  submitBtn.innerHTML = `<span class="spinner"></span> Analyzing Customer...`;

  try {
    const result = await Api.predict({
      customer_name: customerName || undefined,
      age: age || undefined,
      annual_income: Number(annualIncome),
      spending_score: Number(spendingScore),
    });

    if (!result.success) {
      showBanner(result.error || "Unable to analyze customer.");
      return;
    }

    renderResult(result, customerName);

    if (scatterChart) {
      scatterChart.setHighlight(Number(annualIncome), Number(spendingScore), result.cluster);
    }
  } catch (err) {
    if (err instanceof ApiError) {
      showToast(err.title, err.detail);
      showBanner(err.detail);
    } else {
      showBanner("Unable to analyze customer. Please try again.");
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalLabel;
  }
}

const RISK_META = {
  "Low Risk": {
    cls: "low",
    title: "LOW RISK",
    sub: "Customer is healthy and highly engaged",
  },
  "Medium Risk": {
    cls: "medium",
    title: "MEDIUM RISK",
    sub: "Customer requires monitoring",
  },
  "High Risk": {
    cls: "high",
    title: "HIGH RISK",
    sub: "Customer requires attention",
  },
};

function renderResult(result, customerName) {
  document.getElementById("resultEmpty").style.display = "none";
  const content = document.getElementById("resultContent");
  content.style.display = "block";

  const meta = RISK_META[result.risk_status] || RISK_META["Medium Risk"];
  const panel = document.getElementById("riskPanel");
  panel.className = "risk-panel " + meta.cls;
  document.getElementById("riskTitle").textContent = meta.title;
  document.getElementById("riskSub").textContent = meta.sub;

  document.getElementById("resSegment").textContent = result.segment;
  document.getElementById("resCluster").textContent = `Cluster ${result.cluster}`;
  document.getElementById("resRisk").textContent = result.risk_status;

  document.getElementById("resInsight").textContent = result.description;

  const income = result.input.annual_income;
  const spending = result.input.spending_score;
  const age = result.input.age;

  const cards = [
    { label: "Income Level", value: `₹${(income * 1000).toLocaleString("en-IN")}` },
    { label: "Spending Score", value: spending },
    { label: "Customer Segment", value: result.segment.split(" ")[0] },
    { label: "Risk Level", value: result.risk_status.replace(" Risk", "") },
  ];
  if (age) cards.splice(1, 0, { label: "Age", value: age });

  document.getElementById("insightCards").innerHTML = cards
    .map(
      (c) => `
    <div class="insight-mini">
      <div class="label">${c.label}</div>
      <div class="value">${c.value}</div>
    </div>`
    )
    .join("");
}
