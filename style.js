document.addEventListener("DOMContentLoaded", () => {
  // ===== Accordion =====
  const infoItems = document.querySelectorAll(".info-item");
  infoItems.forEach((item) => {
    const header = item.querySelector(".info-header");
    const body = item.querySelector(".info-body");

    // Set initial ARIA state based on whether the item has the 'open' class
    const isOpen = item.classList.contains("open");
    header.setAttribute("aria-expanded", isOpen);
    // Initially hide the body if not open, for non-JS users or if CSS fails
    if (!isOpen) {
      body.style.display = "none";
    }

    header.addEventListener("click", () => {
      const isExpanded = header.getAttribute("aria-expanded") === "true";

      item.classList.toggle("open");
      header.setAttribute("aria-expanded", !isExpanded);

      // Toggle display for better accessibility and fallback
      if (body.style.display === "none") {
        body.style.display = "block";
      } else {
        body.style.display = "none";
      }
    });
  });

  // ======= COPY BUTTON =======
  const copyBtn = document.getElementById("copy-btn");
  const ipSpan = document.getElementById("server-ip");
  if (copyBtn && ipSpan) {
    const ipText = ipSpan.innerText;

    copyBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(ipText);
      copyBtn.innerText = "Kopiert ✔";
      copyBtn.style.background = "rgba(50, 205, 50, 0.6)";
      setTimeout(() => {
        copyBtn.innerText = "IP kopieren";
        copyBtn.style.background = "rgba(255, 255, 255, 0.2)";
      }, 1500);
    });
  }

  // ===== Server-Status =====
  const statusEl = document.getElementById("server-status");

  async function checkServer() {
    if (!statusEl) return;

    statusEl.classList.add("checking");
    const statusText = statusEl.querySelector(".status-text");

    try {
      const res = await fetch("https://api.mcsrvstat.us/3/andresmc.de");
      const data = await res.json();

      statusEl.classList.remove("online", "offline");

      if (data && data.online) {
        statusEl.classList.add("online");
        statusText.textContent = "Server ist online ✔";
      } else {
        statusEl.classList.add("offline");
        statusText.textContent = "Server ist offline ✖";
      }
    } catch (err) {
      statusEl.classList.remove("online");
      statusEl.classList.add("offline");
      statusText.textContent = "Status nicht abrufbar";
      console.error(err);
    } finally {
      statusEl.classList.remove("checking");
    }
  }

  checkServer();
  setInterval(checkServer, 60000);
});
