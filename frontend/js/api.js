const Api = (() => {
  async function request(path, options = {}) {
    let res;
    try {
      res = await fetch(`${API_BASE_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });
    } catch (err) {
      throw new ApiError(
        "Unable to reach the ML service",
        "Check that the backend is running at " + API_BASE_URL + "."
      );
    }

    let body = null;
    try {
      body = await res.json();
    } catch (_) {
      // no body
    }

    if (!res.ok) {
      const msg = (body && body.error) || `Request failed (${res.status})`;
      throw new ApiError("Something went wrong", msg);
    }

    return body;
  }

  return {
    predict: (payload) =>
      request("/api/predict", { method: "POST", body: JSON.stringify(payload) }),
    statistics: () => request("/api/statistics"),
    segments: () => request("/api/segments"),
    clusterAnalysis: () => request("/api/cluster-analysis"),
    scatterData: () => request("/api/scatter-data"),
    segmentDistribution: () => request("/api/segment-distribution"),
    modelInfo: () => request("/api/model-info"),
  };
})();

class ApiError extends Error {
  constructor(title, detail) {
    super(detail);
    this.title = title;
    this.detail = detail;
  }
}

function showToast(title, detail) {
  let toast = document.getElementById("globalToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "globalToast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<strong>${title}</strong>${detail}`;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 5000);
}
