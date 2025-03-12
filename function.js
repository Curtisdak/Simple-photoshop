const htmlElement = document.documentElement;
const sunBtn = document.querySelector(".sun");
const moonBtn = document.querySelector(".moon");
moonBtn.style.display = "none";
const resetFilterBtn = document.querySelector("#reset-btn")
const saveBtn = document.querySelector("#save-image-btn")
const toastElement = document.querySelector("#toastElement")

const rotateOptions = document.querySelectorAll("#rotate-flip-container button")

let brightness = 100;
let saturation = 100;
let inversion = 0;
let grayscale = 0;
let rotate = 0;
let flipHorizontal = 1;
let flipVertical = 1;



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

    resetFilterBtn.click()

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
        applyFilters()
    });
});

const applyFilters = () => {

    previewImage.style.transition = ` transform .6s ease-in-out, filter .6s ease-in-out `
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical}) `
    previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `
}

resetFilterBtn.addEventListener("click", resetFilter)
saveBtn.addEventListener("click", downloadImage)
    // now I will do the slider
function updateFilter() {
    console.log(filterSlider.value)
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector("#filters .active");

    if (selectedFilter.id === "Brightness") {
        brightness = filterSlider.value;
        // filterSlider.max = "200"
    } else if (selectedFilter.id === "Saturation") {
        saturation = filterSlider.value;
        // filterSlider.max = "200"
    } else if (selectedFilter.id === "Inversion") {
        inversion = filterSlider.value;
        // filterSlider.max = "100"
    } else if (selectedFilter.id === "Grayscale") {
        grayscale = filterSlider.value;
        // filterSlider.max = "100"
    }
    applyFilters()
}


// my function for rotate and flip btn

rotateOptions.forEach((option) => {

    option.addEventListener("click", () => {

        if (option.id === "left") {
            rotate -= 90;
        } else if (option.id === "right") { rotate += 90; } else if (option.id === "horizontal") { flipHorizontal = flipHorizontal === 1 ? -1 : 1 } else if (option.id = "vertical") { flipVertical = flipVertical === 1 ? -1 : 1 }

        applyFilters()

    })
})


function resetFilter() {
    brightness = 100;
    saturation = 100;
    inversion = 0;
    grayscale = 0;
    rotate = 0;
    flipHorizontal = 1;
    flipVertical = 1;
    filtersOption[0].click();
    applyFilters()
}

let isClicked = false;

function downloadImage() {

    if (isClicked) return

    isClicked = true;
    saveBtn.innerText = "Waiting...";
    saveBtn.classList.add("disabledBtn")
    toastElement.style.display = "none"
    console.log(isClicked)

    setTimeout(() => {
        console.log("saveBtn")

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = previewImage.naturalWidth;
        canvas.height = previewImage.naturalHeight;

        ctx.translate(canvas.width / 2, canvas.height / 2);
        if (rotate !== 0) { ctx.rotate(rotate * Math.PI / 180) }
        ctx.scale(flipHorizontal, flipVertical);
        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `
        ctx.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        const link = document.createElement("a")
        const file = fileInput.files[0]
        link.download = `photoSimple-${file.name}`
        link.href = canvas.toDataURL("image.jpeg")
        link.click()

        isClicked = false
        saveBtn.innerText = "Downloaded";
        saveBtn.classList.add("disabledBtn");
        const message = document.createElement('p')
        toastElement.innerHTML = "";
        message.innerText = "Image has been downloaded"
        toastElement.appendChild(message)
        toastElement.style.display = "block"
        console.log(isClicked)


        setTimeout(() => {
            if (isClicked === false) {
                saveBtn.innerText = "SAVE IMAGE";
                saveBtn.classList.remove("disabledBtn")
                toastElement.style.display = "none"


            }
        }, 3000);

    }, 1000)

};