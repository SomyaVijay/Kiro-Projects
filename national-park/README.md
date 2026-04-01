# 🏞️ US National Parks Itinerary Generator

A fully interactive web application that generates personalized road trip itineraries across US National Parks — built with AI-assisted development using **Amazon Kiro**.

🔗 **Live Demo:** [https://somyavijay.github.io/Kiro-Projects/](https://somyavijay.github.io/Kiro-Projects/)


## 🤖 Built With AI-Assisted Development (Amazon Kiro)

This project is a real-world example of **agentic AI-assisted software development** using [Amazon Kiro](https://kiro.dev) — an AI-powered IDE that supports spec-driven development and natural language programming.

### The Development Journey

| Stage | What Happened |
|-------|--------------|
| **v1 — Python CLI** | Started as a command-line Python script (`national_parks_itinerary.py`) with core logic for distance calculations and seasonal recommendations |
| **v2 — Web App (Kiro)** | Used Amazon Kiro's agentic chat to convert, expand, and deploy the entire application as a modern web app |

### How Amazon Kiro Was Used

- **Spec-driven development** — Described app requirements in natural language; Kiro generated structured specs before writing any code
- **Code generation** — Converted Python logic (Haversine distance formula, seasonal filtering) into vanilla JavaScript
- **Architecture decisions** — Used Kiro's agentic chat to separate concerns: extracted JS into `app.js`, structured HTML, and set up GitHub Pages config
- **Deployment automation** — Kiro generated the full GitHub Actions workflow (`pages.yml`) for CI/CD to GitHub Pages
- **Iterative refinement** — Prompted Kiro to add features like Google Maps integration, social sharing, and mobile responsiveness that weren't in the original Python version


## ✨ Features

- **📍 Location-Based Recommendations** — Finds parks within driving distance from 27 major US cities
- **📅 Seasonal Optimization** — Recommends parks based on best visiting months and live weather data
- **🗺️ Google Maps Integration** — One-click route planning directly in Google Maps
- **🥾 Trail Filtering** — Filter hikes by difficulty, family-friendliness, and stroller accessibility
- **📤 Social Sharing** — Share itineraries via email, Twitter, Facebook, and WhatsApp
- **🌡️ Temperature Toggle** — Switch between Fahrenheit and Celsius
- **📱 Fully Responsive** — Works on mobile and desktop
- **♿ Accessible** — Screen reader friendly with keyboard navigation


## 🏔️ Parks Covered (19 Parks)

Olympic · Mount Rainier · North Cascades · Yellowstone · Grand Teton · Glacier · Yosemite · Sequoia · Kings Canyon · Death Valley · Joshua Tree · Grand Canyon · Zion · Bryce Canyon · Arches · Canyonlands · Rocky Mountain · Great Smoky Mountains · Acadia


## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Data | Custom park database with coordinates, trails, temps |
| Distance Algorithm | Haversine formula (converted from Python) |
| Images | Unsplash CDN |
| Maps | Google Maps integration |
| Deployment | GitHub Pages + GitHub Actions CI/CD |
| AI Development | Amazon Kiro (agentic IDE) |


## 🚀 How to Use

1. Select your **starting city** from the dropdown
2. Enter the **number of days** available
3. Choose your **travel month**
4. Click **"Find Nearby Parks"**
5. Select the parks you want to visit
6. View your custom itinerary with trails, weather, and Google Maps route


## 💡 What I Learned

- How to write effective **prompts and specs** for agentic AI tools
- **Reviewing and validating AI-generated code** — Kiro generated the structure, I verified the logic
- How AI tools can **accelerate full-stack development** without sacrificing code quality
- **Spec-driven development** workflow: requirements → specs → code → deployment
- Setting up **GitHub Actions CI/CD** for automatic GitHub Pages deployment


## 📁 Project Structure

```
├── index.html              # Main web app
├── app.js                  # All JavaScript logic (AI-generated from Python)
├── _config.yml             # Jekyll / GitHub Pages config
├── .github/
│   └── workflows/
│       └── pages.yml       # GitHub Actions deployment workflow
├── Old Python Code/
│   └── national_parks_itinerary.py   # Original v1 Python CLI script
└── README.md

## 🔧 Run Locally

```bash
git clone https://github.com/SomyaVijay/Kiro-Projects.git
cd Kiro-Projects
open index.html   # or just double-click the file
```

No build process, no dependencies, no server needed.

## 📌 About This Project

This project was created as part of self-directed learning in **generative AI tools and AI-assisted software development**. The goal was to explore how modern agentic AI IDEs like Kiro can be used to build and ship real products — not just generate code snippets.

---

*Built with ❤️ and Amazon Kiro*
