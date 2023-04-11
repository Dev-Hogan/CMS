const [li1,li2] = document.querySelectorAll(".menu-container li");
li1.addEventListener("click", () => {
    console.log(1);
    const drop = li1.querySelector('.child-menu')
    console.log(drop);
   drop.classList.toggle("open");
})
li2.addEventListener("click", () => {
    console.log(1);
    const drop = li2.querySelector('.child-menu')
    console.log(drop);
   drop.classList.toggle("open");
})

    
