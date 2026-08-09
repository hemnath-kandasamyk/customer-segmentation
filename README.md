<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=Customer%20Segmentation%20AI&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20Customer%20Behavior%20%26%20Risk%20Analysis&descAlignY=58&descSize=18" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&duration=3000&pause=800&color=6C63FF&center=true&vCenter=true&width=700&lines=Unsupervised+Machine+Learning+%F0%9F%A4%96;K-Means+Clustering+Engine+%F0%9F%93%8A;Real-Time+Customer+Insights+%E2%9A%A1;Segment.+Predict.+Understand.+%F0%9F%9A%80" alt="Typing SVG" />

<br/>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://customer-segmentation-pearl.vercel.app/index.html)
[![Machine Learning](https://img.shields.io/badge/ML-K--Means-blue?style=for-the-badge)](https://scikit-learn.org/stable/modules/clustering.html)
[![Python](https://img.shields.io/badge/Python-3.x-yellow?style=for-the-badge&logo=python)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-orange?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

![Profile Views](https://komarev.com/ghpvc/?username=customer-segmentation-ai&color=6C63FF&style=for-the-badge&label=REPO+VIEWS)
![Status](https://img.shields.io/badge/Status-Live%20%F0%9F%9F%A2-success?style=for-the-badge)
![Maintained](https://img.shields.io/badge/Maintained-Yes-brightgreen?style=for-the-badge)

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 🌐 Live Application

<div align="center">

### 🚀 [**Open Customer Segmentation AI**](https://customer-segmentation-pearl.vercel.app/index.html) 🚀

<img src="https://raw.githubusercontent.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/main/assets/rocket-launch.gif" width="60"/>

</div>

The application provides an interactive web interface for analyzing customer behavior using a **pre-trained K-Means clustering model**.

Users can enter customer information and receive:

- 🎯 Customer segment
- 🔮 Predicted cluster
- ⚠️ Cluster-based risk status
- 💡 Customer insights
- 📊 Segment analytics
- 📈 Dataset statistics
- 🧠 Model information

> **Note:** Risk status is a cluster-based business interpretation. K-Means itself does not produce a probability of customer risk.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 📑 Table of Contents

<details open>
<summary>Click to expand</summary>

- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Machine Learning](#-machine-learning)
- [Prediction Pipeline](#-prediction-pipeline)
- [Important ML Note](#️-important-ml-note)
- [Features](#-features)
- [Technology Stack](#️-technology-stack)
- [System Architecture](#️-system-architecture)
- [Frontend Structure](#-frontend-structure)
- [API Integration](#-api-integration)
- [Example Prediction Request](#-example-prediction-request)
- [Running Locally](#-running-the-project-locally)
- [Deployment](#️-deployment)
- [Application Pages](#-application-pages)
- [Future Improvements](#-future-improvements)
- [Possible ML Improvements](#-possible-ml-improvements)
- [Educational Purpose](#-educational-purpose)
- [Project Highlights](#-project-highlights)
- [References](#-references--inspiration)
- [Project Status](#-project-status)
- [License](#-license)

</details>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 📌 Project Overview

**Customer Segmentation AI** is a Machine Learning-powered web application designed to group customers based on similarities in their behavioral and financial characteristics.

The project uses a **pre-trained K-Means clustering model** to identify customer segments based primarily on customer income and spending behavior.

Instead of simply displaying the ML output as a cluster number, the application converts the cluster into a meaningful customer segment and a corresponding **cluster-based risk status**.

### 🔄 Core Workflow

```mermaid
flowchart TD
    A[👤 Customer Data] --> B[🖥️ Frontend Input Form]
    B --> C[🔌 REST API]
    C --> D[✅ Input Validation]
    D --> E[⚙️ Data Preprocessing]
    E --> F[📐 Saved Scaler]
    F --> G[🧠 Pre-trained K-Means Model]
    G --> H[🎯 Cluster Prediction]
    H --> I[🗂️ Cluster Interpretation]
    I --> J[⚠️ Risk Status]
    J --> K[📊 Frontend Dashboard]

    style A fill:#6C63FF,color:#fff
    style G fill:#FF6B6B,color:#fff
    style K fill:#4ECDC4,color:#fff
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 🎯 Problem Statement

Businesses often have customers with very different purchasing behaviors.

Treating every customer in the same way can make it difficult to:

- 🔍 Identify valuable customers
- 🧭 Understand customer behavior
- 📉 Detect low-engagement customers
- 🎯 Create targeted marketing strategies
- ⭐ Prioritize customer engagement
- 📊 Make data-driven decisions

This project addresses the problem by using **unsupervised Machine Learning** to automatically group customers into meaningful behavioral segments.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 💡 Our Solution

The system uses a pre-trained **K-Means clustering model** to classify a new customer's data into one of the learned clusters.

```mermaid
flowchart LR
    A[Customer Input] --> B["Annual Income<br/>Spending Score<br/>Other Features"]
    B --> C[Preprocessing]
    C --> D[K-Means]
    D --> E[Cluster 2]
    E --> F[Customer Segment]
    F --> G[Risk Status]

    style D fill:#6C63FF,color:#fff
    style G fill:#FF6B6B,color:#fff
```

The application then presents the result through an easy-to-understand dashboard.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 🧠 Machine Learning

### Algorithm — K-Means Clustering

K-Means is an **unsupervised Machine Learning algorithm** that groups similar data points into a predefined number of clusters.

<div align="center">

| 🔧 Property | 📋 Value |
|:---:|:---:|
| **Algorithm** | K-Means |
| **Clusters** | 5 |
| **Dataset** | 200 customers |
| **Learning Type** | Unsupervised |

</div>

The application uses the trained model for inference rather than retraining it whenever a user submits customer information.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 🔄 Prediction Pipeline

When a user enters customer information, the request flows through **7 stages**:

<details>
<summary><b>1️⃣ User Input</b></summary>

```json
{
  "age": 25,
  "annual_income": 75000,
  "spending_score": 82
}
```
</details>

<details>
<summary><b>2️⃣ Backend Validation</b></summary>

The API validates the submitted values.
</details>

<details>
<summary><b>3️⃣ Preprocessing</b></summary>

The same preprocessing/scaling used during model training is applied.
</details>

<details>
<summary><b>4️⃣ K-Means Prediction</b></summary>

The saved K-Means model predicts the customer's cluster.

```python
cluster = model.predict(scaled_data)
```
</details>

<details>
<summary><b>5️⃣ Cluster Interpretation</b></summary>

The cluster number is mapped to a meaningful customer segment.
</details>

<details>
<summary><b>6️⃣ Risk Status</b></summary>

A business-rule mapping converts the segment into a cluster-based risk status.
</details>

<details>
<summary><b>7️⃣ Frontend Result</b></summary>

The final result is displayed in the Customer Analysis dashboard.
</details>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## ⚠️ Important ML Note

> K-Means does **not** directly predict customer risk. It identifies groups of customers based on similarity.

```mermaid
flowchart TD
    A[K-Means Cluster] --> B[Cluster Interpretation]
    B --> C[Business Segment]
    C --> D[Cluster-Based Risk Status]

    style A fill:#6C63FF,color:#fff
    style D fill:#FF6B6B,color:#fff
```

The risk status should therefore be understood as a **business interpretation of the customer's cluster**, not a probability generated by the K-Means algorithm.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 📊 Dashboard
Overview of the customer dataset and segmentation results.
- Total customers
- Number of segments
- Risk distribution
- Customer statistics
- Model overview

</td>
<td width="50%" valign="top">

### 👤 Customer Analysis
Interactive form that runs the trained ML pipeline.
- Cluster
- Customer segment
- Risk status
- Customer insights

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🧩 Customer Segments
Overview of clusters discovered by the K-Means model.
- Customer count
- Average income
- Average spending behavior
- Risk classification
- Segment description

</td>
<td width="50%" valign="top">

### 📈 Analytics
Visual insights into the customer dataset.
- Income vs Spending visualization
- Segment distribution
- Risk distribution
- Cluster statistics
- Customer behavior analysis

</td>
</tr>
</table>

### 🤖 Model Information

```text
Algorithm          →  K-Means Clustering
Learning Type       →  Unsupervised Learning
Number of Clusters  →  5
Prediction Type     →  Customer Cluster Classification
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 🛠️ Technology Stack

<div align="center">

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)

### Machine Learning
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 🏗️ System Architecture

```mermaid
flowchart TD
    U[👤 USER] --> F[🖥️ Vercel Frontend<br/>HTML / CSS / JS]
    F -- REST API --> B[⚙️ Flask Backend<br/>Render]
    B --> V[✅ Input Validation<br/>& Preprocessing]
    V --> S[📐 Saved Scaler]
    S --> M[🧠 Pre-trained K-Means Model]
    M --> C[🎯 Cluster Prediction]
    C --> R[🗂️ Segment & Risk<br/>Interpretation]
    R --> D[📊 Frontend Result Dashboard]

    style U fill:#6C63FF,color:#fff
    style M fill:#FF6B6B,color:#fff
    style D fill:#4ECDC4,color:#fff
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 📂 Frontend Structure

```text
customer-segmentation-frontend/
│
├── index.html
├── analysis.html
├── analytics.html
├── model.html
├── segments.html
│
├── CSS/
│   └── styles.css
│
├── js/
│   ├── config.js
│   ├── analysis.js
│   ├── analytics.js
│   └── ...
│
└── README.md
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 🔌 API Integration

The frontend communicates with the backend through REST APIs.

| Environment | URL |
|---|---|
| 🖥️ **Local Development** | `http://localhost:5000` |
| ☁️ **Production** | `https://customer-segmentation-api-glw9.onrender.com` |

The frontend automatically uses the production API when deployed.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 📡 Example Prediction Request

```http
POST /api/predict
Content-Type: application/json
```

**Request:**
```json
{
  "age": 25,
  "annual_income": 75000,
  "spending_score": 82
}
```

**Response:**
```json
{
  "success": true,
  "cluster": 2,
  "segment": "Premium Customer",
  "risk_status": "Low Risk"
}
```

> The exact fields and segment names depend on the trained model and backend configuration.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 🚀 Running the Project Locally

### 1️⃣ Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd customer-segmentation
```

### 2️⃣ Start the backend

Create a Python environment:

```bash
python -m venv venv
```

Activate it:

```bash
# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask server:

```bash
python app.py
```

The backend should run on `http://localhost:5000` ✅

### 3️⃣ Run the Frontend

Because the frontend uses HTML/CSS/JavaScript, it can be opened using a local development server.

For example, with VS Code: **Live Server → Open `index.html`**

Or use any static web server.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## ☁️ Deployment

<div align="center">

| Layer | Platform | Link |
|:---:|:---:|:---:|
| 🖥️ **Frontend** | Vercel | [Live Website](https://customer-segmentation-pearl.vercel.app/index.html) |
| ⚙️ **Backend** | Render | [Production API](https://customer-segmentation-api-glw9.onrender.com/) |

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 📊 Application Pages

| Page | Purpose |
|---|---|
| 🏠 [Dashboard](https://customer-segmentation-pearl.vercel.app/index.html) | Overall customer segmentation overview |
| 👤 [Customer Analysis](https://customer-segmentation-pearl.vercel.app/analysis.html) | Analyze a new customer |
| 🧩 [Segments](https://customer-segmentation-pearl.vercel.app/segments.html) | Explore customer segments |
| 📈 [Analytics](https://customer-segmentation-pearl.vercel.app/analytics.html) | View customer analytics |
| 🧠 [About Model](https://customer-segmentation-pearl.vercel.app/model.html) | Learn about the ML model |

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 📈 Future Improvements

- [ ] Customer lifetime value prediction
- [ ] RFM-based segmentation
- [ ] Customer churn prediction
- [ ] Personalized marketing recommendations
- [ ] Customer similarity search
- [ ] Advanced anomaly detection
- [ ] Multiple clustering algorithms
- [ ] Automatic cluster interpretation
- [ ] Explainable AI
- [ ] Customer behavior forecasting
- [ ] Real-time analytics
- [ ] Authentication and role-based access
- [ ] Database integration
- [ ] Mobile application

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 🔬 Possible ML Improvements

Future versions can compare K-Means with:

- Gaussian Mixture Models
- DBSCAN
- Agglomerative Clustering
- BIRCH

This would allow the project to evaluate whether K-Means is the most appropriate clustering approach for the dataset.

Research on customer segmentation has also compared several clustering approaches, including K-Means, GMM, DBSCAN, agglomerative clustering, and BIRCH.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 🎓 Educational Purpose

This project demonstrates an end-to-end Machine Learning application:

```mermaid
flowchart LR
    A[Dataset] --> B[Preprocessing]
    B --> C[Feature Selection]
    C --> D[K-Means Training]
    D --> E[Model Serialization]
    E --> F[REST API]
    F --> G[Frontend Integration]
    G --> H[Prediction]
    H --> I[Visualization]
    I --> J[Deployment]

    style A fill:#6C63FF,color:#fff
    style J fill:#4ECDC4,color:#fff
```

It is designed as an educational/portfolio project demonstrating how a trained Machine Learning model can be integrated into a real web application.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 👨‍💻 Project Highlights

<table>
<tr>
<td valign="top" width="33%">

### 🧠 Machine Learning
- Unsupervised Learning
- K-Means Clustering
- Feature Scaling
- Cluster Interpretation

</td>
<td valign="top" width="33%">

### 💻 Software Development
- REST API
- Frontend ↔ Backend integration
- Model serving
- JSON-based communication
- Error handling

</td>
<td valign="top" width="33%">

### ☁️ Deployment
- Vercel frontend deployment
- Render backend deployment
- Production API integration

</td>
</tr>
</table>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## 📚 References & Inspiration

The project is based on established customer-segmentation approaches using K-Means clustering. Similar open-source implementations include:

- [Customer Segmentation using K-Means](https://github.com/mayursrt/customer-segmentation-using-k-means)
- [K-Means Customer Segmentation — Credit Card Behaviour](https://github.com/erenonal/K-means_customer_segmentation)
- [Customer Segmentation using K-Means Clustering](https://github.com/pantakanch/Customer-Segmentation-using-K-Means-Clustering)
- [Bank Customer Segmentation with K-Means](https://github.com/Thamilini/BankSeg-KMeans)
- [Retail E-Commerce Customer Segmentation](https://github.com/yulianthyho/Olist-Ecommerce-RFM-Customer-Segmentation)

These projects demonstrate common applications of K-Means for identifying customer groups based on behavioral and financial characteristics.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

## ⭐ Project Status

<div align="center">

| 🔧 | 📋 |
|:---:|:---:|
| **Status** | 🟢 Deployed |
| **Frontend** | Vercel |
| **Backend** | Render |
| **ML Model** | Pre-trained K-Means |
| **Clusters** | 5 |
| **Dataset** | 200 customers |
| **Application** | Live |

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=100%"/>

<div align="center">

## 🚀 Live Demo

### 👉 [**Launch Customer Segmentation AI**](https://customer-segmentation-pearl.vercel.app/index.html) 👈

<br/>

## 📄 License

This project is developed for educational and portfolio purposes.

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=16&duration=2500&pause=1000&color=8B8B8B&center=true&vCenter=true&width=500&lines=Made+with+%E2%9D%A4%EF%B8%8F+and+Python+%F0%9F%90%8D;Thanks+for+visiting+%E2%AD%90" alt="Footer" />

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer" width="100%"/>

</div>
