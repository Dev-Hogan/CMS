// 给一级菜单绑定点击
// 获取所有的一级菜单
const level1Menus = document.querySelectorAll('.level-1-menu');

[...level1Menus].forEach(menu => {
  menu.addEventListener('click', () => {
    const subMenu = menu.nextElementSibling
    menu.classList.toggle('active')
    subMenu.style.height = subMenu.style.height === '' ? subMenu.scrollHeight + 'px': ''
  })
})