let currentPage = 1;
const totalPages = 5;

document.addEventListener("DOMContentLoaded", () => {
    
    /* ===== Audio Setup - Autoplay dan Loop ===== */
    const music = document.getElementById("music");
    
    // Fungsi untuk play audio
    const playAudio = () => {
        music.play().catch(err => {
            console.log("Audio autoplay diblokir, butuh interaksi user");
        });
    };
    
    // Coba autoplay saat load
    playAudio();
    
    // Backup: play audio saat user klik/touch pertama kali
    const enableAudio = () => {
        playAudio();
        document.removeEventListener("click", enableAudio);
        document.removeEventListener("touchstart", enableAudio);
    };
    
    document.addEventListener("click", enableAudio);
    document.addEventListener("touchstart", enableAudio);
    
    // Pastikan audio loop dan restart otomatis
    music.addEventListener("ended", () => {
        music.currentTime = 0;
        music.play();
    });

    /* ===== Navigasi Page ===== */
    window.nextPage = function () {
        // Sembunyikan page saat ini
        const currentPageEl = document.getElementById(`page${currentPage}`);
        currentPageEl.style.display = "none";
        
        // Pindah ke page berikutnya
        currentPage++;
        
        // Jika sudah page terakhir, kembali ke page 1
        if (currentPage > totalPages) {
            currentPage = 1;
        }
        
        // Tampilkan page baru
        const nextPageEl = document.getElementById(`page${currentPage}`);
        nextPageEl.style.display = "flex";
        
        // Update background
        document.body.setAttribute("data-page", currentPage);
        
        // Jalankan efek typing untuk page baru
        startTypingEffect(currentPage);
    };

    /* ===== Efek Typing ===== */
    function startTypingEffect(pageNum) {
        const typingEl = document.getElementById(`typing${pageNum}`);
        
        if (typingEl && typingEl.dataset.text) {
            // Reset konten
            typingEl.innerHTML = "";
            
            const text = typingEl.dataset.text;
            const speed = parseInt(typingEl.dataset.speed) || 120;
            let i = 0;

            function type() {
                if (i < text.length) {
                    typingEl.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }
    }
    
    // Jalankan typing untuk page pertama
    startTypingEffect(1);

    /* ===== Efek Hati Jatuh (SEMUA PAGE) ===== */
    const heartsContainer = document.querySelector(".hearts");
    
    if (heartsContainer) {
        function createHeart() {
            const heart = document.createElement("span");
            heart.innerHTML = ["❤️","💖","💕","💘"][Math.floor(Math.random()*4)];
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
            heart.style.fontSize = (Math.random() * 10 + 15) + "px";

            heartsContainer.appendChild(heart);
            
            // Hapus setelah animasi selesai
            setTimeout(() => heart.remove(), 6000);
        }
        
        // Buat hati setiap 300ms
        setInterval(createHeart, 300);
    }

});