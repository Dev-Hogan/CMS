//配置axios默认地址
axios.defaults.baseURL = "http://www.itcbc.com:8000";
//配置状态弹窗位置
toastr.options.positionClass = "toast-top-center";
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    if (response.data.code === 1) {
        //提示用户失败
        toastr.error(response.data.message)
        return Promise.reject(new Error(response.data.message));
    }
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    toastr.error(error.response.data.message)
    return Promise.reject(error);
  });

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
loginForm.addEventListener("submit",async (e) => {
  e.preventDefault();
  //校验表单
  validDate(loginForm);
  //调用接口
  const [usernameInput, passwordInput] = loginForm.querySelectorAll("input");

  const res = await axios.post("/api/login", {
    username: usernameInput.value,
    password: passwordInput.value,
  });
  toastr.success(res.data.message);
  console.log("登录结果", res.data.message);
});
//注册表单
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  //校验表单
  validDate(registerForm);
  //调用接口
  const [usernameInput, passwordInput] = registerForm.querySelectorAll("input");

  const res = await axios.post("/api/register", {
    username: usernameInput.value,
    password: passwordInput.value,
  });
  toastr.success(res.data.message);
    console.log("注册结果", res.data.message);
    //切换到登录页面
    toggleForm();
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
