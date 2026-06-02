/* ============================================================
   AceroImagen — interacciones
   ============================================================ */

/* ---- CONFIGURACIÓN RÁPIDA --------------------------------
   Cambia el número (solo dígitos, con lada país 52) y se
   actualizan TODOS los enlaces de WhatsApp del sitio.
   --------------------------------------------------------- */
const WHATSAPP_NUMBER = "527220000000"; // <-- pon aquí el número real de Toño del Moral
const WA_DEFAULT_MSG = "Hola, me interesa cotizar un proyecto con AceroImagen";

(function () {
  "use strict";

  /* Año en footer */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- WhatsApp: construir enlaces ---- */
  function waUrl(msg) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg || WA_DEFAULT_MSG)}`;
  }
  ["waLink", "waLinkForm"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = waUrl();
  });
  const waFloat = document.querySelector(".wa-float");
  if (waFloat) waFloat.href = waUrl();

  /* ---- Menú móvil ---- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    const close = () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
    };
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  /* ---- Prellenar interés al hacer clic en "Cotizar X" ---- */
  const selectInteres = document.getElementById("interes");
  document.querySelectorAll("[data-interes]").forEach((link) => {
    link.addEventListener("click", () => {
      const val = link.getAttribute("data-interes");
      if (!selectInteres) return;
      const match = Array.from(selectInteres.options).find((o) => o.value === val || o.text === val);
      if (match) selectInteres.value = match.value;
    });
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll(
    ".section-head, .product-card, .row-card, .why-card, .steps li, .gallery figure, .lead-form, .contact-copy, .hero-stats"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---- Envío del formulario (Formspree async) ---- */
  const form = document.getElementById("leadForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", async (e) => {
      // Si todavía no se configuró Formspree, mandamos por WhatsApp como respaldo.
      const notConfigured = form.action.includes("TU_ID_FORMSPREE");
      if (notConfigured) {
        e.preventDefault();
        const data = new FormData(form);
        const resumen =
          `Hola, soy ${data.get("nombre") || ""}. ` +
          `Me interesa: ${data.get("interes") || ""}. ` +
          `Tel: ${data.get("telefono") || ""}. ` +
          `Ubicación: ${data.get("ubicacion") || ""}. ` +
          `Detalles: ${data.get("mensaje") || ""}`;
        window.open(waUrl(resumen), "_blank", "noopener");
        if (status) {
          status.className = "form-status ok";
          status.textContent = "Te llevamos a WhatsApp para enviar tu solicitud ✓";
        }
        return;
      }

      // Envío real vía Formspree
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn ? btn.innerHTML : "";
      if (btn) { btn.disabled = true; btn.textContent = "Enviando…"; }
      if (status) { status.className = "form-status"; status.textContent = ""; }

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          form.reset();
          if (status) { status.className = "form-status ok"; status.textContent = "¡Gracias! Te contactamos muy pronto ✓"; }
        } else {
          throw new Error("Respuesta no OK");
        }
      } catch (err) {
        if (status) {
          status.className = "form-status err";
          status.innerHTML = 'No se pudo enviar. Escríbenos por <a href="' + waUrl() + '" target="_blank" rel="noopener">WhatsApp</a>.';
        }
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = original; }
      }
    });
  }
})();
