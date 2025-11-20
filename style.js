document.addEventListener("DOMContentLoaded", () => {
  const infoItems = document.querySelectorAll(".info-item");

  infoItems.forEach((item) => {
    const header = item.querySelector(".info-header");

    header.addEventListener("click", () => {
      // optional: nur ein Panel gleichzeitig offen lassen
      // infoItems.forEach(i => {
      //   if (i !== item) i.classList.remove('open');
      // });

      item.classList.toggle("open");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // ======= COPY BUTTON =======
  const copyBtn = document.getElementById("copy-btn");
  const ipText = document.getElementById("server-ip").innerText;

  copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(ipText);

    copyBtn.innerText = "Kopiert ✔";
    copyBtn.style.background = "rgba(50, 205, 50, 0.6)";

    setTimeout(() => {
      copyBtn.innerText = "IP kopieren";
      copyBtn.style.background = "rgba(255, 255, 255, 0.2)";
    }, 1500);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // ===== Accordion =====
  const infoItems = document.querySelectorAll(".info-item");
  infoItems.forEach((item) => {
    const header = item.querySelector(".info-header");
    header.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });

  // ===== Copy Button =====
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
      // Minecraft-Status API (Domain kannst du anpassen)
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
  // alle 60 Sekunden neu prüfen
  setInterval(checkServer, 60000);
});



