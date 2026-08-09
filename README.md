# Customer Segmentation & Risk Analysis System

A full-stack web app that uses a **pre-trained K-Means model** to classify
customers into real segments and a cluster-based risk status.

> **Note on the model.** The uploaded notebook
> (`notebooks/01-kmeans-customer-segmentation.ipynb`) trains K-Means with
> `n_clusters=5` on two raw features — **Annual Income (k$)** and
> **Spending Score (1-100)** — from the classic 200-row Mall Customers
> dataset, with **no scaler**. This app is built around that exact model,
> not the 4-cluster / 4-feature / scaler example in the original brief.
> Where the two disagreed, the real trained model won — see
> "Deviations from the original brief" below.

## 1. Project structure

```
customer-segmentation/
├── backend/
│   ├── app.py                     # Flask entrypoint, loads model+data once
│   ├── routes/
│   │   ├── prediction.py          # POST /api/predict
│   │   ├── analytics.py           # GET /api/statistics, /segments, ...
│   │   └── model.py               # GET /api/model-info
│   ├── services/
│   │   ├── prediction_service.py  # validation + inference
│   │   └── analytics_service.py   # dataset-derived stats
│   ├── config/
│   │   └── cluster_mapping.py     # cluster -> segment/risk, with reasoning
│   ├── models/
│   │   └── kmeans_model.pkl       # the trained model (joblib)
│   ├── data/
│   │   └── customers.csv          # training data + assigned cluster labels
│   └── requirements.txt
├── frontend/
│   ├── index.html                 # dashboard / hero
│   ├── analysis.html              # main feature: form + prediction
│   ├── segments.html              # segment cards
│   ├── analytics.html             # charts
│   ├── model.html                 # About Model page
│   ├── css/style.css
│   └── js/                        # config, api client, scatter chart, pages
├── notebooks/
│   └── 01-kmeans-customer-segmentation.ipynb   # original training notebook
└── README.md
```

## 2. Setup & run

### Backend

```bash
cd backend
python3 -m venv venv && source venv/bin/activate   # optional but recommended
pip install -r requirements.txt
python3 app.py
```

The API starts on **http://localhost:5000**. The model and dataset are
loaded once at startup (see the log line "Model and dataset loaded
successfully"), not on every request.

### Frontend

The frontend is plain HTML/CSS/JS — no build step. Serve it with any
static file server, e.g.:

```bash
cd frontend
python3 -m http.server 8080
```

Then open **http://localhost:8080**. If your backend runs somewhere other
than `http://localhost:5000`, update `API_BASE_URL` in `frontend/js/config.js`.

## 3. API documentation

| Method | Endpoint                | Purpose                                          |
|--------|--------------------------|---------------------------------------------------|
| GET    | `/api/health`            | Liveness check                                     |
| POST   | `/api/predict`           | Classify a customer                                |
| GET    | `/api/statistics`        | Dataset-wide counts (total, per-risk)              |
| GET    | `/api/segments`          | Per-segment stats (count, avg income/spending/age) |
| GET    | `/api/cluster-analysis`  | Per-cluster average feature values                 |
| GET    | `/api/scatter-data`      | All 200 (income, spending, cluster) points         |
| GET    | `/api/segment-distribution` | Segment name -> count, for the pie chart        |
| GET    | `/api/model-info`        | Algorithm, features, cluster->segment mapping      |

### Example request

```
POST /api/predict
Content-Type: application/json

{
  "customer_name": "Aditi Sharma",
  "age": 25,
  "annual_income": 75,
  "spending_score": 82
}
```

### Example response

```json
{
  "success": true,
  "cluster": 1,
  "segment": "Premium Customer",
  "risk_status": "Low Risk",
  "description": "High income paired with high spending. The most valuable and engaged customer group.",
  "input": {
    "annual_income": 75.0,
    "spending_score": 82.0,
    "age": 25.0,
    "customer_name": "Aditi Sharma"
  }
}
```

### Validation errors

```json
{ "success": false, "error": "spending_score must be between 1 and 100" }
```

`annual_income` is in **thousands of dollars** (k$), matching how the
model was trained — the frontend form and result cards label this clearly.

## 4. ML integration, end to end

```
Frontend Form
   -> POST /api/predict (JSON)
   -> Flask route (routes/prediction.py)
   -> validate_input() (services/prediction_service.py)
   -> pd.DataFrame with columns in EXACT training order
       ["Annual Income (k$)", "Spending Score (1-100)"]
   -> model.predict(features)   [model loaded once at startup via joblib]
   -> cluster id (0-4)
   -> CLUSTER_MAPPING[cluster] -> segment name, risk label, description
   -> JSON response
   -> Frontend renders the risk panel, cluster, and insight cards,
      and drops the customer's exact point onto the same Income vs
      Spending scatter chart the notebook itself produced.
```

The model is never retrained and the scaler step (`scaler.transform()`)
is intentionally **not present**, because the trained model was fit on
raw values — adding scaling now would silently move every customer into
a different cluster than the one the actual `kmeans_model.pkl` predicts.

## 5. Cluster -> segment -> risk mapping

Derived from the real cluster centers (`model.cluster_centers_`), not
invented:

| Cluster | Center (Income, Spending) | Segment                   | Risk        |
|---------|----------------------------|----------------------------|-------------|
| 0       | (55.3, 49.5)                | Standard Customer          | Medium Risk |
| 1       | (86.5, 82.1)                | Premium Customer           | Low Risk    |
| 2       | (25.7, 79.4)                | Impulsive Spender          | Medium Risk |
| 3       | (88.2, 17.1)                | Conservative Customer      | Medium Risk |
| 4       | (26.3, 20.9)                | Budget / At-Risk Customer  | High Risk   |

"Risk" is a **cluster-based classification** describing engagement/churn
risk, not a predicted probability of financial or credit risk. This is
stated explicitly on the "About Model" page. The full reasoning lives in
`backend/config/cluster_mapping.py` — edit that one file to change the
mapping; nothing else needs to change.

## 6. Deviations from the original brief

The original brief assumed 4 features (Age, Annual Income, Spending
Score, Purchase Frequency), a `StandardScaler`, and 4 clusters. The
*actual* uploaded notebook trains on 2 features with no scaler and 5
clusters. Per the brief's own instruction ("If the trained model uses
different features, automatically adapt the input pipeline to those
features" / "Do not invent cluster meanings"), this app was built to
match the real model:

- **Features**: only Annual Income and Spending Score feed the model.
  Age is collected on the form for display only (shown in the insight
  cards) since the model was never trained on it. Purchase Frequency
  doesn't exist in the source dataset, so it isn't collected at all.
- **Scaler**: none, because none was used during training.
- **Clusters**: 5, not 4, matching `n_clusters=5` in the notebook.

## 7. Error handling

- Missing/invalid fields -> `400` with a specific validation message.
- Model or dataset file missing -> `503` with a generic "service
  unavailable" message (no stack traces are ever sent to the client).
- Network failure -> the frontend shows a toast + inline banner
  ("Unable to reach the ML service...") instead of hanging.
- Duplicate submissions are prevented by disabling the submit button
  while a request is in flight.
