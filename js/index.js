const [li1, li2] = document.querySelectorAll(".menu-container li");
li1.addEventListener("click", (e) => {
    if (e.target.classList.contains("level1-menu")) {
        const drop = li1.querySelector(".child-menu");
        drop.style.height =
        drop.style.height === "" ? drop.scrollHeight + "px" : "";
        drop.style.backgroundColor = "#0d6efd";
    }
});
li2.addEventListener("click", (e) => {
    if (e.target.classList.contains("level1-menu")) {
        const drop = li2.querySelector(".child-menu");
        drop.style.height =
        drop.style.height === "" ? drop.scrollHeight + "px" : "";
    }
});

