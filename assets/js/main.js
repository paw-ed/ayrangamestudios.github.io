// Smooth scroll for anchor links
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

// Copy email functionality
const copyBtn = document.getElementById('copyBtn');
const mailText = document.getElementById('mailText');

if (copyBtn && mailText) {
  copyBtn.addEventListener('click', async () => {
    const text = mailText.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '✅ Kopyalandı';
      copyBtn.style.background = 'rgba(0, 240, 255, 0.3)';
      copyBtn.style.borderColor = 'var(--neon-cyan)';
      
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
        copyBtn.style.borderColor = '';
      }, 2000);
    } catch (err) {
      alert('Kopyalanamadı. E-posta: ' + text);
    }
  });
}

// Update copyright year
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe game cards for scroll animations
document.querySelectorAll('.game-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(card);
});

// Add parallax effect to hero logo on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const heroLogo = document.querySelector('.hero-logo');
  if (heroLogo) {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.3;
    heroLogo.style.transform = `translateY(${parallax}px) scale(1)`;
  }
}, { passive: true });

// Add glow effect on mouse move for game cards
document.querySelectorAll('.game-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (x - centerX) / centerX;
    const angleY = (y - centerY) / centerY;
    
    card.style.setProperty('--mouse-x', `${angleX * 20}px`);
    card.style.setProperty('--mouse-y', `${angleY * 20}px`);
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--mouse-x', '0px');
    card.style.setProperty('--mouse-y', '0px');
  });
});

