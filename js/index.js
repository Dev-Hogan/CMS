// 给一级菜单绑定点击
// 获取所有的一级菜单
const level1Menus = document.querySelectorAll(".level-1-menu");

[...level1Menus].forEach((menu) => {
  menu.addEventListener("click", () => {
    const subMenu = menu.nextElementSibling;
    menu.classList.toggle("active");
    subMenu.style.height =
      subMenu.style.height === "" ? subMenu.scrollHeight + "px" : "";
  });
});

//折叠左边整体菜单栏
const hideMenu = document.querySelector(".nav-left");
hideMenu.addEventListener("click", () => {
  const left = document.querySelector(".left-menu");
  left.classList.toggle("hide");
});

//退出登录
const logout = document.querySelector(".out");
const modal =  bootstrap.Modal.getOrCreateInstance("#logoutModal");
logout.addEventListener("click", () => {
  modal.show();
});
const confirmLogout = document.querySelector("#confirmLogout");
confirmLogout.addEventListener("click", () => {
  //用户确认
  localStorage.removeItem("token");
  location.href = "login.html";
  modal.hide();
});

//父页面添加退出跳转表记
window.parentPageFlag = true

//初始化数据
const initDate = document.querySelector("#initDate");
initDate.addEventListener("click", async () => { 
  await axios.get("/init/data").then((res) => {
    toastr.success("初始化数据成功");
    console.log(res.data);
  })
    
  });
