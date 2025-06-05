if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
});

const navbar = document.getElementById("navbar");
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollY > windowHeight) {
        navbar.classList.add("hide-up");  
    } else {
        navbar.classList.remove("hide-up"); 
    }

    if (scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});