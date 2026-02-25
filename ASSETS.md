# Where to Put Your Assets

Use these **exact paths and filenames** so the site can find them. All paths are relative to the project root (same folder as `index.html`).

---

## 1. Landing page (no new assets)

- **Text only:** The question "Vishu, Murgi aayi ya anda" is just copy in `index.html` — no files to add.

---

## 2. Countdown & curtains

- **No assets** — countdown and curtains are CSS/HTML only.

---

## 3. "You came first" + first video

- **First video:** already in project root  
  - **Path:** `BhaiKaBdday.mp4`  
  - **Location:** project root (same folder as `index.html`)

---

## 4. Four balloons section

Put these in the **`assets`** folder:

| What | Exact path | Notes |
|------|------------|--------|
| Normal balloon (unpopped) | `assets/balloon.png` | Shown until the user pops that balloon. Used for all 4 balloons (same image). |
| Popped balloon | `assets/balloon-popped.png` | Shown after the user clicks a balloon. Same image for all 4. |

- **Words under balloons:** "You", "are", "so", "special" — one under each balloon. These are text in the page, not images (unless you want custom images for the words).
- If you prefer other image formats, we can switch to `.webp` or `.svg` and update the code to match.

---

## 5. Second video

- **Path:** `HappyBirthdayVishu.mp4`  
- **Location:** project root (same folder as `index.html`)  
- Already present; no change needed if you keep this name.

---

## 6. "And Finally" button

- **No asset** — it’s a button with text.

---

## 7. Envelope (closed)

Put this in the **`assets`** folder:

| What | Exact path | Notes |
|------|------------|--------|
| Closed envelope | `assets/envelope-closed.png` | Shown before the user taps to open. |

---

## 8. Envelope open + letter

- **Open envelope (optional):**  
  - **Path:** `assets/envelope-open.png`  
  - **Location:** `assets` folder  
  - Optional: we can animate the closed envelope in CSS instead of using a second image.
- **Letter:** The message is typed out in HTML/CSS (no image). If you want a custom “paper” background image:
  - **Path:** `assets/letter-paper.png`  
  - **Location:** `assets` folder  

---

## Folder structure summary

```
Chicken-Egg-Birthday/
├── index.html
├── yes_page.html
├── BhaiKaBdday.mp4          ← first video (already here)
├── HappyBirthdayVishu.mp4   ← second video (already here)
├── assets/
│   ├── balloon.png          ← normal balloon (you add)
│   ├── balloon-popped.png   ← popped balloon (you add)
│   ├── envelope-closed.png  ← closed envelope (you add)
│   ├── envelope-open.png    ← optional
│   └── letter-paper.png     ← optional paper background for letter
├── photos/                  ← existing photos (Vishu-1.jpeg etc.)
└── ...
```

---

## Checklist

- [x] `assets/balloon.png` — unpopped balloon
- [x] `assets/balloon-popped.png` — popped balloon
- [x] `assets/envelope-closed.png` — closed envelope
- [ ] (Optional) `assets/envelope-open.png`
- [ ] (Optional) `assets/letter-paper.png`
- [x] `BhaiKaBdday.mp4` in project root (already there)
- [x] `HappyBirthdayVishu.mp4` in project root (already there)

Once these are in place, the implementation can be wired to this flow and these paths.
