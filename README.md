# 🌱 CadmiGuard - AIoT Cadmium Risk Prediction System

> **Protecting Durian Farms with AI**

A mobile application prototype for the **Samsung Solve for Tomorrow 2026** competition, demonstrating an AIoT-powered system for predicting Cadmium (Cd) contamination risk in durian farms.

![Status](https://img.shields.io/badge/Status-Prototype-green)
![Tech](https://img.shields.io/badge/Stack-React%20%2B%20TypeScript-blue)
![Competition](https://img.shields.io/badge/Competition-Samsung%20Solve%20for%20Tomorrow-purple)

---

## 📱 App Overview

CadmiGuard is an **AI Decision Support System** (not a chemical laboratory app) that helps durian farmers:

- 📊 Monitor soil health in real-time via IoT sensors
- ⚠️ Receive early warnings about Cadmium accumulation risk
- 🧠 Understand AI-powered root cause analysis
- 💡 Get actionable recommendations to protect their farms
- 📈 Track historical trends and patterns

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SYSTEM ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌─────────┐│
│  │  SENSORS │ ──▶ │  ESP32   │ ──▶ │  CLOUD   │ ──▶ │MOBILE APP││
│  │          │     │          │     │          │     │          ││
│  │ • pH     │     │ WiFi/    │     │ Firebase │     │ React    ││
│  │ • EC     │     │ LoRa     │     │ Realtime │     │ TypeScript││
│  │ • Moist  │     │ Gateway  │     │ Database │     │ Tailwind ││
│  │ • Temp   │     │          │     │          │     │          ││
│  └──────────┘     └──────────┘     └────┬─────┘     └─────────┘│
│                                          │                       │
│                                    ┌─────▼─────┐                │
│                                    │ AI ENGINE │                 │
│                                    │           │                 │
│                                    │ • Risk    │                 │
│                                    │   Score   │                 │
│                                    │ • Root    │                 │
│                                    │   Cause   │                 │
│                                    │ • Recom-  │                 │
│                                    │   mendation│                │
│                                    └───────────┘                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📲 App Screens

### 1. Splash Screen
- Animated logo with brand identity
- System connectivity status
- Competition branding

### 2. Dashboard
- **Soil Health Score** (0-100 ring gauge)
- **Cd Risk Score** (0-100 ring gauge)
- Quick sensor stats (pH, EC, Moisture, Temperature)
- 7-day risk trend chart
- Zone status summary
- Active alerts banner

### 3. Zone Monitoring
- 3 farm zones (A, B, C) with individual cards
- Per-zone: risk level, soil health, Cd risk scores
- Real-time sensor readings per zone
- Visual risk indicators (color-coded)

### 4. AI Analysis
- Root Cause Analysis with contribution percentages
- AI reasoning explanation (explainable AI)
- Confidence level indicator
- Key insights and risk factor breakdown

### 5. Recommendations
- Priority-grouped suggestions (Immediate, Short-term, Long-term)
- Expandable cards with cost, impact, and timeframe details
- Categories: Soil, Water, Fertilizer, Monitoring

### 6. Alerts
- Real-time notifications with priority levels
- Filter by All/Unread
- Alert types: Danger, Warning, Info
- Zone-specific alerts

### 7. Historical Data
- Interactive charts with multiple metrics
- Configurable time range (7d, 14d, 30d)
- Trend analysis with percentage changes
- Statistics: Average, Max, Min
- Multi-metric overlay view

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#16a34a` | Main brand, healthy states |
| Forest Dark | `#064e3b` | Headers, emphasis |
| Durian Gold | `#f59e0b` | Warnings, medium risk |
| Risk Red | `#ef4444` | Dangers, high risk |
| Calm Blue | `#6366f1` | pH, information |
| Cyan | `#06b6d4` | Water/moisture |
| Background | `#f8faf8` | App background |
| Card White | `#ffffff` | Card surfaces |

### Typography

- **Font:** Inter (Google Fonts)
- **Headings:** 700 weight, tight tracking
- **Body:** 400 weight, relaxed leading
- **Labels:** 500-600 weight, uppercase for categories

### UI Principles

- Apple-level minimal design
- Card-based layout with subtle shadows
- Color-coded risk visualization
- Smooth transitions and micro-animations
- Glassmorphism elements
- Mobile-first (390x844 iPhone frame)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Icons | Lucide React |
| Routing | React Router DOM |
| Build | Vite 6 |

### Production Stack (Recommended)

| Layer | Technology |
|-------|-----------|
| Mobile | React Native / Flutter |
| Backend | Firebase / Supabase |
| Realtime | Firebase Realtime Database |
| AI/ML | TensorFlow Lite / Python API |
| IoT | ESP32 + MQTT + Cloud Functions |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── App.tsx                    # Main app with routing & mobile frame
├── main.tsx                   # Entry point
├── index.css                  # Global styles & design tokens
├── components/
│   ├── BottomNav.tsx          # Bottom navigation bar
│   ├── ScoreRing.tsx          # Circular progress indicator
│   └── MiniChart.tsx          # Dashboard mini chart
├── screens/
│   ├── SplashScreen.tsx       # Splash/loading screen
│   ├── Dashboard.tsx          # Main dashboard
│   ├── ZoneMonitoring.tsx     # Zone-by-zone view
│   ├── AIAnalysisScreen.tsx   # AI root cause analysis
│   ├── RecommendationScreen.tsx # AI recommendations
│   ├── AlertsScreen.tsx       # Notifications
│   └── HistoricalDataScreen.tsx # Historical charts
└── data/
    └── mockSensorData.ts      # Mock IoT sensor data
```

---

## 🌾 IoT Sensor Details

| Sensor | Range | Safe Range | Risk Trigger |
|--------|-------|------------|--------------|
| pH | 0-14 | 5.5-6.5 | < 5.0 (acidic = Cd mobile) |
| EC (Salinity) | 0-5 mS/cm | < 2.0 | > 2.5 (salt = Cd soluble) |
| Moisture | 0-100% | 30-50% | < 25% (dry = Cd concentrate) |
| Temperature | 15-45°C | 25-32°C | > 35°C (heat stress) |

### Why These Sensors Predict Cd Risk

- **Low pH** → Acidic soil mobilizes Cd from soil particles
- **High EC** → Salinity increases Cd solubility and plant uptake
- **Low moisture** → Concentrates salts and heavy metals
- **High temperature** → Accelerates chemical reactions
- **Combination** → Synergistic effect multiplies risk

---

## 🧠 AI Model Approach

The AI engine uses a **multi-factor regression model** that:

1. **Correlates** sensor readings with known Cd risk factors
2. **Weights** each factor based on scientific literature
3. **Predicts** likelihood of Cd accumulation over time
4. **Explains** its reasoning to farmers in plain language
5. **Recommends** evidence-based interventions

### Key AI Principles

- ✅ **Explainable** - Every prediction has a clear reasoning
- ✅ **Evidence-based** - Grounded in soil science research
- ✅ **Understandable** - Written for farmers, not scientists
- ✅ **Actionable** - Always paired with recommendations

---

## 🏆 Competition Context

**Samsung Solve for Tomorrow 2026**

- Team: TWIN
- Focus: AIoT + Environmental Protection
- Problem: Cadmium contamination in Thai durian farms
- Solution: Predictive AI system using affordable IoT sensors

---

## 📄 License

This project is a prototype for educational and competition purposes.

---

*Built with ❤️ by TWIN Team - Samsung Solve for Tomorrow 2026*
