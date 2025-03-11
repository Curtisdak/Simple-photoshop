const htmlElement = document.documentElement;
const sunBtn = document.querySelector(".sun");
const moonBtn = document.querySelector(".moon");
moonBtn.style.display = "none";


let brightness = 100;
let saturation = 100;
let inversion = 0;
let grayscale = 0;


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

//hummI can now go on the filter
const filtersOption = document.querySelectorAll("#filters button");
const filterName = document.querySelector("#filter-name");
const filterValue = document.querySelector("#filter-percent")
const filterSlider = document.querySelector("#slide");
filterSlider.addEventListener("input", updateFilter)

filtersOption.forEach((option) => {
    option.addEventListener("click", () => {
        document.querySelector("#filters .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if (option.id === "Brightness") {
            filterSlider.max = "200"
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`

        } else if (option.id === "Saturation") {
            filterSlider.max = "200"
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if (option.id === "Inversion") {
            filterSlider.max = "100"
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`
        } else if (option.id === "Grayscale") {
            filterSlider.max = "100"
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`
        }


        applyChange()
    });
});

function applyChange() {
    previewImage.style.filter = ` brightness(${brightness}) saturate(${saturation}) invert(${inversion}) grayscale(${grayscale}) `
}






// now I will do the slider







function updateFilter() {
    console.log(filterSlider.value)
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector("#filters .active");

    if (selectedFilter.id === "Brightness") {
        brightness = filterSlider.value;
        filterSlider.max = "200"
    } else if (selectedFilter.id === "Saturation") {
        saturation = filterSlider.value;
        filterSlider.max = "200"
    } else if (selectedFilter.id === "Inversion") {
        inversion = filterSlider.value;
        filterSlider.max = "100"
    } else if (selectedFilter.id === "Grayscale") {
        grayscale = filterSlider.value;
        filterSlider.max = "100"
    }




}

}