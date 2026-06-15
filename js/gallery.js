(function () {
  var lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  var lightboxImg = lightbox.querySelector(".lightbox-image");
  var closeBtn = lightbox.querySelector(".lightbox-close");

  var lightboxInner = lightbox.querySelector(".lightbox-inner");

  function openLightbox(src, maxWidth) {
    lightboxImg.src = src;
    lightboxImg.alt = "";
    if (maxWidth) {
      lightboxInner.classList.add("lightbox-inner--map");
      lightboxInner.style.setProperty("--lightbox-max-width", maxWidth + "px");
    } else {
      lightboxInner.classList.remove("lightbox-inner--map");
      lightboxInner.style.removeProperty("--lightbox-max-width");
    }
    lightbox.hidden = false;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.hidden = true;
    lightboxImg.src = "";
    lightboxInner.classList.remove("lightbox-inner--map");
    lightboxInner.style.removeProperty("--lightbox-max-width");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (event) {
    var card = event.target.closest(".billeder-card");
    if (!card) return;
    event.preventDefault();
    openLightbox(card.dataset.full, card.dataset.maxWidth);
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });
})();
