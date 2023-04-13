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

//折叠左边整体菜单栏
const hideMenu = document.querySelector('.nav-left')
hideMenu.addEventListener('click', () => {
  const left = document.querySelector('.left-menu')
  left.classList.toggle('hide')
})

//退出登录
const logout = document.querySelector('.out')
logout.addEventListener('click', () => {
  //用户确认
  if (confirm('您确定退出登录吗？')) {
    localStorage.removeItem('token')
    location.href='login.html'
  }
 })