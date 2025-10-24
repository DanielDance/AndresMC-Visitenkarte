## Kurzbeschreibung

Dieses Repository ist eine sehr kleine, statische persönliche Visitenkarte (Single-Page). Es enthält hauptsächlich:

- `index.html` — die HTML-Seite (derzeit leer)
- `style.css` — die globale CSS-Datei (derzeit leer)
- `img/` — Bild-Assets: `AndresMC Profilbild.jpg`, `AndresMC Titelbild.jpg`, `discord-icon-svgrepo-com.svg`, `discord.svg`, `wallpaper_minecraft_pc_bundle_2560x1440.png`

Ziel für AI-Agenten: direkte, nicht-invasiven Änderungen vorschlagen/implementieren (z. B. konkretes HTML/CSS für die Visitenkarte) und beim lokalen Preview/Commit-Workflow helfen.

## Big picture / Architektur

- Sehr einfache, clientseitige Seite ohne Build-Tooling, keine JS-Frameworks, keine Server-Komponenten.
- Alle Assets liegen unter `img/` und werden relativ von `index.html` referenziert.
- Änderungen sind in-place: editieren der Dateien und direktes Preview im Browser.

## Wichtige Projektkonventionen und Beobachtungen

- Dateinamen in `img/` enthalten Leerzeichen und Großbuchstaben. Diese funktionieren lokal auf Windows, können aber Probleme auf CI/Unix-Hosts oder bei URL-Encoding verursachen. Vor Änderungen empfehlen: erst Vorschlag machen und Inhaber fragen, bevor Dateien umbenannt werden.
- Kodierung: Benutze UTF-8 beim Schreiben von `index.html`/`style.css`.
- Halte CSS in `style.css` und vermeide Inline-Styles, damit Änderungen leicht nachvollziehbar sind.

## Lokaler Entwicklungs- / Preview-Workflow (PowerShell / Windows)

1. Schnell lokal servieren (wenn Python installiert ist):

```powershell
python -m http.server 8000
```

2. Alternative mit Node (wenn Node.js verfügbar):

```powershell
npx http-server -p 8000
```

3. Im Browser öffnen: `http://localhost:8000/` und `index.html` auswählen.

Hinweis: Es gibt kein build/test script im Repo. Änderungen sind sofort sichtbar nach Reload.

## Beispiele aus dem Projekt (wie Referenzen schreiben)

- Bildreferenz in `index.html`:

```html
<img src="img/AndresMC Profilbild.jpg" alt="Andres MC">
```

- Grundstruktur, die AI-Agenten bevorzugt erzeugen sollten (semantisch, minimal):

```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="style.css">
  <title>AndresMC — Visitenkarte</title>
</head>
<body>
  <header><!-- Name, Titel, Profilbild --></header>
  <main><!-- Kurzinfo, Links (Discord etc.) --></main>
  <footer><!-- Copyright / Kontakt --></footer>
</body>
</html>
```

## Verhaltensempfehlungen für AI-Agenten

- Prüfe zuerst, ob `index.html` oder `style.css` leer sind (sie sind es aktuell). Wenn Änderungen umfangreicher sind, erstelle eine PR mit klarer Beschreibung.
- Benenne Dateien in `img/` nicht stillschweigend um. Stattdessen: erst Vorschlag im PR (z. B. `andresmc-profilbild.jpg`) und optional automatische Aktualisierung aller Referenzen.
- Entferne oder verändere keine Assets ohne Hinweis; Assets sind typisch sichtbar/gestaltet (z. B. Titelbild, Profilbild).
- Verwende relative Pfade (`img/...`) und respektiere vorhandene Dateinamen (Groß-/Kleinschreibung beachten für Deployments auf Unix).

## Commit / PR Hinweise

- Kurze, erklärende Commit-Messages. Beispiel: `feat: add basic semantic layout and link stylesheet`.
- Wenn du Dateinamen normalisierst, führe dies in einem eigenen PR mit einer Liste aller geänderten Pfade.

---

Wenn du möchtest, kann ich jetzt eine minimale, semantische `index.html`-Vorlage und ein kleines `style.css`-Starter-Layout erstellen (inkl. Vorschlag, ob Bilddateien normalisiert werden sollen). Soll ich das anlegen?
