var navHeight = document.getElementById("mainNav");
var toTopButton = document.getElementById("toTopButton");

console.log("navHeight: " + navHeight);
console.log("toTopButton: " + toTopButton);

window.addEventListener("scroll", (e) => {
    onScrollEventHandler(window.scrollY);
});

function onScrollEventHandler(scrollTop) {
    if (scrollTop > navHeight.clientHeight) {
        toTopButton.classList.remove("hidden");
    } else {
        toTopButton.classList.add("hidden");
    }
}
