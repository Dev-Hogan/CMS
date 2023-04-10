//切换注册，登录表单
function toggleForm() {
    const [loginForm,registerForm] = document.querySelectorAll('.user-form');
    loginForm.classList.toggle('d-block')
    registerForm.classList.toggle('d-block')
}

//给两个按钮绑定切换事件
const [loginToggle,registerToggle] = document.querySelectorAll('.toggle-form')
loginToggle.addEventListener('click',toggleForm)
registerToggle.addEventListener('click',toggleForm)