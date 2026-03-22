const floatingDecor = document.getElementById("floating-decor");
const burstLayer = document.getElementById("burst-layer");

const letterStage = document.getElementById("letterStage");
const envelopeButton = document.getElementById("envelopeButton");
const letterCard = document.getElementById("letterCard");

const partyPopper = document.getElementById("partyPopper");

const mainPhotoMount = document.getElementById("mainPhotoMount");
const galleryTrack = document.getElementById("galleryTrack");
const galleryDots = document.getElementById("galleryDots");
const galleryViewport = document.getElementById("galleryViewport");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

/*
  =========================
  ВСТАВ ТУТ СВОЇ ФОТО ТА ПІДПИСИ
  Перше фото — головне.
  Орієнтацію можна вказати:
  "portrait", "landscape" або "square"
  =========================
*/
const photos = [
  {
    src: "assets-img/main-photo.jpg",
    alt: "Головне фото",
    caption: "Вітаю з Днем народження!",
    type: "main",
    orientation: "portrait"
  },
  {
    src: "assets-img/photo2.jpg",
    alt: "Фото 2",
    caption: "Бажаю щоб життя було як безкінечний курорт",
    orientation: "portrait"
  },
  {
    src: "assets-img/photo3.jpg",
    alt: "Фото 3",
    caption: "Нехай очі завжди світяться щастям",
    orientation: "portrait"
  },
  {
    src: "assets-img/photo4.jpg",
    alt: "Фото 4",
    caption: "А поруч завжди будуть вірні друзі та любляча родина",
    orientation: "portrait"
  },
  {
    src: "assets-img/photo5.jpg",
    alt: "Фото 5",
    caption: "Бажаю, щоб кожен день приносив натхнення, енергію та щирі посмішки",
    orientation: "portrait"
  },
  {
    src: "assets-img/photo6.jpg",
    alt: "Фото 6",
    caption: "Нехай кожен день твій буде як щаслива казка",
    orientation: "portrait"
  },
  {
    src: "assets-img/photo7.jpg",
    alt: "Фото 7",
    caption: "Залишайся такою ж квітучою та життєрадісною!",
    orientation: "landscape"
  }
];

function initLetter() {
  envelopeButton.addEventListener("click", () => {
    const isOpen = letterStage.classList.toggle("open");
    envelopeButton.setAttribute("aria-expanded", String(isOpen));
    letterCard.setAttribute("aria-hidden", String(!isOpen));
  });
}

function createFloatingDecor() {
  if (!floatingDecor) return;

  const itemsCount = window.innerWidth < 700 ? 24 : 42;
  const symbols = [
    { type: "heart", char: "❤" },
    { type: "flower", char: "✿" },
    { type: "flower", char: "❀" },
    { type: "heart", char: "♥" }
  ];

  floatingDecor.innerHTML = "";

  for (let i = 0; i < itemsCount; i += 1) {
    const item = document.createElement("div");
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];

    item.className = `floating-item ${symbol.type}`;
    item.textContent = symbol.char;

    const size = randomBetween(18, window.innerWidth < 700 ? 34 : 48);
    const left = randomBetween(0, 100);
    const top = randomBetween(0, 100);
    const driftX = `${randomBetween(-35, 35)}px`;
    const travel = `${randomBetween(30, 140)}px`;
    const rotate = `${randomBetween(-24, 24)}deg`;
    const duration = `${randomBetween(7, 15)}s`;
    const twinkle = `${randomBetween(2.5, 5.5)}s`;
    const delay = `${randomBetween(0, 5)}s`;

    item.style.left = `${left}%`;
    item.style.top = `${top}%`;
    item.style.fontSize = `${size}px`;
    item.style.setProperty("--dx", driftX);
    item.style.setProperty("--travel", travel);
    item.style.setProperty("--rot", rotate);
    item.style.animationDuration = `${duration}, ${twinkle}`;
    item.style.animationDelay = `${delay}, ${delay}`;

    floatingDecor.appendChild(item);
  }
}

function createMainPhotoCard(photo) {
  const card = document.createElement("div");
  card.className = `main-photo-card`;

  card.innerHTML = `
    <figure class="photo-frame">
      <div class="photo-card main ${photo.orientation || "portrait"}">
        <div class="photo-media-wrap">
          <img class="photo-media" src="${photo.src}" alt="${escapeHtml(photo.alt)}" />
        </div>
        <figcaption class="photo-caption">${escapeHtml(photo.caption || "")}</figcaption>
      </div>
    </figure>
  `;

  return card;
}

function createGallerySlide(photo) {
  const slide = document.createElement("div");
  slide.className = "gallery-slide";

  slide.innerHTML = `
    <article class="photo-card ${photo.orientation || "portrait"}">
      <figure class="photo-frame">
        <div class="photo-media-wrap">
          <img class="photo-media" src="${photo.src}" alt="${escapeHtml(photo.alt)}" />
        </div>
        <figcaption class="photo-caption">${escapeHtml(photo.caption || "")}</figcaption>
      </figure>
    </article>
  `;

  return slide;
}

function renderPhotos() {
  if (!photos.length) return;

  const [mainPhoto, ...galleryPhotos] = photos;

  mainPhotoMount.innerHTML = "";
  mainPhotoMount.appendChild(createMainPhotoCard(mainPhoto));

  galleryTrack.innerHTML = "";
  galleryDots.innerHTML = "";

  galleryPhotos.forEach((photo, index) => {
    const slide = createGallerySlide(photo);
    galleryTrack.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "gallery-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Перейти до фото ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    galleryDots.appendChild(dot);
  });

  initGallery();
}

let currentIndex = 0;
let slidesPerView = 1;
let maxIndex = 0;
let slideWidth = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

function updateGalleryMetrics() {
  const slides = Array.from(galleryTrack.children);
  if (!slides.length) return;

  if (window.innerWidth >= 1180) {
    slidesPerView = 3;
  } else if (window.innerWidth >= 900) {
    slidesPerView = 2;
  } else {
    slidesPerView = 1;
  }

  const gap = window.innerWidth >= 900 ? 18 : 18;
  const viewportWidth = galleryViewport.clientWidth;

  slideWidth = (viewportWidth - gap * (slidesPerView - 1)) / slidesPerView;
  maxIndex = Math.max(0, slides.length - slidesPerView);

  slides.forEach((slide) => {
    slide.style.width = `${slideWidth}px`;
  });

  currentIndex = Math.min(currentIndex, maxIndex);
  setTrackPosition();
  updateDots();
}

function setTrackPosition() {
  const gap = 18;
  const offset = (slideWidth + gap) * currentIndex;
  currentTranslate = -offset;
  prevTranslate = currentTranslate;
  galleryTrack.style.transform = `translateX(${currentTranslate}px)`;
}

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  setTrackPosition();
  updateDots();
}

function updateDots() {
  const dots = Array.from(galleryDots.children);
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function initGallery() {
  updateGalleryMetrics();
  updateDots();

  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
  });

  galleryTrack.addEventListener("touchstart", touchStart, { passive: true });
  galleryTrack.addEventListener("touchmove", touchMove, { passive: true });
  galleryTrack.addEventListener("touchend", touchEnd);

  window.addEventListener("resize", updateGalleryMetrics);
}

function touchStart(event) {
  isDragging = true;
  startX = event.touches[0].clientX;
}

function touchMove(event) {
  if (!isDragging) return;

  const currentX = event.touches[0].clientX;
  const diff = currentX - startX;
  galleryTrack.style.transform = `translateX(${prevTranslate + diff}px)`;
}

function touchEnd(event) {
  if (!isDragging) return;
  isDragging = false;

  const endX = event.changedTouches[0].clientX;
  const diff = endX - startX;
  const threshold = 50;

  if (diff < -threshold) {
    goToSlide(currentIndex + 1);
  } else if (diff > threshold) {
    goToSlide(currentIndex - 1);
  } else {
    setTrackPosition();
  }
}

function createBurst(x, y) {
  const symbols = ["❤", "♥", "🐈", "🐾", "❤", "🐈"];
  const count = window.innerWidth < 700 ? 18 : 28;

  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("div");
    piece.className = "burst-item";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const angle = (Math.PI * 2 * i) / count + randomBetween(-0.22, 0.22);
    const distance = randomBetween(70, window.innerWidth < 700 ? 140 : 220);

    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - randomBetween(30, 90);
    const rotate = `${randomBetween(-220, 220)}deg`;

    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.setProperty("--x", `${tx}px`);
    piece.style.setProperty("--y", `${ty}px`);
    piece.style.setProperty("--r", rotate);
    piece.style.fontSize = `${randomBetween(20, 34)}px`;

    burstLayer.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}

function initPopper() {
  partyPopper.addEventListener("click", (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height * 0.35;

    createBurst(x, y);
    event.currentTarget.animate(
      [
        { transform: "scale(1) rotate(0deg)" },
        { transform: "scale(0.92) rotate(-8deg)" },
        { transform: "scale(1.04) rotate(8deg)" },
        { transform: "scale(1) rotate(0deg)" }
      ],
      {
        duration: 380,
        easing: "ease-out"
      }
    );
  });
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

initLetter();
createFloatingDecor();
renderPhotos();
initPopper();

window.addEventListener("resize", () => {
  createFloatingDecor();
});