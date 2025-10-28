const scenes = {
  entry: {
    background: 'assets/background.png',
    objects: [
      {
        id: 'door',
        src: 'assets/kapi.png',
        style: {
          top: '57%',
          left: '52%',
          width: '65vw',
          height: '115vh',
          transform: 'translate(-50%, -50%)'
        },
        class: 'interactive-object hover-glow',
        onClick: 'goToKoridor',
        sound: 'assets/click.mp3'
      }
    ]
  },
  koridor: {
    background: 'assets/koridor.png',
    objects: [
      {
        id: 'next',
        src: 'assets/forward.png',
        style: {
          bottom: '-8%',
          left: '46.3%',
          width: '37vw',
          height: '67vh',
          transform: 'translateX(-50%)'
        },
        class: 'interactive-object hover-glow',
        onClick: 'goToYatakOdasi',
        sound: 'assets/click.mp3'
      }
    ]
  },
  yatakOdasi: {
    background: 'assets/yatak.png',
    objects: [
      {
        id: 'mektup',
        src: 'assets/mektup.png',
        style: {
          bottom: '18%',
          right: '22%',
          width: '18vw',
          height: '22vh'
        },
        class: 'interactive-object hover-glow',
        onClick: 'showModal',
        sound: 'assets/click.mp3',
        modalImages: [
          'assets/mektup1.png',
          'assets/mektup2.png'
        ],
        modalNotes: [
        ]
      },
      {
        id: 'turnBack',
        src: 'assets/back.png',
        style: {
          top: '10%',
          left: '5%',
          width: '4vw',
          height: '4vh'
        },
        class: 'interactive-object hover-glow',
        onClick: 'goToArka',
        sound: 'assets/click.mp3'
      }
    ]
  },
  arka: {
    background: 'assets/arka.png',
    objects: [
      {
        id: 'tv',
        src: 'assets/tv.png',
        style: {
          top: '-6%',
          left: '1.5%',
          width: '45vw',
          height: '55vh'
        },
        class: 'interactive-object hover-glow',
        onClick: 'showIntroModal',
        sound: 'assets/click.mp3',
        modalImages: [
          'assets/tv1.png',
          'assets/tv2.png'
        ],
        modalNotes: [
          'Hatırlıyor musun, ilk beraber izlediğimiz film...',
          'zaten çok izlemedik, izleyecek daha çok şeyimiz vardı...',
        ]
      },
   {
  id: 'pencere',
  src: 'assets/window.png',
  style: {
    top: '-16.4%',
    right: '-11%',
    width: '72vw',
    height: '107vh',
  },
  class: 'interactive-object hover-glow',
  onClick: 'showIntroModal', 
  sound: 'assets/click.mp3',
  modalNotes: [
    'Gökyüzünde parlayan Tempel 1 Kuyruklu Yıldızı 🌠'
  ]
},

      {
        id: 'gitar',
        src: 'assets/gitar.png',
        style: {
          bottom: '1.7%',
          left: '41.6%',
          width: '18.4vw',
          height: '63vh'
        },
        class: 'interactive-object hover-glow',
        onClick: 'playGuitar',
        sound: 'assets/guitar.mp3'
      },
      {
        id: 'albumFrame',
        src: 'assets/album1.png',
        style: {
          bottom: '20%',
          right: '67%',
          width: '20vw',
          height: '40vh'
        },
        class: 'interactive-object hover-glow',
        onClick: 'showIntroModal',
        sound: 'assets/click.mp3',
        modalImages: [
          'assets/album1.jpg',
          'assets/album2.jpg',
          'assets/album3.jpg',
          'assets/album4.jpg',
          'assets/album5.jpg',
          'assets/album6.jpg',
          'assets/album7.jpg',
          'assets/album8.jpg',
          'assets/album9.jpg',
          'assets/album10.jpg',
          'assets/album11.jpg'
        ],
        modalNotes: [
          'Uzun süre sonra ilk defa birlikte fotoğraf çekilmiştik...',
          'ilk kıvılcımlarımız...',
          'ilk kahvaltımız...',
          'ilk gezimiz...',
          'dünyanın en rahat uykusu...',
          'en güzel kokusu',
          'Seninle gezmek o kadar güzel ki...',
          'Benim hissettiğimi sen de hissediyorsun di mi?...',
          'En çok da kokunu özledim...',
          'O güzel bedenini sarıp sarmalamak, seninle olmak',
          'Hep seninle olucam sevgilim, sonsuza kadar biz olucaz...'
        ]
      }
    ]
  }
};

let currentScene = 'entry';
let modalImages = [];
let modalNotes = [];
let currentModalIndex = 0;
let introActive = false;

const fadeOverlay = document.getElementById('fadeOverlay');
const mektupModal = document.getElementById('mektupModal');
const bgMusic = document.getElementById('bgMusic');
const windowMusic = document.getElementById('windowMusic');


const BG_MUSIC_MAX_VOLUME = 0.1;   // Genel müzik max sesi
const WINDOW_MUSIC_MAX_VOLUME = 1; // Pencere müziği max sesi
function crossfadeAudio(fromAudio, toAudio, duration = 2000) {
  if (!fromAudio || !toAudio) return;

  if (toAudio.paused) {
    toAudio.volume = 0;
    toAudio.play().catch(console.error);
  }
  
  let step = 0;
  const steps = duration / 50;
  const fromStep = fromAudio.volume / steps;
  const toStep = (toAudio === bgMusic ? BG_MUSIC_MAX_VOLUME : WINDOW_MUSIC_MAX_VOLUME) / steps;

  const interval = setInterval(() => {
    step++;
    fromAudio.volume = Math.max(0, fromAudio.volume - fromStep);
    toAudio.volume = Math.min(toAudio === bgMusic ? BG_MUSIC_MAX_VOLUME : WINDOW_MUSIC_MAX_VOLUME, toAudio.volume + toStep);

    if (step >= steps) {
      clearInterval(interval);
      fromAudio.pause();
      fromAudio.volume = fromAudio === bgMusic ? BG_MUSIC_MAX_VOLUME : WINDOW_MUSIC_MAX_VOLUME;
      toAudio.volume = toAudio === bgMusic ? BG_MUSIC_MAX_VOLUME : WINDOW_MUSIC_MAX_VOLUME;
    }
  }, 50);
}


  // diğer kodlar...



// ========== Canvas Uzay Modalı ==========

function showCanvasSpaceModal(bgImgSrc) {
  const modal = document.getElementById('spaceCanvasModal');
  const canvas = document.getElementById('spaceCanvas');
  const ctx = canvas.getContext('2d');
  const hint = document.getElementById('canvasHint');
  const backBtn = document.getElementById('canvasBackBtn');

  modal.classList.add('active');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // İlk opaklık sıfır (tam şeffaf)
  canvas.style.opacity = 0;
  canvas.style.transition = 'opacity 1s ease';

  if(bgImgSrc){
    const img = new Image();
    img.onload = () => {
      // Resim yüklendiğinde çiz
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      drawStars();

      // Fade in başlat
      canvas.style.opacity = 1;
    };
    img.src = bgImgSrc;
  } else {
    ctx.fillStyle = "#0b1021";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawStars();
    canvas.style.opacity = 1;
  }

  function drawStars(){
    for(let i=0; i<40; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height * 0.8 + canvas.height*0.08;
      let r = Math.random() * 1.6 + 0.7;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 16;
      ctx.fillStyle = "#fff";
      ctx.globalAlpha = Math.random()*0.8+0.3;
      ctx.fill();
      ctx.restore();
    }
    let tempelX = canvas.width * 0.72;
    let tempelY = canvas.height * 0.17;
    ctx.save();
    ctx.beginPath();
    ctx.arc(tempelX, tempelY, 6, 0, Math.PI * 2);
    ctx.shadowColor = "#000000ff";
    ctx.shadowBlur = 60;
    ctx.fillStyle = "#fffbe4";
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.restore();

    canvas.onclick = function(ev){
      const dx = ev.offsetX - tempelX;
      const dy = ev.offsetY - tempelY;
      if(dx*dx+dy*dy < 50*50){
        hint.innerHTML = 'Tempel 1, tıpkı doğduğun gün gibi parlıyor. bence o gece de aynı kuyruklu yıldızı gördük...';
        hint.style.color = "#ffd7a9ff";
        setTimeout(()=>hint.innerHTML='', 5500);
      }
    }
  }

  backBtn.onclick = () => {
    modal.classList.remove('active');
    // Dilersen fade out animasyonunu da ekleyebilirsin
  };
}

// FADE IN / OUT FONKSIYONLARI (siyah overlay, pointer ayarı ile)
function fadeInOverlay(duration = 800) {
  return new Promise(resolve => {
    fadeOverlay.style.transition = `opacity ${duration}ms`;
    fadeOverlay.style.opacity = '0';
    fadeOverlay.style.pointerEvents = 'none';
    fadeOverlay.style.backgroundColor = '#000';
    setTimeout(resolve, duration);
  });
}
function fadeOutOverlay(duration = 800) {
  return new Promise(resolve => {
    fadeOverlay.style.transition = `opacity ${duration}ms`;
    fadeOverlay.style.opacity = '1';
    fadeOverlay.style.pointerEvents = 'all';
    fadeOverlay.style.backgroundColor = '#000';
    setTimeout(resolve, duration);
  });
}

// KLAVYE: SAĞ/SOL/ESC
document.addEventListener('keydown', (e) => {
  if (mektupModal.classList.contains('hidden')) return;
  if (e.key === 'ArrowRight') nextImage();
  else if (e.key === 'ArrowLeft') prevImage();
  else if (e.key === 'Escape') closeMektupModal();
});

function handleSceneObjectClick(obj) {
  if (obj.id === 'pencere') {
    if (windowMusic.paused && !bgMusic.paused) {
      crossfadeAudio(bgMusic, windowMusic);
    } else if (!windowMusic.paused) {
      crossfadeAudio(windowMusic, bgMusic);
    }
    showCanvasSpaceModal('assets/yıldızlar.png');
    return;
  }
  if (obj.sound) playSound(obj.sound);
  if (obj.id === 'tv' || obj.id === 'albumFrame') {
    showIntroModal(obj.id);
    return;
  }
  if (obj.modalImages) {
    showModal(obj.id);
    return;
  }
  if (obj.onClick) window[obj.onClick]();
}


// loadScene içinde:


// INTRO MODAL (tam siyah arka plan, tek fade animasyonu)
// showIntroModal fonksiyonu

async function showIntroModal(id) {
  if (introActive) return;
  introActive = true;

  fadeOverlay.style.opacity = '1';
  fadeOverlay.style.pointerEvents = 'all';
  fadeOverlay.style.backgroundColor = '#000';

  let info = document.getElementById('modalInfoText');
  if (!info) {
    info = document.createElement('div');
    info.id = 'modalInfoText';
    info.className = 'modal-info-text';
    info.innerHTML = 'İleri için sağ, geri için sol, çıkmak için ESC\'ye basın.';
    document.body.appendChild(info);
  }
  info.style.opacity = '1';
  info.style.transition = 'opacity 1.2s';

  let introDiv = document.getElementById('modalIntroText');
  if (!introDiv) {
    introDiv = document.createElement('div');
    introDiv.id = 'modalIntroText';
    introDiv.className = 'modal-intro-text';
    const obj = findSceneObjectById(id);
    introDiv.innerHTML = obj?.modalNotes?.[0] || 'Romantik an...';
    document.body.appendChild(introDiv);
  }
  introDiv.style.opacity = '1';
  introDiv.style.transition = 'opacity 1.2s';

  setTimeout(() => { introDiv.style.opacity = 1; info.style.opacity = 1; }, 10);

  // Yazı ve infoyu biraz daha uzun fade-out ile kapat
  setTimeout(() => {
    introDiv.style.opacity = 0;
    info.style.opacity = 0;
  }, 3500);  // Daha uzun intro görünürlüğü

  setTimeout(() => {
    if (info) info.remove();
    if (introDiv) introDiv.remove();
    showModal(id); // Yeni modal animasyonu ile aç
    introActive = false;
  }, 4800);  // Fade-out tamamlanınca modal gelsin
}



function showModal(id) {
  activeModalId = id;
  introActive = false;

  // Modalı önce görünür yap ama opaklığını 0'da bırak
  mektupModal.classList.remove('hidden');
  mektupModal.classList.add('visible'); // Modalı görünür yap

  const obj = findSceneObjectById(id);
  if (!obj) return;

  currentModalIndex = 0;
  modalImages = obj.modalImages || [];
  modalNotes = obj.modalNotes || [];
  updateModalContent();
}



// Modal kapatırken fadeOverlay yine yumuşakça açılır ve tekrar yüklenir
function closeMektupModal() {
  mektupModal.classList.remove('visible'); // Opaklığı 0 yapar, geçiş başlar
  setTimeout(() => {
    mektupModal.classList.add('hidden'); // Sonra display:none/visibility:hidden yapar
    fadeInOverlay(400);
  }, 1200); // Transition süresiyle aynı
}


// Modal gösterimi
function showModal(id) {
  activeModalId = id;
  introActive = false;

  // Arka plan tamamen siyah yap
  fadeOverlay.style.opacity = '1';
  fadeOverlay.style.pointerEvents = 'all';

  const obj = findSceneObjectById(id);
  if (!obj) return;

  currentModalIndex = 0;
  modalImages = obj.modalImages || [];
  modalNotes = obj.modalNotes || [];

  mektupModal.classList.remove('hidden');
  // Yumuşak opacity için önce kaldır, sonra ekle
  setTimeout(() => {
    mektupModal.classList.add('visible');
  }, 50);

  updateModalContent();
}

// Modal kapatma
function closeMektupModal() {
  // Görsel ve slaytları seç
  const imgEl = document.getElementById('modalImage');
  const prevEl = document.getElementById('prevSlide');
  const nextEl = document.getElementById('nextSlide');

  // Hepsine fading class’ı ekle
  [imgEl, prevEl, nextEl].forEach(el => el && el.classList.add('fading'));

  // Geçiş bitince modalı kapat
  setTimeout(() => {
    mektupModal.classList.add('hidden');
    [imgEl, prevEl, nextEl].forEach(el => el && el.classList.remove('fading'));
    // Fade overlay için eski fonksiyonunu çağır
    fadeInOverlay(400);
  }, 900); // CSS süresi ile aynı olmalı!
}

// Uzay Modalı başlatıcı
function showTempelModal() {
  // Modalı aktif yap
  const modal = document.getElementById('spaceModal');
  const starsArea = modal.querySelector('.space-stars');
  const tempelMsg = document.getElementById('tempelMsg');
  const backBtn = document.getElementById('spaceBackBtn');
  modal.classList.add('active');
  tempelMsg.style.opacity = '0';
  backBtn.style.display = 'none';

  // Yıldızları oluştur
  starsArea.innerHTML = '';
  let tempelStarPos = { x: Math.random() * 70 + 15, y: Math.random() * 60 + 20 }; // Rastgele merkez
  for(let i=0;i<30;i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = (Math.random()*98)+'vw';
    s.style.top = (Math.random()*96)+'vh';
    starsArea.appendChild(s);
  }
  // Tempel 1 yıldızı
  const tempel = document.createElement('div');
  tempel.className = 'star tempel';
  tempel.style.left = tempelStarPos.x+'vw';
  tempel.style.top = tempelStarPos.y+'vh';
  tempel.title = 'Tempel 1';
  tempel.onclick = ()=>{
    tempel.classList.add('found');
    setTimeout(()=>{
      tempelMsg.style.opacity = '1';
      backBtn.style.display = 'block';
    }, 900);
  };
  starsArea.appendChild(tempel);

  // Odaya dön
  backBtn.onclick = ()=>{
    modal.classList.remove('active');
  };
}
// Pencere objesine tıklama yakalayıcı
// (sahnede pencere id’li obje showTempelModal çalıştıracak)
// Bunu ekle:
function handleSceneObjectClick(obj) {
  if (obj.id === 'pencere') {
    showCanvasSpaceModal('assets/yıldızlar.png');
    return;
  }
  if (obj.sound) playSound(obj.sound);
  if (obj.id === 'tv' || obj.id === 'albumFrame') {
    showIntroModal(obj.id);
    return;
  }
  if (obj.modalImages) {
    showModal(obj.id);
    return;
  }
  if (obj.onClick) window[obj.onClick]();
}


// Ve sahne oluştururken:
// el.onclick = ()=>handleSceneObjectClick(obj);




// Scene object bul
function findSceneObjectById(id) {
  for (const sceneKey in scenes) {
    for (const obj of scenes[sceneKey].objects) {
      if (obj.id === id) return obj;
    }
  }
  return null;
}

// Modal içeriği
function updateModalContent(direction) {
  const imgEl = document.getElementById('modalImage');
  const prevEl = document.getElementById('prevSlide');
  const nextEl = document.getElementById('nextSlide');
  const noteEl = document.getElementById('modalNote');

  // Fade out efekti başlat
  imgEl.classList.add('fading');
  prevEl.classList.add('fading');
  nextEl.classList.add('fading');
  noteEl.classList.add('fading');

  setTimeout(() => {
    // Görsel kaynağını değiştir
    imgEl.style.display = modalImages.length > 0 ? 'block' : 'none';
    imgEl.src = modalImages[currentModalIndex] || '';

    prevEl.style.display = 'none';
    nextEl.style.display = 'none';

    if (currentModalIndex > 0) {
      prevEl.src = modalImages[currentModalIndex - 1];
      prevEl.style.display = 'block';
    }
    if (currentModalIndex < modalImages.length - 1) {
      nextEl.src = modalImages[currentModalIndex + 1];
      nextEl.style.display = 'block';
    }

    noteEl.textContent = modalNotes[currentModalIndex] || '';

    // Fade in efekti başlat
    imgEl.classList.remove('fading');
    prevEl.classList.remove('fading');
    nextEl.classList.remove('fading');
    noteEl.classList.remove('fading');
  }, 800); // transition süresinin yarısı kadar (hem fade out hem fade in için akıcı olur)
}


function prevImage() {
  if (currentModalIndex > 0) {
    currentModalIndex--;
    updateModalContent();
  }
}
function nextImage() {
  if (currentModalIndex < modalImages.length - 1) {
    currentModalIndex++;
    updateModalContent();
  }
}

// Ana sahne yükle
function loadScene(name) {
  const container = document.getElementById('sceneContainer');
  container.innerHTML = '';
  const scene = scenes[name];
  if (!scene) return;
  container.style.backgroundImage = `url(${scene.background})`;
  scene.objects.forEach(obj => {
    const el = document.createElement('div');
    el.className = obj.class;
    el.id = obj.id;
    Object.assign(el.style, obj.style);
    const img = document.createElement('img');
    img.src = obj.src;
    el.appendChild(img);
    el.onclick = () => handleSceneObjectClick(obj);
    container.appendChild(el);
  });
  currentScene = name;
}

function goToKoridor() {
  fadeOutOverlay()
    .then(() => loadScene('koridor'))
    .then(() => fadeInOverlay());
}
function goToYatakOdasi() {
  fadeOutOverlay()
    .then(() => loadScene('yatakOdasi'))
    .then(() => fadeInOverlay());
}
function goToArka() {
  fadeOutOverlay()
    .then(() => loadScene('arka'))
    .then(() => fadeInOverlay());
}
function playGuitar() {
  new Audio('assets/gitar.mp3').play();
}
function playSound(src) {
  new Audio(src).play();
}
document.addEventListener('DOMContentLoaded', () => {
  bgMusic.volume = BG_MUSIC_MAX_VOLUME;
  bgMusic.play().catch(() => {
    // Autoplay engellenirse kullanıcı etkileşimi bekle
    document.body.addEventListener('click', () => {
      bgMusic.play();
    }, {once: true});
  });

  fadeInOverlay().then(() => {
    loadScene(currentScene);
  });
});