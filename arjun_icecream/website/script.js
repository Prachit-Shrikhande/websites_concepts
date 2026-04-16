/* =============================================
   ARJUN ICE CREAM PARLOUR — JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ================================
  // CUSTOM CURSOR
  // ================================
  const cursor = document.getElementById('customCursor');
  
  if (cursor && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .bento-card, .drop-card, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ================================
  // SCROLL REVEAL ANIMATION
  // ================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ================================
  // OPEN NOW BADGE — DYNAMIC STATUS
  // ================================
  function updateOpenStatus() {
    const badge = document.getElementById('openBadge');
    const footerBadge = document.querySelector('.footer-bottom-badge');
    if (!badge) return;

    const now = new Date();
    const hours = now.getHours();
    // Assume open from 10 AM to 11 PM (22:00)
    const isOpen = hours >= 10 && hours < 23;

    if (isOpen) {
      badge.innerHTML = '<span class="pulse"></span> OPEN NOW';
      badge.style.background = 'var(--accent)';
      if (footerBadge) {
        footerBadge.querySelector('span:last-child').textContent = 'OPEN NOW — SERVING FRESH';
      }
    } else {
      badge.innerHTML = '<span class="pulse" style="background:#EF4444;"></span> CLOSED NOW';
      badge.style.background = '#FEE2E2';
      if (footerBadge) {
        footerBadge.querySelector('span:last-child').textContent = 'CLOSED — OPENS AT 10 AM';
      }
    }
  }

  updateOpenStatus();
  setInterval(updateOpenStatus, 60000);

  // ================================
  // HEADER SCROLL EFFECT
  // ================================
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '4px 4px 0px var(--primary)';
    } else {
      header.style.boxShadow = '4px 4px 0px var(--primary)';
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

  // ================================
  // CONTACT FORM HANDLER
  // ================================
  window.handleFormSubmit = function(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !phone) {
      showFormFeedback('Please fill in your name and phone number.', 'error');
      return;
    }

    // Construct WhatsApp message with form data
    const whatsappMsg = encodeURIComponent(
      `Hi! I'm ${name}.\nPhone: ${phone}\n${message ? 'Message: ' + message : 'I want to inquire about ice cream orders.'}`
    );
    
    const whatsappUrl = `https://wa.me/919763313383?text=${whatsappMsg}`;
    
    showFormFeedback('Opening WhatsApp... Your inquiry is being sent! ✅', 'success');
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 800);

    // Reset form
    document.getElementById('contactForm').reset();
  };

  function showFormFeedback(message, type) {
    // Remove existing feedback
    const existing = document.querySelector('.form-feedback');
    if (existing) existing.remove();

    const feedback = document.createElement('div');
    feedback.className = 'form-feedback';
    feedback.textContent = message;
    feedback.style.cssText = `
      padding: 14px 20px;
      margin-top: 16px;
      border: 2px solid var(--primary);
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      background: ${type === 'success' ? 'var(--accent)' : '#FEE2E2'};
      color: var(--primary);
      box-shadow: 2px 2px 0px var(--primary);
      animation: slideIn 0.3s ease;
    `;

    document.getElementById('contactForm').appendChild(feedback);

    setTimeout(() => {
      feedback.style.opacity = '0';
      feedback.style.transition = 'opacity 0.3s ease';
      setTimeout(() => feedback.remove(), 300);
    }, 4000);
  }

  // ================================
  // NEWSLETTER SUBSCRIBE
  // ================================
  const subscribeBtn = document.getElementById('footerSubscribeBtn');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('footerEmail');
      const email = emailInput ? emailInput.value.trim() : '';
      
      if (!email || !email.includes('@')) {
        subscribeBtn.textContent = '❌';
        setTimeout(() => { subscribeBtn.textContent = 'JOIN'; }, 2000);
        return;
      }

      subscribeBtn.textContent = '✅';
      emailInput.value = '';
      setTimeout(() => { subscribeBtn.textContent = 'JOIN'; }, 3000);
    });
  }

  // ================================
  // HORIZONTAL SCROLL — DRAG SUPPORT
  // ================================
  const scrollContainer = document.getElementById('scrollContainer');
  
  if (scrollContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      scrollContainer.style.cursor = 'grabbing';
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
      isDown = false;
      scrollContainer.style.cursor = '';
    });

    scrollContainer.addEventListener('mouseup', () => {
      isDown = false;
      scrollContainer.style.cursor = '';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    });
  }

  // ================================
  // SMOOTH ENTRY ANIMATION
  // ================================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

});
