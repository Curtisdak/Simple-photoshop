const htmlElement = document.documentElement;
const sunBtn = document.querySelector(".sun");
const moonBtn = document.querySelector(".moon");
moonBtn.style.display = "none";


function toggleMode() {
    console.log("hello")


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