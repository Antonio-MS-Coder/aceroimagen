# AceroImagen — Landing page

Landing page de **AceroImagen**, constructora de acero en Toluca. Fabricación de
elevadores de carga y estructuras metálicas a medida, naves industriales y obra a medida.
Optimizada para **captar clientes potenciales** (con énfasis en los productos de fabricación
en línea de producción) y lista para desplegar en **GitHub Pages**.

Contacto del negocio: **Toño del Moral** · Toluca, Estado de México.

---

## 🗂 Estructura

```
.
├── index.html          # Toda la página (una sola vista)
├── assets/
│   ├── styles.css      # Estilos (estética industrial / blueprint)
│   ├── script.js       # Menú, scroll reveal, formulario, WhatsApp
│   └── img/            # Imágenes (por ahora placeholders)
│       └── favicon.svg
├── robots.txt
├── sitemap.xml
├── .nojekyll           # Necesario para GitHub Pages (sirve /assets correctamente)
└── README.md
```

No hay build ni dependencias: es HTML/CSS/JS puro. Se abre directo en el navegador.

---

## ✅ Antes de publicar — cosas por personalizar

Todo está marcado con valores **placeholder**. Reemplaza:

1. **Número de WhatsApp / teléfono**
   - Archivo `assets/script.js`, línea de `WHATSAPP_NUMBER` (formato: `52` + número, solo dígitos).
     Esto actualiza automáticamente el botón flotante y todos los enlaces de WhatsApp.
   - En `index.html`, busca `527220000000` y `+52 722 000 0000` y reemplaza el teléfono visible
     y el `href="tel:..."`.

2. **Correo electrónico**
   - En `index.html`, busca `contacto@aceroimagen.com` y reemplázalo.

3. **Formulario de cotización (Formspree)** — para recibir los leads por correo:
   - Crea una cuenta gratis en https://formspree.io
   - Crea un formulario y copia tu endpoint (algo como `https://formspree.io/f/abcdwxyz`).
   - En `index.html`, en `<form id="leadForm" action="...">`, reemplaza `TU_ID_FORMSPREE`.
   - **Mientras no se configure**, el formulario funciona como respaldo enviando los datos
     por WhatsApp automáticamente, así que nunca se pierde un lead.

4. **Imágenes** — ya hay imágenes generadas con IA (Nano Banana) como provisionales
   en `assets/img/` (`hero.png`, `elevador.png`, `estructura.png`, `cubierta.png`,
   `grua.png`, `obra.png`, `proyecto-01..05.png`, `og-image.png`).
   - Para usar **fotos reales**, basta reemplazar cada archivo `.png` por la foto real
     con el mismo nombre (no hay que tocar el HTML). Conserva proporciones parecidas.
   - `og-image.png` (~1200×630) es la imagen que se ve al compartir en redes/WhatsApp.

5. **Dominio** (opcional): si tienen dominio propio, actualiza las URLs `https://aceroimagen.com`
   en `index.html` (canonical, Open Graph, JSON-LD), `robots.txt` y `sitemap.xml`.

---

## 🚀 Desplegar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `aceroimagen`).
2. Sube estos archivos:
   ```bash
   git init
   git add .
   git commit -m "Landing AceroImagen"
   git branch -M main
   git remote add origin https://github.com/USUARIO/aceroimagen.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / carpeta **/(root)** → Save.
4. En 1–2 minutos estará en `https://USUARIO.github.io/aceroimagen/`.

> El archivo `.nojekyll` ya está incluido para que GitHub sirva la carpeta `assets/` sin problemas.

### Dominio personalizado (opcional)
Si compran un dominio (p. ej. `aceroimagen.com`):
- En Settings → Pages → Custom domain, escríbelo (se creará un archivo `CNAME`).
- Configura en el proveedor del dominio los registros DNS que GitHub indique.

---

## 🎨 Notas de diseño

- **Estética:** industrial / plano de ingeniería (blueprint). Base gunmetal oscura,
  acento ámbar de acero fundido, retícula técnica de fondo.
- **Tipografía:** Saira Condensed (titulares) + Manrope (texto).
- **Prioridad de conversión:** los productos de **fabricación** (elevadores, estructuras,
  cubiertas) aparecen primero y con más peso visual que la obra pesada, tal como se pidió
  para crecer ese flujo de ingresos.
- **Captación de leads:** formulario con selector de tipo de proyecto + WhatsApp en varios
  puntos (header, botón flotante, hero, contacto). Al hacer clic en "Cotizar X" se prellena
  el tipo de producto en el formulario.
- Accesible y responsivo (móvil, tablet, escritorio) con respeto a `prefers-reduced-motion`.
