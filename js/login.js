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
//监听表单
loginForm.addEventListener('submit', e => {
    e.preventDefault()
    //校验表单
    validDate(loginForm)
    //调用接口
    console.log('调用接口成功');
})
//检验表单函数
function validDate(form) {
    const [usernameInput,passwordInput] = form.querySelectorAll('input')
    const usernameLength = usernameInput.value.length
    const passwordLength = passwordInput.value.length

    //判断长度
    //校验码
    let ok = true
    if (usernameLength < 2 || usernameLength>15) {
        usernameInput.classList.add('is-invalid')
        ok = false
    } else {
        usernameInput.classList.remove('is-invalid')
    }
    if (passwordLength < 6 || passwordLength>15) {
        passwordInput.classList.add('is-invalid')
        ok = false
    } else {
        passwordInput.classList.remove('is-invalid')
    }
    //如果不通过抛出错误
    if (ok === false) {
        throw new Error('用户名或密码长度不对')
    }

}