// ===============================
// MOBILE NAVIGATION
// ===============================

const menu = document.querySelector(".menu");

const nav = document.querySelector(".header nav");


// Open / close menu

menu.addEventListener("click", function () {

    nav.classList.toggle("open");

});


// Close menu when a navigation link is clicked

const navLinks = document.querySelectorAll(".header nav a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("open");

    });

});