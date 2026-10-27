# Habla Conmigo

A Spanish picture board for someone who lost speech after a stroke, using a Latin American voice. It installs on an Android tablet as a home-screen app and works without internet.

- **For him:**
  - categories down the side
  - large picture tiles
  - a one-tap "Necesito" page where every picture speaks a whole sentence
  - word categories for building simple sentences in the strip at the top
- **For the family:** hold **Ajustes (mantener)** for 1.5 seconds, then choose **Cambiar dibujos y categorías**. From there you can:
  - change a picture or take a photo
  - delete any word (including accidental doubles; the app warns when you add one)
  - move words to another category (long-press and drag onto a category, or use the "Categoría" field)
  - add, rename, reorder, recolor and delete categories
  - make a backup

## 1. Publish on GitHub Pages (once)

1. Create a new repository on GitHub, for example `habla-conmigo`. GitHub Pages on a free account needs it to be **public** (see the privacy note below).
2. Upload everything in this folder **except** `node_modules/`, or push it with git.
3. In the repo, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder **`/docs`**, then **Save**.
4. After a minute the app is live at `https://<your-username>.github.io/habla-conmigo/`.

**Security:** public means anyone can read and copy the code, not change it.
- Only you (and collaborators you add) can change the repo or the site. Someone who copies (forks) it gets their own separate site, and a suggested change (pull request) does nothing until you merge it.
- The tablet auto-updates from your site, so protect your GitHub account with **two-factor authentication**.
- Photos and everything the family sets up **stay on the tablet** and are never uploaded.

## 2. Set up the Onn tablet

1. **Spanish voice:** open Android **Settings → System → Languages & input → Text-to-speech output**.
   - Set the engine to **Speech Services by Google**.
   - Tap the gear icon → **Install voice data** → download **Español (Estados Unidos)**. This is the Latin American-sounding voice, and once downloaded it also works offline.
2. **Install the app:** open the site in **Chrome**, then tap **⋮ → Add to Home screen → Install**. Always open it from the home-screen icon. It runs fullscreen and locked to landscape.
3. **Test it:** hold **Ajustes** → **Probar la voz**. If the voice sounds Spanish from Spain, choose a voice marked "Latinoamérica" there.
4. **Personalize** (hold Ajustes → Cambiar dibujos y categorías):
   - Add the family first, with photos, in Personas: tap **+ Añadir dibujo**.
   - Then replace his own things: his glass, his chair, his medicine.
   - Hide anything he doesn't use. Fewer pictures is easier.
5. **Make a backup:** Ajustes → **Guardar copia**. Send the file to Google Drive or WhatsApp. Do this again after every round of changes.
6. **Recommended tablet settings:**
   - **Screen pinning** keeps him inside the app. Go to Settings → Security → App pinning, turn it on, then open the app, open the recent-apps screen, tap the app icon → **Pin**. Unpinning is easier with 3-button navigation: Settings → System → Gestures → System navigation.
   - Keep the volume high. Leave it on the charger when not in use. The app keeps the screen awake while it's open.

**Don't clear Chrome's data or "storage" for the site.** That deletes the photos and changes. If it happens, restore from the backup (Ajustes → Restaurar una copia).

## 3. Changing the default board or the app

The family can change everything from inside the app. You only need the code to change the *starting* board or the app itself:

```bash
npm install
npm run build        # rebuilds docs/ from src/
git add -A && git commit -m "…" && git push
```

- `src/vocab.js`: default categories, tiles and the picture-picker library. Pictures can be:
  - an emoji (turned into OpenMoji)
  - `x:E301` for OpenMoji extras
  - `draw:…`, `body:…` or `face:…` for the drawings in `src/build.js`
- `src/template.html`: the app (HTML/CSS/JS in one file).
- `src/sw.js`: the offline cache. The build stamps a version hash into it, so the tablet picks up a new version the next time the app opens with internet. Ajustes → **Buscar actualización** forces it.

An update **never overwrites** what the family set up on the tablet. New default tiles only appear after **Volver al tablero original**, which erases the tablet's changes, so make a backup first.

## Licenses

- Pictures: [OpenMoji](https://openmoji.org/), CC BY-SA 4.0. Body, window, door, remote, quilt, sweater and can drawings are original to this project (same license).
- Font: Atkinson Hyperlegible by the Braille Institute, SIL Open Font License 1.1.
