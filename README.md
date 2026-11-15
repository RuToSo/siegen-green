# SiegenGreen

Schulprojekt-Webseite, gehostet über GitHub Pages unter https://siegen-green.rutoso.de

Statische Seite ohne Server. Kontakt- und Abo-Formular öffnen eine fertige E-Mail an siegen-green@rutoso.de.

## Vor dem ersten Hochladen

Fotos einmalig lokal holen (landen in `img/`):

    powershell -ExecutionPolicy Bypass -File .\bilder-holen.ps1

## Aufbau

- `index.html`, `abo.html`, `impressum.html`, `datenschutz.html`, `agb.html`, `404.html`
- `css/style.css` (Design), `css/fonts.css` + `fonts/` (Poppins lokal), `js/main.js`
- `img/` Fotos, `favicon.svg`, `robots.txt`, `CNAME`

Vor dem Hochladen in `impressum.html` und `datenschutz.html` die Platzhalter in eckigen Klammern (Name, Anschrift) ausfüllen.
