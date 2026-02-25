# Chicken & Egg — Birthday Surprise

A fun, interactive birthday website that lures someone in with the classic “Which came first, the chicken or the egg?” question, then reveals a countdown, curtain opening, and a **“You came first!”** message plus a video (e.g. a birthday video of them).

Use this code as inspiration for your own birthday or surprise pages.

---

## Respect Open-Source

I built this for **fun & learning**. If you fork or modify it:

- **Use it for creativity, personal projects, or learning**
- **Give proper credit when using it in public**
- **Respect the original creator’s work**

---

## How It Works

1. **Landing page** — Asks “Which came first, the chicken or the egg?” with **I need to know!** and **No idea** buttons.
2. **No button** — Cycles through funny chicken/egg messages and makes the Yes button grow and bounce.
3. **Yes button** — Takes them to the reveal page.
4. **Reveal page** — A **1… 2… 3…** countdown, then the curtain opens with confetti to show **“You came first!”** and **“Happy Birthday!”** plus a video (you add your own).

### Features

- Chicken-and-egg themed copy and playful No-button messages
- Floating egg/chicken decorations and bouncy button animations
- Curtain-opening reveal with countdown and confetti
- Video placeholder — add your “you came first” + birthday video

---

## How to Use

1. **Get the files**  
   Clone or download the repo (e.g. `index.html`, `styles.css`, `yes_style.css`, `yes_page.html`, `script.js`).

2. **Add your video**  
   In `yes_page.html`, inside the `<video>` tag, add:
   ```html
   <source src="your-video.mp4" type="video/mp4">
   ```
   Optionally set the `poster` attribute for a thumbnail.

3. **Open the project**  
   Open `index.html` in a browser (or use a local server if needed for video).

---

## Code Overview

### Files

- `index.html` — Main landing page (chicken/egg question and buttons)
- `styles.css` — Styles for the landing page (floating decorations, buttons, layout)
- `script.js` — Button logic: No cycles messages and grows Yes; Yes goes to reveal page
- `yes_page.html` — Reveal page: countdown, curtain, “You came first!”, Happy Birthday, video
- `yes_style.css` — Styles for countdown, curtain, confetti, and reveal content

### Key behavior

- `handleNoClick()` — Updates the No button text and increases Yes button size (with cap), adds bounce
- `handleYesClick()` — Redirects to `yes_page.html`
- Reveal page script — Runs 1… 2… 3… countdown, opens curtain, triggers confetti

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
