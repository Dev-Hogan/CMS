//配置axios默认地址
axios.defaults.baseURL = "http://www.itcbc.com:8000";


//切换注册表单与登录表单
//给两个按钮绑定切换事件
const [loginToggle, registerToggle] = document.querySelectorAll(".toggle-form");
loginToggle.addEventListener("click", toggleForm);
registerToggle.addEventListener("click", toggleForm);
//切换注册，登录表单
function toggleForm() {
  const [loginForm, registerForm] = document.querySelectorAll(".user-form");
  loginForm.classList.toggle("d-block");
  registerForm.classList.toggle("d-block");
}

//表单校验
const [loginForm, registerForm] = document.querySelectorAll(".user-form");
//登录表单
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //校验表单
  validDate(loginForm);
  //调用接口
  console.log("调用接口成功");
});
//注册表单
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  //校验表单
  validDate(registerForm);
  //调用接口
  const [usernameInput, passwordInput] = registerForm.querySelectorAll("input");
    
  const res = await  axios.post("/api/register", {
      username: usernameInput.value,
      password: passwordInput.value,
  });
  console.log('注册结果',res.data.message);
});
//检验表单函数
function validDate(form) {
  const [usernameInput, passwordInput] = form.querySelectorAll("input");
  const usernameLength = usernameInput.value.length;
  const passwordLength = passwordInput.value.length;

  //判断长度
  //校验码
  let ok = true;
  if (usernameLength < 2 || usernameLength > 15) {
    usernameInput.classList.add("is-invalid");
    ok = false;
  } else {
    usernameInput.classList.remove("is-invalid");
  }
  if (passwordLength < 6 || passwordLength > 15) {
    passwordInput.classList.add("is-invalid");
    ok = false;
  } else {
    passwordInput.classList.remove("is-invalid");
  }
  //如果不通过抛出错误
  if (ok === false) {
    throw new Error("用户名或密码长度不对");
  }
}
