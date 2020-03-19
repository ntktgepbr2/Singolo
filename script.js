const MENU = document.getElementById("menu");
const BUTTON = document.getElementById("btn");
const CLOSE_BUTTON = document.getElementById("close-btn");
const SUBMIT_BTN = document.getElementById("btn");
const FORM = document.getElementById("quote-form");
const COLLECTION = document.getElementById("collection");
const COLLECTION_BTNS = document.querySelectorAll(".cards-filter a");
const items = document.querySelectorAll(".item");
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener("animationend", function() {
        this.classList.remove("active-slide", direction);
    });
}

function showItem(direction) {
    items[currentItem].classList.add("next", direction);
    items[currentItem].addEventListener("animationend", function() {
        this.classList.remove("next", direction);
        this.classList.add("active-slide");
        isEnabled = true;
    });
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

BUTTON.addEventListener("click", event => {
    const subject = document.getElementById("subject").value.toString();
    if (subject == "") {
        document.getElementById("theme").innerText = "Без темы";
    } else {
        document.getElementById("theme").innerText = subject;
    }
    document.getElementById("theme").innerText = subject;
    document.getElementById("message-block").classList.remove("hidden");
});

BUTTON.addEventListener("click", event => {
    const describe = document.getElementById("describe").value.toString();
    if (describe == "") {
        document.getElementById("describe").innerText = "Без описания";
    } else {
        document.getElementById("describe").innerText = describe;
    }
    document.getElementById("description").innerText = describe;
    document.getElementById("message-block").classList.remove("hidden");
});

CLOSE_BUTTON.addEventListener("click", event => {
    document.getElementById("theme").innerText = "";
    document.getElementById("description").innerText = "";
    document.getElementById("message-block").classList.add("hidden");
});

FORM.addEventListener("submit", event => {
    event.preventDefault();
});

function validateForm() {
    let x = document.forms["quote-form"]["subject"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}