// 🌸 Emotional & Premium Terminology
const langData = {
    hi: { setupTitle: "सुरक्षा कवच लगाएँ 🛡️", passPh: "अपना नया पासवर्ड सोचें...", oldPassPh: "पुरानी चाबी डालें...", newPassPh: "नई मजबूत चाबी...", saveBtn: "ताला लगाएँ 🔒", loginTitle: "Digital Album 🌸", openBtn: "यादें खोलें ✨", changeLink: "क्या चाबी (पासवर्ड) बदलनी है?", changeTitle: "नई चाबी (पासवर्ड) बनाएं 🔄", updateBtn: "बदल दें ✅", backLink: "पीछे लौटें 🔙", uploadBtn: "🎵 सुर जोड़ें", removeBtn: "❌ सुर हटाएँ", autoPlayBtn: "🌸 यादों का सफ़र (Auto)", stopPlay: "🛑 सफर रोकें", fsBtn: "⛶ पूरा दृश्य", lockBtn: "🔒 यादें समेटें", albumCover: "पुरानी<br>यादें 🌸", exitFs: "❌ पूरा दृश्य बंद करें", loadingImgs: "तस्वीरें आ रही हैं... ⏳", saved: "ताला लग गया! अब यादें खोलें।", changed: "चाबी बदल गई! नई चाबी से खोलें।" },
    en: { setupTitle: "Set Security Shield 🛡️", passPh: "Think of a new password...", oldPassPh: "Enter old key...", newPassPh: "New strong key...", saveBtn: "Lock it 🔒", loginTitle: "Digital Album 🌸", openBtn: "Open Memories ✨", changeLink: "Want to change the key?", changeTitle: "Create New Key 🔄", updateBtn: "Update ✅", backLink: "Go Back 🔙", uploadBtn: "🎵 Add Melody", removeBtn: "❌ Remove Melody", autoPlayBtn: "🌸 Journey of Memories", stopPlay: "🛑 Stop Journey", fsBtn: "⛶ Full View", lockBtn: "🔒 Pack Memories", albumCover: "Old<br>Memories 🌸", exitFs: "❌ Exit Full View", loadingImgs: "Fetching memories... ⏳", saved: "Locked! Now open it.", changed: "Key changed! Open with new key." }
};
let currentLang = 'hi';

function toggleLanguage() {
    currentLang = currentLang === 'hi' ? 'en' : 'hi';
    document.getElementById('htmlRoot').setAttribute('lang', currentLang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        let key = el.getAttribute('data-i18n');
        if (langData[currentLang][key]) el.innerHTML = langData[currentLang][key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        let key = el.getAttribute('data-i18n-ph');
        if (langData[currentLang][key]) el.placeholder = langData[currentLang][key];
    });

    if (!isPlaying) {
        document.getElementById('playPauseBtn').innerHTML = currentLang === 'hi' ? "▶ प्यारा सा सुर चलाएं" : "▶ Play Melody";
    } else {
        document.getElementById('playPauseBtn').innerHTML = currentLang === 'hi' ? "⏸ सुर रोकें" : "⏸ Pause Melody";
    }

    if (isAutoPlaying) {
        document.getElementById('autoPlayBtn').innerHTML = langData[currentLang].stopPlay;
    }
}

document.getElementById('hamburgerBtn').addEventListener('click', () => {
    document.getElementById('navActions').classList.toggle('show-menu');
});
document.querySelectorAll('.nav-btn, .remove-music-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('navActions').classList.remove('show-menu');
    });
});

const screens = { loading: document.getElementById('loadingScreen'), setup: document.getElementById('setupScreen'), login: document.getElementById('loginScreen'), change: document.getElementById('changeScreen'), book: document.getElementById('bookContainer') };
function hideAll() { for (let s in screens) { screens[s].style.display = "none"; screens[s].classList.remove('show-animated'); } }

let book = document.getElementById('myBook'), cover = document.getElementById('cover'), pagesToFlip = [cover], currentPage = 0;

function _pxW() {
    let _s = atob("Q3JhZnRlZCBieSBLdWxkZWVwIMOXIEdlbWluaQ==");
    return `<div class="premium-decor-layer">
              <div class="decor-dot tl">✦</div><div class="decor-dot tr">✦</div>
              <div class="decor-dot bl">✦</div><div class="decor-dot br">✦</div>
            </div>
            <div class="page-wm-text">${_s}</div>`;
}

function applyStaticDecorations() {
    document.querySelectorAll('.page-target-decor').forEach(el => {
        if (!el.querySelector('.premium-decor-layer')) {
            el.insertAdjacentHTML('afterbegin', _pxW());
        }
    });
}

async function checkSystem() {
    try {
        let res = await fetch(CONFIG.API_URL + "?action=check");
        let data = await res.json();
        if (sessionStorage.getItem("isLoggedIn") === "true") {
            let savedData = sessionStorage.getItem("savedImages");
            if (savedData) { setupAlbum(JSON.parse(savedData)); return; }
        }
        hideAll();
        if (data.isSetup) { screens.login.style.display = "block"; } else { screens.setup.style.display = "block"; }
    } catch (e) { screens.loading.innerText = "सिस्टम नेटवर्क से जुड़ नहीं पा रहा है 🔌!"; }
}
checkSystem();

async function setupPassword() {
    let pass = document.getElementById('newPassInput').value;
    if (!pass) return;
    let res = await fetch(CONFIG.API_URL + "?action=setup&newPass=" + encodeURIComponent(pass));
    let data = await res.json();
    if (data.status === "success") { alert(langData[currentLang].saved); hideAll(); screens.login.style.display = "block"; }
}

function showChangeScreen() { hideAll(); screens.change.style.display = "block"; }
function showLoginScreen() { hideAll(); screens.login.style.display = "block"; }

async function changePassword() {
    let oldPass = document.getElementById('oldPassInput').value, newPass = document.getElementById('newChangePassInput').value;
    if (!oldPass || !newPass) return;
    let res = await fetch(CONFIG.API_URL + "?action=change&oldPass=" + encodeURIComponent(oldPass) + "&newPass=" + encodeURIComponent(newPass));
    let data = await res.json();
    if (data.status === "success") { alert(langData[currentLang].changed); showLoginScreen(); } else { alert(data.message); }
}

async function login() {
    let pass = document.getElementById('loginPassInput').value, msg = document.getElementById('loginMsg');
    if (!pass) return;
    msg.innerText = langData[currentLang].loadingImgs;
    try {
        let res = await fetch(CONFIG.API_URL + "?action=load&pass=" + encodeURIComponent(pass));
        let result = await res.json();
        if (result.status === "error") { msg.innerText = result.message; return; }
        let driveImages = result.data;
        sessionStorage.setItem("savedImages", JSON.stringify(driveImages));
        sessionStorage.setItem("isLoggedIn", "true");
        setupAlbum(driveImages);
    } catch (error) { msg.innerText = "इंटरनेट में कोई रुकावट है!"; }
}

function setupAlbum(driveImages) {
    hideAll();
    screens.book.style.display = "block";
    screens.book.classList.add('show-animated');
    document.getElementById('topNav').style.display = "flex";

    document.getElementById('firstPageImg').src = driveImages[0];
    document.getElementById('lastPageImg').src = driveImages[driveImages.length - 1];

    let photoPairs = [];
    for (let i = 1; i < driveImages.length - 1; i += 2) {
        photoPairs.push({ frontImg: driveImages[i], backImg: driveImages[i + 1] ? driveImages[i + 1] : driveImages[i] });
    }

    document.querySelectorAll('.page').forEach(el => el.remove());
    pagesToFlip = [cover];
    currentPage = 0;
    book.classList.remove('open');

    photoPairs.forEach((data, index) => {
        let page = document.createElement('div');
        page.className = 'page flippable';
        let zOffset = 65 - ((index + 1) * 2), zOffsetFlipped = 1 + ((index + 1) * 2);
        page.style.setProperty('--z-offset', zOffset + 'px');
        page.style.setProperty('--z-offset-flipped', zOffsetFlipped + 'px');
        page.style.zIndex = 99 - index;

        page.innerHTML = `
          <div class="page-face page-front">
             ${_pxW()}
             <div class="wooden-frame"><img src="${data.frontImg}" class="album-img" loading="lazy"></div>
          </div>
          <div class="page-face page-back">
             ${_pxW()}
             <div class="wooden-frame"><img src="${data.backImg}" class="album-img" loading="lazy"></div>
          </div>`;
        book.insertBefore(page, cover);
        pagesToFlip.push(page);
    });

    applyStaticDecorations();
    updateBookLayout();
}

function turnPage(event) {
    if (isAutoPlaying) stopAutoPlay();

    let clickX = event.clientX, screenCenter = window.innerWidth / 2;
    if (clickX > screenCenter) {
        if (currentPage === 0) book.classList.add('open');
        if (currentPage < pagesToFlip.length) {
            pagesToFlip[currentPage].classList.add('flipped');
            currentPage++;
        } else if (currentPage === pagesToFlip.length) {
            pagesToFlip.forEach(p => p.classList.remove('flipped'));
            book.classList.remove('open');
            currentPage = 0;
        }
    } else {
        if (currentPage > 0) {
            currentPage--;
            pagesToFlip[currentPage].classList.remove('flipped');
            if (currentPage === 0) book.classList.remove('open');
        }
    }
}

// 🎵 LOCAL MUSIC LOGIC (No API Request)
let musicInput = document.getElementById('musicInput'), uploadMusicBtn = document.getElementById('uploadMusicBtn'), removeMusicBtn = document.getElementById('removeMusicBtn'), playPauseBtn = document.getElementById('playPauseBtn'), bgMusic = document.getElementById('bgMusic'), isPlaying = false;

uploadMusicBtn.addEventListener('click', () => musicInput.click());

musicInput.addEventListener('change', function () {
    let file = this.files[0];
    if (file) {
        // URL.createObjectURL का इस्तेमाल ताकि गाना सीधे RAM से फास्ट प्ले हो
        let objectUrl = URL.createObjectURL(file);
        bgMusic.src = objectUrl;
        
        playPauseBtn.style.display = "inline-block";
        removeMusicBtn.style.display = "inline-block";
        uploadMusicBtn.innerText = "🎵 " + file.name.substring(0, 10) + "...";
        
        bgMusic.play();
        isPlaying = true;
        playPauseBtn.innerHTML = currentLang === 'hi' ? "⏸ सुर रोकें" : "⏸ Pause Melody";
    }
});

removeMusicBtn.addEventListener('click', () => {
    bgMusic.pause();
    bgMusic.src = "";
    playPauseBtn.style.display = "none";
    removeMusicBtn.style.display = "none";
    isPlaying = false;
    uploadMusicBtn.innerText = langData[currentLang].uploadBtn;
    alert(currentLang === 'hi' ? "सुर हटा दिया गया है! 🗑️" : "Melody removed! 🗑️");
});

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) { bgMusic.pause(); playPauseBtn.innerHTML = currentLang === 'hi' ? "▶ प्यारा सा सुर चलाएं" : "▶ Play Melody"; isPlaying = false; }
    else { bgMusic.play(); playPauseBtn.innerHTML = currentLang === 'hi' ? "⏸ सुर रोकें" : "⏸ Pause Melody"; isPlaying = true; }
});

let fullscreenBtn = document.getElementById('fullscreenBtn'), topNav = document.getElementById('topNav'), topTriggerArea = document.getElementById('topTriggerArea'), exitFullscreenBtn = document.getElementById('exitFullscreenBtn'), bookContainer = document.getElementById('bookContainer');

fullscreenBtn.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
});

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        topNav.style.display = 'none';
        topTriggerArea.style.display = 'block';
        bookContainer.classList.remove('show-animated');
    } else {
        topNav.style.display = 'flex';
        topTriggerArea.style.display = 'none';
    }
    setTimeout(updateBookLayout, 100);
});

topTriggerArea.addEventListener('click', () => topTriggerArea.classList.toggle('active'));
exitFullscreenBtn.addEventListener('click', () => { if (document.exitFullscreen) document.exitFullscreen(); });

let autoPlayBtn = document.getElementById('autoPlayBtn'), autoPlayInterval, isAutoPlaying = false;

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    isAutoPlaying = false;
    autoPlayBtn.innerHTML = langData[currentLang].autoPlayBtn;
    autoPlayBtn.classList.remove('highlight-btn');
}

function autoPlayStep() {
    if (currentPage === 0) book.classList.add('open');

    if (currentPage < pagesToFlip.length) {
        pagesToFlip[currentPage].classList.add('flipped');
        currentPage++;
    } else {
        pagesToFlip.forEach(p => p.classList.remove('flipped'));
        book.classList.remove('open');
        currentPage = 0;
        stopAutoPlay();
    }
}

autoPlayBtn.addEventListener('click', () => {
    if (isAutoPlaying) {
        stopAutoPlay();
    } else {
        if (currentPage === 0 || currentPage === pagesToFlip.length) {
            pagesToFlip.forEach(p => p.classList.remove('flipped'));
            book.classList.remove('open');
            currentPage = 0;

            setTimeout(() => {
                autoPlayStep();
                autoPlayInterval = setInterval(autoPlayStep, 3500); 
            }, 300);
        } else {
            autoPlayStep();
            autoPlayInterval = setInterval(autoPlayStep, 3500);
        }

        autoPlayBtn.innerHTML = langData[currentLang].stopPlay;
        autoPlayBtn.classList.add('highlight-btn');
        isAutoPlaying = true;
    }
});

let lockBtn = document.getElementById('lockBtn');
lockBtn.addEventListener('click', () => {
    if (isPlaying) { bgMusic.pause(); playPauseBtn.innerHTML = currentLang === 'hi' ? "▶ प्यारा सा सुर चलाएं" : "▶ Play Melody"; isPlaying = false; }
    if (isAutoPlaying) stopAutoPlay();

    if (document.fullscreenElement) document.exitFullscreen();
    pagesToFlip.forEach(p => p.classList.remove('flipped'));
    book.classList.remove('open'); currentPage = 0;
    document.getElementById('loginPassInput').value = ""; document.getElementById('loginMsg').innerText = "";
    sessionStorage.clear(); hideAll();
    document.getElementById('topNav').style.display = "none"; screens.login.style.display = "block";
});

let inactivityTime = function () {
    let time;
    function resetTimer() { clearTimeout(time); if (screens.book.style.display === "block") time = setTimeout(logoutDueToInactivity, 300000); }
    function logoutDueToInactivity() {
        alert(currentLang === 'hi' ? "सुरक्षा चेतावनी: 5 मिनट तक कोई हलचल न होने के कारण यादों को समेट दिया गया है! 🔒" : "Security Alert: Auto-locked due to 5 mins of inactivity! 🔒");
        lockBtn.click();
    }
    window.addEventListener('mousemove', resetTimer); window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer); window.addEventListener('scroll', resetTimer);
};
inactivityTime();

(function () {
    try {
        let _k = atob("Q3JlYXRlZCBieSBLdWxkZWVwICYgR2VtaW5p");
        let _w = document.createElement("div");
        _w.innerText = "✨ " + _k + " ✨";
        _w.setAttribute("style", "position:fixed;bottom:12px;right:18px;font-size:12px;color:rgba(255,255,255,0.25);z-index:2147483647;pointer-events:none;font-weight:600;letter-spacing:1px;font-family:sans-serif;text-shadow:0 0 5px rgba(0,0,0,0.8);");
        document.body.appendChild(_w);
    } catch (e) { }
})();

let resizeTimeout;
function updateBookLayout() {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    const navHeight = isFullscreen ? 0 : 75;
    const baseW = 450, baseH = 620, openW = baseW * 2;
    let availW = window.innerWidth, availH = window.innerHeight;

    if (!isFullscreen && screens.book.style.display === "block") {
        availH -= (navHeight + 20);
        bookContainer.style.marginTop = (navHeight / 2) + "px";
    } else {
        bookContainer.style.marginTop = "0px";
    }

    const padW = isFullscreen ? 0.95 : 0.90;
    const padH = isFullscreen ? 0.92 : 0.85;
    const maxW = availW * padW, maxH = availH * padH;
    const scaleX = maxW / openW, scaleY = maxH / baseH;
    let finalScale = Math.min(scaleX, scaleY);

    if (!isFullscreen && window.innerWidth > 1024 && finalScale > 1) finalScale = 1;

    document.documentElement.style.setProperty('--book-scale', finalScale);
    document.documentElement.style.setProperty('--open-translate', (baseW / 2) + 'px');
}

window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(updateBookLayout, 150); });
window.addEventListener('orientationchange', () => { setTimeout(updateBookLayout, 200); });
updateBookLayout();
