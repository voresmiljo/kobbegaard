(function () {
  var lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  var lightboxImg = lightbox.querySelector(".lightbox-image");
  var closeBtn = lightbox.querySelector(".lightbox-close");
  var lightboxInner = lightbox.querySelector(".lightbox-inner");
  var prevBtn = lightbox.querySelector(".lightbox-prev");
  var nextBtn = lightbox.querySelector(".lightbox-next");

  if (!prevBtn) {
    prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "lightbox-prev";
    prevBtn.setAttribute("aria-label", "Forrige billede");
    prevBtn.textContent = "‹";
    lightbox.appendChild(prevBtn);
  }

  if (!nextBtn) {
    nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "lightbox-next";
    nextBtn.setAttribute("aria-label", "Næste billede");
    nextBtn.textContent = "›";
    lightbox.appendChild(nextBtn);
  }

  var galleryItems = [];
  var galleryIndex = 0;

  function galleryParent(card) {
    return card.closest(
      ".map-thumb-grid, .badested-photo-grid, .billeder-gallery, [data-gallery]"
    );
  }

  function showIndex(index) {
    if (!galleryItems.length) return;
    galleryIndex = (index + galleryItems.length) % galleryItems.length;
    var item = galleryItems[galleryIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt || "";
    var multi = galleryItems.length > 1;
    prevBtn.hidden = !multi;
    nextBtn.hidden = !multi;
  }

  function openLightbox(card) {
    var parent = galleryParent(card);
    var cards = parent
      ? Array.prototype.slice.call(parent.querySelectorAll(".billeder-card[data-full]"))
      : [card];

    galleryItems = cards.map(function (el) {
      return {
        src: el.dataset.full,
        alt: (el.querySelector("img") && el.querySelector("img").alt) || "",
        maxWidth: el.dataset.maxWidth
      };
    });

    galleryIndex = Math.max(0, cards.indexOf(card));
    var current = galleryItems[galleryIndex];

    if (current.maxWidth) {
      lightboxInner.classList.add("lightbox-inner--map");
      lightboxInner.style.setProperty("--lightbox-max-width", current.maxWidth + "px");
    } else {
      lightboxInner.classList.remove("lightbox-inner--map");
      lightboxInner.style.removeProperty("--lightbox-max-width");
    }

    showIndex(galleryIndex);
    lightbox.hidden = false;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.hidden = true;
    lightboxImg.src = "";
    galleryItems = [];
    galleryIndex = 0;
    prevBtn.hidden = true;
    nextBtn.hidden = true;
    lightboxInner.classList.remove("lightbox-inner--map");
    lightboxInner.style.removeProperty("--lightbox-max-width");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (event) {
    var card = event.target.closest(".billeder-card");
    if (!card || !card.dataset.full) return;
    event.preventDefault();
    openLightbox(card);
  });

  prevBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    showIndex(galleryIndex - 1);
  });

  nextBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    showIndex(galleryIndex + 1);
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showIndex(galleryIndex - 1);
    if (event.key === "ArrowRight") showIndex(galleryIndex + 1);
  });
})();
