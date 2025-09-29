# Gunther - Persönliche Website

Eine moderne, responsive Website für Gunther mit professionellem Design und interaktiven Funktionen.

## Features

- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile Geräte
- **Moderne Navigation**: Hamburger-Menü für Mobile Geräte mit smooth scrolling
- **Interaktives Kontaktformular**: Mit Validierung und Feedback
- **Professionelles Design**: Gradient Hero-Bereich, animierte Service-Karten
- **Deutsche Sprache**: Vollständig auf Deutsch lokalisiert

## Technologie

- **HTML5**: Semantisches Markup
- **CSS3**: Modern CSS mit Flexbox, Grid und Animations
- **Vanilla JavaScript**: Keine externe Frameworks für bessere Performance
- **Google Fonts**: Roboto Schriftart für professionelle Typografie

## Struktur

```
├── index.html      # Haupt-HTML-Datei
├── style.css       # CSS-Styling
├── script.js       # JavaScript-Funktionalität
└── README.md       # Diese Dokumentation
```

## Sektionen

1. **Hero**: Willkommensbereich mit Call-to-Action
2. **Über mich**: Persönliche Vorstellung und Skills
3. **Services**: Angebotene Dienstleistungen mit Icons
4. **Kontakt**: Kontaktinformationen und Kontaktformular

## Lokale Entwicklung

Um die Website lokal zu testen:

```bash
# Im Projektverzeichnis einen HTTP-Server starten
python3 -m http.server 8000

# Oder mit Node.js
npx http-server

# Dann im Browser öffnen: http://localhost:8000
```

## Deployment

Die Website kann einfach auf jeder statischen Hosting-Plattform deployed werden:

- GitHub Pages
- Netlify
- Vercel
- Apache/Nginx Server

Einfach alle Dateien (index.html, style.css, script.js) auf den Server hochladen.

## Anpassungen

### Inhalte ändern
- Text in `index.html` bearbeiten
- Kontaktdaten in der Kontakt-Sektion aktualisieren

### Design anpassen
- Farben in `style.css` ändern (CSS Custom Properties werden verwendet)
- Layout-Anpassungen in den entsprechenden CSS-Bereichen

### Funktionalität erweitern
- Neue Features in `script.js` hinzufügen
- Formular mit Backend-Integration verbinden