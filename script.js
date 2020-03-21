const MENU = document.getElementById("menu");
const CLOSE_BUTTON = document.getElementById("close-btn");
const SUBMIT_BTN = document.getElementById("btn");
const messageBlock = document.getElementById("message-block");
const message = document.getElementById("message");
const inputName = document.getElementById("inputName");
const inputMail = document.getElementById("inputMail");
const inputSubject = document.getElementById("subject");
const inputDescribe = document.getElementById("describe");
const messageTheme = messageBlock.querySelector(".theme");
const messageDescription = messageBlock.querySelector(".description");
const FORM = document.getElementById("quote-form");
const COLLECTION = document.getElementById("collection");
const COLLECTION_BTNS = document.querySelectorAll(".cards-filter a");
let sliderContainer = document.getElementById("slider-container");
let items = document.querySelectorAll(".item");
let currentItem = 0;
let isEnabled = true;
const screen = document.querySelector(".landscape__wallpaper");
const screenTwo = document.querySelector(".portrait__wallpaper");

//Screen OnOff
screen.onclick = function() {
    screen.classList.toggle("hidden");
};
screenTwo.onclick = function() {
    screenTwo.classList.toggle("hidden");
};

// Slider
function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener(
        "animationend",
        function() {
            console.log(2);
            this.classList.remove("active-slide", direction);
        }, { once: true }
    );
    sliderContainer.classList.toggle("container-blue");
}

function showItem(direction) {
    console.log(direction);
    items[currentItem].classList.add("next", direction);
    console.log(items[currentItem].classList);
    items[currentItem].addEventListener(
        "animationend",
        function() {
            console.log(1);
            this.classList.remove("next", direction);
            this.classList.add("active-slide");
            isEnabled = true;
        }, { once: true }
    );
}

function previousItem(n) {
    hideItem("to-right");
    changeCurrentItem(n - 1);
    showItem("from-left");
}

function nextItem(n) {
    hideItem("to-left");
    changeCurrentItem(n + 1);
    showItem("from-right");
}
document.querySelector(".arrow-left").addEventListener("click", function() {
    if (isEnabled) {
        previousItem(currentItem);
    }
});
document.querySelector(".arrow-right").addEventListener("click", function() {
    if (isEnabled) {
        nextItem(currentItem);
    }
});

//Скрол с переключением ссылок

document.addEventListener("scroll", onScroll);

function onScroll(onScroll) {
    const curPos = window.scrollY;
    const sections = document.querySelectorAll("#container>section");
    const links = document.querySelectorAll("#header__menu a");
    const contactId = document.getElementById("contact");

    sections.forEach(el => {
        if (el.offsetTop <= curPos && el.offsetTop + el.offsetHeight > curPos) {
            links.forEach(a => {
                a.classList.remove("active");
                if (el.getAttribute("id") === a.getAttribute("href").substring(1)) {
                    a.classList.add("active");
                }
            });
        }
    });
}
//Collection shuffle
COLLECTION_BTNS.forEach(el => {
    el.addEventListener("click", event => {
        event.preventDefault();

        const images = COLLECTION.querySelectorAll("img");
        const array = [];

        images.forEach(img => array.push(img.src));
        array.sort(() => Math.random() - 0.5);

        for (let i = 0; i < images.length; i++) {
            images[i].src = array[i];
        }
    });
});

COLLECTION.addEventListener("click", event => {
    COLLECTION.querySelectorAll("img").forEach(el =>
        el.classList.remove("border")
    );

    if (event.target.tagName === "IMG") {
        event.target.classList.add("border");
    }
});
//Form submit
window.onload = function() {
    addMessageBlockHandlers();
    addFormHandler();
};
const showMessageBlock = () => {
    messageBlock.classList.remove("hidden");
};

const clear = () => {
    inputName.value = "";
    inputMail.value = "";
    inputSubject.value = "";
    inputDescribe.value = "";
};

const hideMessageBlock = () => {
    messageBlock.classList.add("hidden");
    clear();
};
const addMessageBlockHandlers = () => {
    CLOSE_BUTTON.addEventListener("click", () => {
        hideMessageBlock();
    });
};
const addText = (name, str, def) => {
    return !str.length ? def : name + str;
};
const contentMessageBlock = () => {
    messageTheme.innerText = addText("Тема: ", inputSubject.value, "Без темы");
    messageDescription.innerText = addText(
        "Описание: ",
        inputDescribe.value,
        "Без описания"
    );

    showMessageBlock();
};
const addFormHandler = () => {
    FORM.addEventListener("submit", event => {
        event.preventDefault();
        contentMessageBlock();
    });
};