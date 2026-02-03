# 💖 Will You Be My Valentine?

An interactive, playful, and romantic web application designed to ask that special someone to be your Valentine. This project features a hand-coded interactive book, draggable characters, and a cheeky evasive "NO" button.

## ✨ Features
- **Interactive Book Experience**: A multi-page card that opens with realistic 3D-style animations.
- **Draggable Characters**: 14 unique, animated cartoon characters that you can move around the pages.
- **Evasive "NO" Button**: A playful interaction where the "NO" button moves away when the cursor gets too close.
- **Celebratory Finale**: Full-screen heart confetti and fireworks when "YES" is clicked.
- **Atmospheric UI**: Floating hearts rising from the bottom, paper textures, and high-contrast romantic colors.

## 🚀 Running Locally

To run this project on your machine, follow these steps:

### Using Vite (Recommended)
1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed.
2. **Setup**: Clone or download this project into a folder.
3. **Initialize**: Open your terminal in that folder and run:
   ```bash
   npm install
   ```
4. **Run**: Start the development server:
   ```bash
   npm run dev
   ```
5. **View**: Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🌐 Deploying to the Web (Free with GitHub)

If you just upload these files to GitHub Pages, you will see a **Pink Screen** with no card. This is because browsers cannot read `.tsx` files directly. You must use the included **GitHub Action** to build the site.

### Step 1: Push to GitHub
1. Create a new repository on GitHub.
2. Push all files, including the `.github` folder, `package.json`, and `index.tsx`.

### Step 2: Configure GitHub Actions
1. Go to your repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, change it from "Deploy from a branch" to **"GitHub Actions"**.
3. Once you push code to the `main` branch, look at the **Actions** tab. You will see a workflow running.
4. When it finishes, your site will be live at the provided URL!

## 🛠️ Troubleshooting: "I only see a pink background!"
This happens for one of two reasons:
1. **No Build Step**: GitHub Pages is serving the raw `.tsx` files. Ensure you have switched your Page Source to "GitHub Actions" as described in Step 2 above.
2. **Missing Script**: Ensure `index.html` contains `<script type="module" src="./index.tsx"></script>` at the bottom of the body.

---

## ⚠️ Important Disclaimers

- **Browser Compatibility**: This app uses modern CSS Grid, 3D Transforms, and ES Modules. It is compatible with modern versions of Chrome, Edge, Safari, and Firefox. It **will not work** on Internet Explorer.
- **Mobile Support**: While the app is responsive, the "Draggable Characters" and "Evasive Button" features provide the best experience on desktop/laptop devices with a mouse or trackpad.
- **Build Requirement**: Because this app is built with React and TypeScript, it **requires** a build tool (like Vite) to function. Simply opening `index.html` as a file in your browser (`file://...`) will not work due to CORS and module security restrictions.
- **Static Assets**: All emoji characters and icons are rendered via standard UTF-8 or inline SVGs to ensure they load instantly without external image dependencies.

**Handcoded with ❤️**