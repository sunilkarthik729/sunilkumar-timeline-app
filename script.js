document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.getElementById("timeline");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeModalBtn = document.getElementById("close-modal");
  const toggleThemeBtn = document.getElementById("toggle-theme-btn");

  // ---- theme toggle ----
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const currentTheme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
    localStorage.setItem("theme", currentTheme);
  });

  // ---- load events----
  fetch("./data/events.json")
    .then((res) => res.json())
    .then((events) => {
      timeline.innerHTML = "";
      events.forEach((event) => {
        const shortDesc =
          event.description.length > 110
            ? event.description.slice(0, 110) + "..."
            : event.description;

        const article = document.createElement("article");
        article.className = "content";

        // build card
        article.innerHTML = `
        <div class="event-meta">
          <div class="event-label"><strong>${event.year}:</strong> ${event.title}</div>
          <div class="event-thumb">
            <img alt="${event.title}">
          </div>
          <p style="margin:0;color:#666;font-size:0.92rem;">${shortDesc}</p>
          <button class="show-desc-btn">View Description</button>
        </div>
      `;
        // set thumbnail with fade-in after load
        const thumbImg = article.querySelector(".event-thumb img");
        thumbImg.src = "./assets/placeholder.jpg";
        const realThumb = new Image();
        realThumb.src = event.imageURL;
        realThumb.onload = () => {
          thumbImg.src = event.imageURL;
          thumbImg.classList.add("loaded");
        };
        realThumb.onerror = () => {
          thumbImg.src = "./assets/fallback.jpg";
          thumbImg.classList.add("loaded");
        };

        // open modal with full content pop-up
        article
          .querySelector(".show-desc-btn")
          .addEventListener("click", () => {
            modalBody.innerHTML = `
          <h2>${event.title} (${event.year})</h2>
          <div class="modal-media">
            <img src="${event.imageURL}" alt="${event.title}">
          </div>
          <p style="margin-top:0.25rem">${event.description}</p>
          <p><strong>Category:</strong> ${event.category}</p>
        `;
            //fix for broken image
            const modalImg = modalBody.querySelector(".modal-media img");
            modalImg.onerror = () => {
              modalImg.src = "./assets/fallback.jpg";
            };
            modal.style.display = "flex";
          });

        timeline.appendChild(article);
      });
    })
    .catch((err) => console.error("Error loading events:", err));

  // ---- Modal Case ----
  closeModalBtn.addEventListener("click", () => (modal.style.display = "none"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
