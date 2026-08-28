const aboutSection = document.querySelector('.about-section')
const aboutMeBtn = document.querySelector('.about-me-btn')
const xIcon = document.querySelector('.x-icon')
const navbar = document.querySelector('.navbar')
const socialIcons = document.querySelector('.social-links')
const overlay = document.querySelector('.overlay')
const latestWorks = document.querySelector('.latest-works-link')
const downArrow = document.querySelector('.down-arrow')
const latestWorksArrow = document.querySelector('.latest-works-arrow')
const blackLogo = document.querySelector('.black-logo')
const contactForm = document.querySelector('.contact')
const sendButton = document.querySelector('.submit-btn')
const mainSection = document.querySelector('.main-section')

const icon = document.getElementById('icon')

// --------------------------------------------------
// Theme Toggle
// --------------------------------------------------

const contactSection = document.querySelector('.contact-section')

const label1 = contactSection?.querySelector('.label1')
const label2 = contactSection?.querySelector('.label2')
const label3 = contactSection?.querySelector('.label3')

if (icon) {
  icon.onclick = function () {
    document.body.classList.toggle('dark-theme')

    if (document.body.classList.contains('dark-theme')) {
      icon.src = 'images/sun.png'

      if (label1) label1.style.color = 'white'
      if (label2) label2.style.color = 'white'
      if (label3) label3.style.color = 'white'
    } else {
      icon.src = 'images/moon.png'

      if (label1) label1.style.color = ''
      if (label2) label2.style.color = ''
      if (label3) label3.style.color = ''
    }
  }
}

// --------------------------------------------------
// About Modal
// --------------------------------------------------

function openAbout() {
  if (aboutSection) aboutSection.classList.add('active')
  if (overlay) overlay.classList.add('active')
  if (navbar) navbar.classList.add('hidden')
  if (socialIcons) socialIcons.classList.add('hidden')

  disableScroll()
}

function closeAbout() {
  if (aboutSection) aboutSection.classList.remove('active')
  if (overlay) overlay.classList.remove('active')
  if (navbar) navbar.classList.remove('hidden')
  if (socialIcons) socialIcons.classList.remove('hidden')

  enableScroll()
}

if (aboutMeBtn) {
  aboutMeBtn.addEventListener('click', openAbout)
}

if (xIcon) {
  xIcon.addEventListener('click', closeAbout)
}

if (overlay) {
  overlay.addEventListener('click', closeAbout)
}

// --------------------------------------------------
// Smooth Navigation
// --------------------------------------------------

function scrollToWorks() {
  if (mainSection) {
    window.scrollTo({
      top: mainSection.clientHeight,
      behavior: 'smooth',
    })
  }
}

if (latestWorks) {
  latestWorks.addEventListener('click', (e) => {
    e.preventDefault()
    scrollToWorks()
  })
}

if (downArrow) {
  downArrow.addEventListener('click', (e) => {
    e.preventDefault()
    scrollToWorks()
  })
}

if (latestWorksArrow) {
  latestWorksArrow.addEventListener('click', (e) => {
    e.preventDefault()
    scrollToWorks()
  })
}

if (blackLogo) {
  blackLogo.addEventListener('click', (e) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}

// --------------------------------------------------
// Contact Form
// --------------------------------------------------

if (contactForm && sendButton) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const buttonText = sendButton.innerHTML

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        sendButton.classList.add('sent')
        sendButton.innerHTML = 'Message Sent'
        console.log('Message Sent Successfully')
      })
      .catch((error) => {
        sendButton.classList.add('notSent')
        sendButton.innerHTML = 'Something went wrong!'
        console.error(error)
      })
      .finally(() => {
        setTimeout(() => {
          sendButton.classList.remove('sent')
          sendButton.classList.remove('notSent')
          sendButton.innerHTML = buttonText
        }, 3000)
      })

    contactForm.reset()
  })
}

// --------------------------------------------------
// Certificate Swiper
// --------------------------------------------------

if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
  new Swiper('.mySwiper', {
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',

    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
  })
}

// --------------------------------------------------
// Disable / Enable Page Scroll
// --------------------------------------------------

const keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1,
}

function preventDefault(e) {
  e.preventDefault()
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

let supportsPassive = false

try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true
      },
    })
  )
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false

const wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

function disableScroll() {
  window.addEventListener(
    'DOMMouseScroll',
    preventDefault,
    false
  )

  window.addEventListener(
    wheelEvent,
    preventDefault,
    wheelOpt
  )

  window.addEventListener(
    'touchmove',
    preventDefault,
    wheelOpt
  )

  window.addEventListener(
    'keydown',
    preventDefaultForScrollKeys,
    false
  )
}

function enableScroll() {
  window.removeEventListener(
    'DOMMouseScroll',
    preventDefault,
    false
  )

  window.removeEventListener(
    wheelEvent,
    preventDefault,
    wheelOpt
  )

  window.removeEventListener(
    'touchmove',
    preventDefault,
    wheelOpt
  )

  window.removeEventListener(
    'keydown',
    preventDefaultForScrollKeys,
    false
  )
}

// --------------------------------------------------
// Escape Key - Close About Modal
// --------------------------------------------------

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAbout()
  }
})