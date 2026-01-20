// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ナビゲーションのアクティブ状態
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ページロード時のアニメーション
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.about-item, .division-card, .recruit-item');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
    });
});

// フェードインアップアニメーション
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-links a.active {
        color: #00ffff;
        border-bottom: 2px solid #00ffff;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
    }

    /* ネオン効果の追加アニメーション */
    @keyframes neon-pulse {
        0%, 100% {
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.5), inset 0 0 10px rgba(0, 255, 255, 0.1);
        }
        50% {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), inset 0 0 20px rgba(0, 255, 255, 0.2);
        }
    }

    .division-card {
        animation: neon-pulse 3s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// スクロール時の要素の表示
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// マウスホバー時のネオン効果
document.querySelectorAll('.division-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = '#ff00ff';
    });
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = '#00ffff';
    });
});
