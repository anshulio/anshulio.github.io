# Anshul Raj — Personal Developer Portfolio

A minimalist, dark-themed personal developer portfolio designed for GitHub Pages.

![Screenshot](Minimalist%20Dark%20Portfolio%20with%20Mountain%20Line%20Art.png)

## ✨ Features

- **Minimalist Aesthetic**: Near-black background (`#0B0B10`), off-white typography (`#E8E8F0`), and soft lavender accents (`#A995F5`).
- **Precision Visual Reference Match**: Terminal logo (`> anshulraj_`), two-column hero, custom mountain line-art illustration, and tech icon row.
- **Theme System**: Seamless dark and light themes with smooth transitions, localStorage persistence, and system preference detection.
- **Data-Driven**: All projects, skills, articles, and profile details are cleanly separated into [`js/data.js`](./js/data.js) for effortless updates.
- **Mobile Responsive**: Fully adaptive layout with a touch-friendly collapsible navigation menu and zero horizontal overflow.
- **GitHub Pages Ready**: 100% relative paths (`./`), zero backend dependencies, and `.nojekyll` enabled for instant static hosting on any root domain or repo subpath.

---

## 📁 File Structure

```
.
├── index.html                  # Semantic, accessible HTML5 structure
├── css/
│   └── style.css               # Design system, CSS variables & responsive layout
├── js/
│   ├── data.js                 # Easy configuration for projects, skills & articles
│   └── main.js                 # Theme switcher, active nav, mobile menu & dynamic data
├── assets/
│   ├── mountain-art.png        # Transparent minimalist mountain landscape illustration
│   └── favicon.svg             # Terminal prompt SVG favicon
├── scripts/
│   └── verify-build.js         # Build and asset integrity verification
├── .nojekyll                   # Bypasses Jekyll processing on GitHub Pages
└── package.json                # npm scripts for local development and verification
```

---

## 🛠️ Local Development

### Option 1: Using npm
```bash
# Start local development server
npm run dev

# Or test and verify assets
npm run build
```

### Option 2: Using Python
```bash
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

---

## ⚙️ Configuration & Customization

To customize your portfolio content, edit [`js/data.js`](./js/data.js):

- **Profile Info**: Name, subtitle, tagline, about paragraphs, and social links.
- **Projects**: Title, description, tags, GitHub repo link, and live demo link.
- **Skills**: Categorized skill groups (Programming, Web, Android, Systems, AI/ML, Database).
- **Articles / Notes**: Title, description, date, tag, and reading URL.

---

## 🚀 Deploying to GitHub Pages

1. Push this repository to GitHub (e.g. `https://github.com/anshulio/<repo-name>`).
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your website will be live in seconds at `https://anshulio.github.io/<repo-name>/`!
