//一级菜单绑定点击，展开二级菜单
const level1Menus = document.querySelectorAll(".level-1-menu");

[...level1Menus].forEach((menu) => {
  menu.addEventListener("click", () => {
    const subMenu = menu.nextElementSibling;
    menu.classList.toggle("active");
    subMenu.style.height =
      subMenu.style.height === "" ? subMenu.scrollHeight + "px" : "";
  });
});
