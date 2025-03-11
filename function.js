const htmlElement = document.documentElement;
const sunBtn = document.querySelector(".sun");
const moonBtn = document.querySelector(".moon");
moonBtn.style.display = "none";


function toggleMode() {

    htmlElement.classList.toggle("dark")
    if (htmlElement.classList.contains("dark")) {
        sunBtn.style.display = "none";
        moonBtn.style.display = "block";
        localStorage.setItem("theme", "dark")
    } else {
        sunBtn.style.display = "block";
        moonBtn.style.display = "none";
        localStorage.setItem("theme", "")
    }


}

function loadThemes() {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") {
        htmlElement.classList.add("dark")
        sunBtn.style.display = "none";
        moonBtn.style.display = "block";
    } else {
        htmlElement.classList.remove("dark")
        sunBtn.style.display = "block";
        moonBtn.style.display = "none";
    }
}

loadThemes()

// now let try to add an image

const fileInput = document.querySelector("#fileInput");
const chooseImgBtn = document.querySelector("#choose-image-btn");
const previewImage = document.querySelector("#preview-image");

chooseImgBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", loadImage);

function loadImage() {

    const file = fileInput.files[0];

    if (!file) {
        return;
    } else {
        previewImage.src = URL.createObjectURL(file);
        previewImage.addEventListener("load", () => document.querySelector(".container").classList.remove("disable"))

    }
    console.log(file)
}