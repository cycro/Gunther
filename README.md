# Gunther - Persönliche Website

Eine moderne, responsive Website für Gunther mit professionellem Design und interaktiven Funktionen.

## Features

- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile Geräte
- **Moderne Navigation**: Hamburger-Menü & aktives Link-Highlighting
- **Dark / Light Mode**: Mit LocalStorage-Persistenz und sanfter Transition
- **Scroll Progress Bar**: Dünner Indikator oben für Lesefortschritt
- **Back-to-Top Button**: Erscheint nach Scroll für schnelle Navigation
- **Testimonials Slider**: Automatisch rotierend, pausiert bei Hover/Fokus
- **Interaktives Kontaktformular**: Mit Validierung, Feedback und Fokus-Styling
- **Verbesserte Animationen**: IntersectionObserver Reveal, Typing Effekt Hero
- **Accessible & Semantisch**: ARIA Attribute, Fokuszustände, reduzierbare Motion
- **Performance-freundlich**: Vanilla JS ohne Framework, throtteled Scroll Events

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

1. **Hero**: Willkommensbereich mit Call-to-Action + Typing Effekt
2. **Über mich**: Vorstellung & Skills mit Badge-Styling
3. **Services**: Animierte Karten mit Tilt-Effekt
4. **Testimonials**: Kundenstimmen mit Slider & Dots-Navigation
5. **Kontakt**: Info + Formular mit Validierung
6. **Footer**: Dynamische Jahreszahl

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
- Farben & Theme: In `style.css` unter `:root` und `:root.dark` (CSS Variablen)
- Gradients & Effekte: Hero-Gradient (`--gradient-hero`) anpassen
- Komponenten: Klassen wie `.service-card`, `.testimonial` gezielt stylen

### Dark Mode
Das Theme wird über die Klasse `dark` auf `html` gesteuert.

```js
// Beispiel Umschalten manuell
document.documentElement.classList.toggle('dark');
```

Der Button mit `#theme-toggle` kümmert sich automatisch um Persistenz.

### Funktionalität erweitern
- Neue Effekte hinzufügen: In `script.js` Modulartig neue init-Funktionen ergänzen
- Formular-Anbindung: Fetch POST Request an Backend/Service (z.B. Formspree)
- SEO erweitern: Open Graph Images hinzufügen (`<meta property="og:image">`)
- Performance: Bilder lazy loaden (`loading="lazy"`), CSS minifizieren

## Quick Start

```bash
python3 -m http.server 8000
# oder
npx http-server
```

Browser öffnen: http://localhost:8000

## Nächste Ideen (Optional)

- Favicon & Social Share Image ergänzen
- Service-Karten via JSON generieren (leicht wartbar)
- Formular mit echter API (Rate Limiting, Honeypot Spam Schutz)
- Lighthouse Optimierung (CLS/Performance Feinschliff)
- Animierte SVG Icons statt Emojis

---
Made mit ❤️ und Vanilla Web Tech.