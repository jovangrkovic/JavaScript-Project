const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tab = document.querySelectorAll(".operations__tab");
const tabscontainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const headerTitle = document.querySelector(".header__title");
const rezervisi = document.querySelectorAll(".btn-rezervisi");
const potvrdi = document.querySelector(".btn-potvrdi");
const ime = document.querySelector(".inp-ime");
const prezime = document.querySelector(".inp-prezime");
const mail = document.querySelector(".inp-mail");
const opcija = document.querySelectorAll(".opcija");
const odabrana = document.querySelector(".odabrana-opc");
const heder_text = document.querySelector(".modal__header");
const rezervacije = document.querySelector(".rezervacije");

function sendMail(params){

  var tempParams={
    from_name:'rezervacije@gmail.com',
    to_name:document.getElementById('ime').value,
    message:"Uspesno ste rezervisali vas smestaj!",

  };
  emailjs.send('gmail','template_sq3zfg8',tempParams, 'user_Us02nVZptd65KOjtGZyMV')
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
       console.log('FAILED...', err);
    });


}


console.log(rezervisi);
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

let tip, opc;
rezervisi.forEach((btn) =>
  btn.addEventListener("click", function () {
    tip = btn.value;
    if (tip === "stan") {
      heder_text.innerHTML = "Iznajmi stan";
    } else if (tip === "garsonjeru") {
      heder_text.innerHTML = "Iznajmi garsonjeru";
    } else {
      heder_text.innerHTML = "Iznajmi krevet";
    }
  })
);
opcija.forEach((opcija) =>
  opcija.addEventListener("click", function () {
    opc = opcija.textContent;
    console.log(opc);
    odabrana.innerHTML = `Broj dana: ${opc}`;
  })
);
potvrdi.addEventListener("click", function (e) {
  e.preventDefault();
  const _ime = ime.value;
  const _prezime = prezime.value;
  const _mail = mail.value;

  if (_ime === "" || _prezime === "" || _mail === "") {
    alert("popuni sva polja");
  } else {
    rezervacije.innerHTML += `Ime: ${_ime} | Prezime: ${_prezime} | email: ${_mail} | tip: ${tip} | broj dana: ${opc} <br>`;
    alert("Uspesno ste rezervisali!");
    ime.value = prezime.value = mail.value = "";
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

btnScrollTo.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

tabscontainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  if (!clicked) return;
  tab.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  console.log(clicked.dataset.tab);
  tabsContent.forEach((t) => t.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const sibilings = link.closest(".nav").querySelectorAll(".nav__link");

    sibilings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  const slider = document.querySelector(".slider");
  const numSlide = slides.length;
  let currentSlide = 0;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === numSlide - 1) {
      currentSlide = 0;
    } else currentSlide++;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = numSlide - 1;
    } else currentSlide--;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  document.addEventListener("keydown", function (e) {
    e.key === "ArrowRight" && nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  });
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
