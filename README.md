# Rahul Bohra — Personal Portfolio

A premium, dark-themed personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## 🚀 Live Preview

> Deploy to GitHub Pages, Vercel, or Netlify for a live URL.

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # All styles (tokens, components, responsive)
├── script.js           # Animations, interactions, particles
├── assets/
│   ├── images/         # Add your profile photo here
│   ├── icons/
│   │   └── favicon.svg
│   └── resume/
│       └── Rahul_Bohra_Resume.pdf   ← Place your resume PDF here
└── README.md
```

## ✏️ How to Customize

### Replace Profile Photo
Add your photo to `assets/images/` and update the `about-image-placeholder` section in `index.html`:

```html
<!-- Replace the placeholder div with: -->
<img src="assets/images/your-photo.jpg" alt="Rahul Bohra" class="about-photo" />
```

### Add Resume
Place your resume PDF at: `assets/resume/Rahul_Bohra_Resume.pdf`

### Update Projects
Each project card in `index.html` is clearly commented. Update the `href` on the GitHub buttons and add a live demo URL when available.

### Add New Skills
Copy any `.skill-card` block in the Skills section and update the icon class and label.

### Update Contact Links
Search for `rahul.bohra.5575381@ves.ac.in`, `rahulbohradev`, and `rahul-bohra-43b078387` and replace with your own details.

## 🛠 Tech Stack

- **HTML5** — Semantic, SEO-friendly markup
- **CSS3** — Custom properties, Grid, Flexbox, glassmorphism
- **Vanilla JavaScript** — No frameworks
- **GSAP** — Hero and scroll animations
- **AOS** — Scroll reveal animations
- **Font Awesome** — Icons
- **Google Fonts** — Space Grotesk + Inter

## 🌐 Deploy

### GitHub Pages
1. Push this folder to a GitHub repo named `rahulbohradev.github.io`
2. Go to Settings → Pages → Source: Deploy from branch → `main` / `root`
3. Your site goes live at `https://rahulbohradev.github.io`

### Vercel (Recommended — fastest)
1. Run: `npx vercel` in this folder
2. Done — live in 30 seconds

### Netlify
1. Drag and drop this folder to netlify.com/drop
2. Done

## 📊 Performance

- Lazy loading on images
- Reduced motion support
- Semantic HTML for screen readers
- Mobile-first responsive design

---

Built with ❤️ by Rahul Bohra | Mumbai
