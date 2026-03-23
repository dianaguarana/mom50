// ================================
// ДЕ РЕГУЛЮВАТИ КІЛЬКІСТЬ ФОНОВИХ СЕРДЕЧОК І КВІТОЧОК:
// heartCount / flowerCount
// ================================
const backgroundConfig = {
  heartCount: 24,
  flowerCount: 22,
};

// ================================
// ДЕ МІНЯТИ МАСИВ ФОТО І ПІДПИСИ:
// path: шлях до файлу (папка assets-img/)
// caption: підпис під фото
// orientation: "portrait" або "landscape"
// ПЕРШЕ ФОТО (main-photo.jpg) - головне, нижче лише 6 додаткових
// ================================
const galleryPhotos = [
  {
    path: "assets-img/photo-2.jpg", // ВСТАВ НАЗВУ ФАЙЛУ
    caption: "Бажаю щоб життя було як безкінечний курорт", // ВСТАВ ПІДПИС
    orientation: "portrait",
  },
  {
    path: "assets-img/photo-3.jpg",
    caption: "Нехай очі завжди світяться щастям",
    orientation: "portrait",
  },
  {
    path: "assets-img/photo-4.jpg",
    caption: "А поруч завжди будуть вірні друзі та любляча родина",
    orientation: "portrait",
  },
  {
    path: "assets-img/photo-5.jpg",
    caption: "Бажаю, щоб кожен день приносив натхнення, енергію та щирі посмішки",
    orientation: "portrait",
  },
  {
    path: "assets-img/photo-6.jpg",
    caption: "Нехай кожен день твій буде як щаслива казка",
    orientation: "portrait",
  },
  {
    path: "assets-img/photo-7.jpg",
    caption: "Залишайся такою ж квітучою та життєрадісною!",
    orientation: "landscape",
  },
];

const bgDecor = document.getElementById("bgDecor");
const envelopeWrap = document.getElementById("envelopeWrap");
const envelopeBtn = document.getElementById("envelopeBtn");
const track = document.getElementById("galleryTrack");
const viewport = document.getElementById("galleryViewport");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const confettiLayer = document.getElementById("confettiLayer");
const popperBtn = document.getElementById("popperBtn");

let currentIndex = 0;
let startX = 0;
let deltaX = 0;

function createBgPiece(type, idx) {
  const el = document.createElement("span");
  el.className = `bg-piece ${type}`;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = type === "heart" ? 22 + Math.random() * 24 : 24 + Math.random() * 22;
  const duration = 5 + Math.random() * 6;

  el.style.left = `${x}%`;
  el.style.top = `${y}%`;
  el.style.fontSize = `${size}px`;
  el.style.setProperty("--duration", `${duration}s`);
  el.style.animationDelay = `${(idx % 7) * 0.45}s`;
  el.textContent = type === "heart" ? "❤" : "✿";
  return el;
}

function renderBackground() {
  for (let i = 0; i < backgroundConfig.heartCount; i += 1) {
    bgDecor.appendChild(createBgPiece("heart", i));
  }
  for (let i = 0; i < backgroundConfig.flowerCount; i += 1) {
    bgDecor.appendChild(createBgPiece("flower", i));
  }
}

function renderGallery() {
  track.innerHTML = galleryPhotos
    .map(
      (item) => `
      <article class="slide ${item.orientation}">
        <figure class="photo-card">
          <img src="${item.path}" alt="Сімейне фото" loading="lazy" />
          <figcaption>${item.caption}</figcaption>
        </figure>
      </article>
    `,
    )
    .join("");

  updateSlider();
}

function updateSlider() {
  const shift = -currentIndex * viewport.clientWidth;
  track.style.transform = `translateX(${shift}px)`;
}

function openLetter() {
  envelopeWrap.classList.toggle("open");
  envelopeBtn.setAttribute("aria-expanded", String(envelopeWrap.classList.contains("open")));
}

function clampIndex(index) {
  if (index < 0) return galleryPhotos.length - 1;
  if (index >= galleryPhotos.length) return 0;
  return index;
}

function createBurstItem(type) {
  const item = document.createElement("span");
  item.className = "burst-item";
  const angle = Math.random() * Math.PI * 2;
  const distance = 70 + Math.random() * 140;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance - 40;

  item.style.setProperty("--x", `${x}px`);
  item.style.setProperty("--y", `${y}px`);
  item.style.setProperty("--r", `${Math.random() * 180 - 90}deg`);
  item.style.fontSize = `${14 + Math.random() * 20}px`;
  item.textContent = type === "cat" ? "🐈" : "❤";
  return item;
}

// ===========================================
// ДЕ НАЛАШТОВУВАТИ АНІМАЦІЮ ХЛОПУШКИ:
// heartParticles / catParticles / liveTime
// ===========================================
function runPopper() {
  const heartParticles = 20;
  const catParticles = 10;
  const liveTime = 1200;

  for (let i = 0; i < heartParticles; i += 1) {
    const node = createBurstItem("heart");
    confettiLayer.appendChild(node);
    setTimeout(() => node.remove(), liveTime);
  }

  for (let i = 0; i < catParticles; i += 1) {
    const node = createBurstItem("cat");
    confettiLayer.appendChild(node);
    setTimeout(() => node.remove(), liveTime);
  }
}

prevBtn.addEventListener("click", () => {
  currentIndex = clampIndex(currentIndex - 1);
  updateSlider();
});

nextBtn.addEventListener("click", () => {
  currentIndex = clampIndex(currentIndex + 1);
  updateSlider();
});

envelopeBtn.addEventListener("click", openLetter);
popperBtn.addEventListener("click", runPopper);

/* =========================
   LIGHT GALLERY
   ========================= */

const galleryTrack = document.getElementById("galleryTrack");
const galleryDots = document.getElementById("galleryDots");
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");

let currentGalleryIndex = 0;

const galleryPhotos = [
  {
    src: "assets-img/photo2.jpg",
    alt: "Фото 2",
    caption: "Тут буде підпис",
    orientation: "portrait"
  },
  {
    src: "assets-img/photo3.jpg",
    alt: "Фото 3",
    caption: "Тут буде підпис",
    orientation: "landscape"
  },
  {
    src: "assets-img/photo4.jpg",
    alt: "Фото 4",
    caption: "Тут буде підпис",
    orientation: "portrait"
  },
  {
    src: "assets-img/photo5.jpg",
    alt: "Фото 5",
    caption: "Тут буде підпис",
    orientation: "landscape"
  },
  {
    src: "assets-img/photo6.jpg",
    alt: "Фото 6",
    caption: "Тут буде підпис",
    orientation: "portrait"
  },
  {
    src: "assets-img/photo7.jpg",
    alt: "Фото 7",
    caption: "Тут буде підпис",
    orientation: "square"
  }
];

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderGallery() {
  if (!galleryTrack || !galleryDots) return;

  galleryTrack.innerHTML = "";
  galleryDots.innerHTML = "";

  galleryPhotos.forEach((photo, index) => {
    const slide = document.createElement("div");
    slide.className = "gallery-slide";

    slide.innerHTML = `
      <article class="gallery-card ${photo.orientation || "portrait"}">
        <div class="gallery-media-wrap">
          <img
            class="gallery-media"
            src="${photo.src}"
            alt="${escapeHtml(photo.alt)}"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="gallery-caption">${escapeHtml(photo.caption || "")}</div>
      </article>
    `;

    galleryTrack.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "gallery-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Перейти до фото ${index + 1}`);
    dot.addEventListener("click", () => {
      currentGalleryIndex = index;
      updateGallery();
    });

    galleryDots.appendChild(dot);
  });

  updateGallery();
}

function updateGallery() {
  if (!galleryTrack) return;

  galleryTrack.style.transform = `translateX(-${currentGalleryIndex * 100}%)`;

  const dots = galleryDots.querySelectorAll(".gallery-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentGalleryIndex);
  });

  if (prevSlideBtn) {
    prevSlideBtn.disabled = currentGalleryIndex === 0;
  }

  if (nextSlideBtn) {
    nextSlideBtn.disabled = currentGalleryIndex === galleryPhotos.length - 1;
  }
}

if (prevSlideBtn) {
  prevSlideBtn.addEventListener("click", () => {
    if (currentGalleryIndex > 0) {
      currentGalleryIndex -= 1;
      updateGallery();
    }
  });
}

if (nextSlideBtn) {
  nextSlideBtn.addEventListener("click", () => {
    if (currentGalleryIndex < galleryPhotos.length - 1) {
      currentGalleryIndex += 1;
      updateGallery();
    }
  });
}

renderGallery();

  }
  startX = 0;
  deltaX = 0;
});

window.addEventListener("resize", updateSlider);

renderBackground();
renderGallery();
