const hamburger = document.querySelector(".hamburgermenu");
const close = document.querySelector(".close");
const navLinks = document.querySelector(".header-links");
const links = document.querySelectorAll(".naaa li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

close.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 200);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
