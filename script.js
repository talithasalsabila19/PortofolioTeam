const hamburger = document.getElementById('hamburger');
const tautanNav = document.getElementById('tautanNav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('aktif');
    tautanNav.classList.toggle('aktif');
});

document.querySelectorAll('.tautan').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('aktif');
    tautanNav.classList.remove('aktif');
}));

const jalur = document.getElementById('jalurKarousel');
const semuaKartu = document.querySelectorAll('.kartu-anggota');
const semuaTitik = document.querySelectorAll('.titik');
const jendela = document.querySelector('.jendela-carousel');

let indeksAktif = 0;
const totalKartu = semuaKartu.length;

let mulaiX = 0;
let sedangGeser = false;

function lebarSatuKartu() {
    return semuaKartu[0].offsetWidth + 24; 
}

function hitungOffset(indeks) {
    const lebarJendela = jendela.offsetWidth;
    const lebarKartuAktif = semuaKartu[indeks].offsetWidth;
    const posisiKiri = indeks * lebarSatuKartu() + 20;
    const offset = posisiKiri - (lebarJendela / 2) + (lebarKartuAktif / 2);
    return Math.max(0, offset);
}

function pindahKe(indeks) {
    indeksAktif = (indeks + totalKartu) % totalKartu;

    const offset = hitungOffset(indeksAktif);
    jalur.style.transform = `translateX(-${offset}px)`;

    semuaKartu.forEach((kartu, i) => {
        kartu.classList.toggle('aktif', i === indeksAktif);
    });

    semuaTitik.forEach((titik, i) => {
        titik.classList.toggle('aktif', i === indeksAktif);
    });
}

semuaKartu.forEach((kartu, i) => {
    kartu.addEventListener('click', () => {
        if (i !== indeksAktif) pindahKe(i);
    });
});

semuaTitik.forEach((titik, i) => {
    titik.addEventListener('click', () => pindahKe(i));
});

jendela.addEventListener('touchstart', (e) => {
    mulaiX = e.touches[0].clientX;
    sedangGeser = true;
}, { passive: true });

jendela.addEventListener('touchmove', (e) => {
    e.preventDefault(); 
}, { passive: false });

jendela.addEventListener('touchend', (e) => {
    if (!sedangGeser) return;
    const selisih = mulaiX - e.changedTouches[0].clientX;
    if (Math.abs(selisih) > 40) {
        pindahKe(selisih > 0 ? indeksAktif + 1 : indeksAktif - 1);
    }
    sedangGeser = false;
});

jendela.addEventListener('mousedown', (e) => {
    mulaiX = e.clientX;
    sedangGeser = true;
    jendela.style.cursor = 'grabbing';
    e.preventDefault();
});

jendela.addEventListener('mouseup', (e) => {
    if (!sedangGeser) return;
    const selisih = mulaiX - e.clientX;
    if (Math.abs(selisih) > 40) {
        pindahKe(selisih > 0 ? indeksAktif + 1 : indeksAktif - 1);
    }
    sedangGeser = false;
    jendela.style.cursor = 'default';
});

jendela.addEventListener('mouseleave', () => {
    sedangGeser = false;
    jendela.style.cursor = 'default';
});

window.addEventListener('load', () => pindahKe(0));
window.addEventListener('resize', () => pindahKe(indeksAktif));