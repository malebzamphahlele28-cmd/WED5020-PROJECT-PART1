// JavaScript for The Manor Beauty Co Salon

document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const images = Array.from(document.querySelectorAll('section img'));
  const contactForm = document.querySelector('form');

  if (header) {
    const message = document.createElement('p');
    message.textContent = 'Welcome to The Manor Beauty Co � styling confidence for every client.';
    message.style.fontSize = '0.95rem';
    message.style.color = '#8f5d45';
    message.style.margin = '0 1.6rem 1rem';
    header.appendChild(message);
  }

  images.forEach((image, index) => {
    image.style.opacity = '0';
    image.style.transform = 'translateY(20px)';
    image.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
    image.style.transitionDelay = `${index * 0.1}s`;
    requestAnimationFrame(() => {
      image.style.opacity = '1';
      image.style.transform = 'translateY(0)';
    });
  });

  if (contactForm) {
    const showFormMessage = (message, isError = false) => {
      const existing = contactForm.querySelector('.form-message');
      if (existing) existing.remove();

      const note = document.createElement('div');
      note.className = 'form-message';
      note.style.marginTop = '1rem';
      note.style.padding = '1rem';
      note.style.borderRadius = '16px';
      note.style.background = isError ? '#f9e1e0' : '#f5ebe6';
      note.style.color = isError ? '#9f3d3d' : '#6d4a3a';
      note.style.border = isError ? '1px solid #e1b0ae' : '1px solid #e7d0c3';
      note.textContent = message;
      contactForm.appendChild(note);
    };

    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const nameInput = contactForm.querySelector('#name');
      const emailInput = contactForm.querySelector('#email');
      const passwordInput = contactForm.querySelector('#password');
      const selectedGender = contactForm.querySelector('input[name="Gender"]:checked');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';
      const gender = selectedGender ? selectedGender.value : '';

      const errors = [];
      if (!name) {
        errors.push('Please enter your name.');
      }
      if (!email) {
        errors.push('Please enter your email address.');
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.push('Please enter a valid email address.');
      }
      if (!password) {
        errors.push('Please enter a password.');
      } else if (password.length < 6) {
        errors.push('Password must be at least 6 characters.');
      }
      if (!gender) {
        errors.push('Please select a gender option.');
      }

      if (errors.length > 0) {
        showFormMessage(errors.join(' '), true);
        return;
      }

      showFormMessage('Thanks! We received your request and will be in touch soon.');
      contactForm.reset();
    });
  }

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      localStorage.setItem('lastPage', link.textContent.trim());
    });
  });

  const lastPage = localStorage.getItem('lastPage');
  if (lastPage) {
    const saved = document.createElement('div');
    saved.textContent = `Last visited: ${lastPage}`;
    saved.style.textAlign = 'center';
    saved.style.color = '#7a6b61';
    saved.style.margin = '1rem auto';
    saved.style.fontSize = '0.95rem';
    if (header) header.after(saved);
  }
});
