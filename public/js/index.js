const input = document.getElementById("amountInput");
const select = document.getElementById("amountSelect");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");
const result3 = document.getElementById("result3");
const warning = document.getElementById("warning");

function sanitizeInput(value) {
  return value.replace(/[^0-9]/g, '');
}

function calculateResults() {
  let raw = input.value;
  let sanitized = sanitizeInput(raw);
  let value = parseInt(sanitized, 10);

  // Show warning if value exceeds 1,000,000
  if (value > 1000000) {
    warning.style.display = "block";
    value = 1000000;
    input.value = `${value}`;
  } else {
    warning.style.display = "none";
    input.value = sanitized;
  }

  if (isNaN(value)) {
    result1.textContent = result2.textContent = result3.textContent = "0";
    return;
  }

  let multiplierSet = [10, 20, 30];

  switch (select.value) {
    case "500":
      multiplierSet = [20, 30, 50];
      break;
    case "1000":
      multiplierSet = [30, 40, 60];
      break;
  }

  const val1 = value * multiplierSet[0];
  const val2 = value * multiplierSet[1];
  const val3 = value * multiplierSet[2];

  result1.textContent = val1 > 1000000 ? `${Math.floor(val1 / 1000000)}M+` : val1;
  result2.textContent = val2 > 1000000 ? `${Math.floor(val2 / 1000000)}M+` : val2;
  result3.textContent = val3 > 1000000 ? `${Math.floor(val3 / 1000000)}M+` : val3;
}

input.addEventListener("input", calculateResults);
select.addEventListener("change", calculateResults);

window.addEventListener('scroll', function () {
    const toper2 = document.querySelector('.toper2');
    const toper = document.querySelector('.toper');
    const toperHeight = toper.offsetHeight;

    if (window.scrollY >= toperHeight) {
      toper2.classList.add('fixed-nav');
    } else {
      toper2.classList.remove('fixed-nav');
    }
  });

const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;
  const totalItems = 6;
  let autoScroll;

  function getVisibleCount() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function updateCarousel() {
    const visibleItems = getVisibleCount();
    const item = track.querySelector('.carousel-item');
    const itemWidth = item.getBoundingClientRect().width;
    const offset = currentIndex * itemWidth;
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  function updateDots() {
    const visibleItems = getVisibleCount();
    const dotCount = totalItems - visibleItems + 1;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === currentIndex ? ' active' : '');
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function next() {
    const visibleItems = getVisibleCount();
    const maxIndex = totalItems - visibleItems;
    currentIndex = (currentIndex + 1 > maxIndex) ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function prev() {
    const visibleItems = getVisibleCount();
    const maxIndex = totalItems - visibleItems;
    currentIndex = (currentIndex - 1 < 0) ? maxIndex : currentIndex - 1;
    updateCarousel();
  }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  window.addEventListener('resize', () => {
    updateCarousel();
  });

  function startAutoScroll() {
    clearInterval(autoScroll);
    autoScroll = setInterval(next, 5000);
  }

  updateCarousel();
  startAutoScroll();


  document.querySelectorAll('.qa-item a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const item = this.closest('.qa-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.qa-item').forEach(i => {
        i.classList.remove('open');
      });

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  
  // Contact form validation
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    // Validate name (letters only)
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      alert("Name must contain only letters and spaces.");
      return;
    }

    // Validate email
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      alert("Enter a valid email.");
      return;
    }

    // Send to backend
    try {
      const response = await fetch('https://your-backend.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject: subject || null,
          phone,
          message: message || null
        })
      });

      if (!response.ok) throw new Error('Something went wrong');

      alert('Your message has been sent!');
      form.reset();
    } catch (err) {
      alert('Error submitting the form. Please try again.');
    }
  });

  const translations = {
  en: {
    support: "Support",
    email: "example@gmail.com",
    langLabel: "🌐",
  },
  de: {
    support: "Unterstützung",
    email: "beispiel@gmail.com",
    langLabel: "🌐",
  },
  fr: {
    support: "Assistance",
    email: "exemple@gmail.com",
    langLabel: "🌐",
  }
};

function applyTranslations(lang) {
  const t = translations[lang] || translations.en;
  document.querySelector('.part1').textContent = `💬 ${t.support}`;
  document.querySelector('.part2').textContent = `📧 ${t.email}`;
  // document.querySelector('.language-select-wrapper').firstChild.textContent = t.langLabel;
}

// Initial load
document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("language-select");

  // Apply default or saved language
  const savedLang = localStorage.getItem("lang") || "en";
  select.value = savedLang;
  applyTranslations(savedLang);

  // Listen to changes
  select.addEventListener("change", function () {
    const selectedLang = this.value;
    localStorage.setItem("lang", selectedLang);
    applyTranslations(selectedLang);
  });
});