# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An interactive birthday surprise website that poses the "chicken or egg" question, then reveals a personalized birthday message with videos, balloon animations, and a letter. Deployed to GitHub Pages at www.whatcamefirst.fun.

## Development

This is a static HTML/CSS/JS project with no build system or package manager.

**To run locally:** Open `index.html` in a browser, or use a local server for video playback:
```bash
python -m http.server 8000
# or
npx serve .
```

**Deployment:** Automatically deployed to GitHub Pages via `.github/workflows/deploy-pages.yml` on push to `main`.

## Architecture

### Page Flow
Each page is a separate HTML file with its own inline JavaScript:

1. `index.html` → Landing page with "chicken or egg" teaser question
2. `reveal.html` → Countdown (1...2...3), curtain animation, confetti, Video 1
3. `balloons.html` → 4 balloons to pop revealing "You are so special"
4. `video2.html` → Second birthday video
5. `envelope.html` → Envelope with typewriter letter animation (final page)

### File Structure
**Pages:**
- `index.html` - Landing page
- `reveal.html` - Countdown + curtain + first video
- `balloons.html` - Balloon pop interaction
- `video2.html` - Second video
- `envelope.html` - Final envelope/letter

**Styles:**
- `styles.css` - Landing page styles (floating decorations, button animations)
- `yes_style.css` - Shared styles for reveal pages (curtains, confetti, sections, balloons, envelope)

**Scripts:**
- `script.js` - Landing page button handler (redirects to reveal.html)
- Each reveal page has inline `<script>` with its own logic

**Legacy (can be removed):**
- `yes_page.html` - Old combined reveal page
- `yes_page.js` - Old combined reveal logic

### Assets
- `assets/` - balloon.png, balloon-popped.png, envelope-closed.png, envelope-open.png
- `photos/` - Gallery images (Vishu-1.jpeg through Vishu-8.jpeg)
- Video files: BhaiKaBdday.mp4, HappyBirthdayVishu.mp4
- Optional: bg-music.mp3 (background music), pop.mp3 (balloon pop sound)

## Customization Points

- Birthday message: Edit `birthdayMessage` variable in `envelope.html`
- Video 1: Update `<source>` in `reveal.html`
- Video 2: Update `<source>` in `video2.html`
- Balloon words: Edit `.balloon-word` spans in `balloons.html`
- Page title/subtitle: Edit `index.html` title and `.subtitle` text

## Iterative Development with Chrome DevTools MCP

Use the Chrome DevTools MCP server for visual feedback during development:

### Setup
1. Start local server: `python -m http.server 5500`
2. Use `mcp__puppeteer__puppeteer_navigate` to open `http://localhost:5500`

### Iterative Workflow
1. **Navigate** to the page you're working on:
   - Landing: `http://localhost:5500/index.html`
   - Reveal: `http://localhost:5500/reveal.html`
   - Balloons: `http://localhost:5500/balloons.html`
   - Video 2: `http://localhost:5500/video2.html`
   - Envelope: `http://localhost:5500/envelope.html`

2. **Screenshot** current state with `mcp__puppeteer__puppeteer_screenshot`

3. **Identify improvements** from the screenshot (layout, spacing, colors, animations)

4. **Edit** the relevant HTML/CSS file

5. **Reload** the page with `mcp__puppeteer__puppeteer_navigate` (same URL)

6. **Screenshot again** to verify changes

7. **Repeat** until satisfied

### Testing Interactive Elements
- Use `mcp__puppeteer__puppeteer_click` to test button clicks, balloon pops, envelope open
- Screenshot after each interaction to verify animations and transitions
- Test each page independently, then test the full flow

### Mobile Testing
Use `mcp__puppeteer__puppeteer_evaluate` to resize viewport:
```javascript
await page.setViewport({ width: 375, height: 667, isMobile: true });
```
Then screenshot to check responsive design.
