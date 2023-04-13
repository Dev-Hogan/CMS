// 配置axios公共基地址
axios.defaults.baseURL = 'http://www.itcbc.com:8000';
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  if (response.data.code === 1) {
    // 接口是失败的
    // 提示用户
    toastr.error(response.data.message)
    // 你可以返回一个失败的Promise，阻止接口正常返回
    // Promise.reject()表示创建一个失败的Promise
    return Promise.reject(new Error(response.data.message))
  }
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 提示用户错误消息
  toastr.error(error.response.data.message)
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 配置toastr位置，顶部中间
toastr.options.positionClass = 'toast-top-center'

// 写一个函数，切换表单
function toggleForm() {
  const [loginForm, registerForm] = document.querySelectorAll('.user-form')
  // 两个表单分别切换一下d-block就能把显示的表单隐藏，隐藏的表单显示出来
  loginForm.classList.toggle('d-block')
  registerForm.classList.toggle('d-block')
}

// 获取两个切换表单的按钮
const [loginToggle, registerToggle] = document.querySelectorAll('.toggle-form')
// 两个表单的切换按钮，分别绑定点击事件
loginToggle.addEventListener('click', toggleForm)
registerToggle.addEventListener('click', toggleForm)

// 写一个校验函数，因为两个表单校验完全一样
function validate(form) {
  // 一开始假设用户输入没问题
  let ok = true
  // 获取用户名、密码的input
  const [usernameInput, passwordInput] = form.querySelectorAll('input')

  const usernameLength = usernameInput.value.length
  const passwordLength = passwordInput.value.length

  // 判断长度
  if (usernameLength < 2 || usernameLength > 15) {
    // 用户名校验不通过
    usernameInput.classList.add('is-invalid')
    ok = false
  } else {
    // 校验通过，去掉校验类
    usernameInput.classList.remove('is-invalid')
  }

  // 判断长度
  if (passwordLength < 6 || passwordLength > 15) {
    // 密码校验不通过
    passwordInput.classList.add('is-invalid')
    ok = false
  } else {
    // 校验通过，去掉校验类
    passwordInput.classList.remove('is-invalid')
  }

  // 至少一项校验不过
  if (ok === false) {
    // 抛出异常中断程序
    throw new Error('表单校验不通过')
  }
}

const [loginForm, registerForm] = document.querySelectorAll('.user-form')
// 处理登录表单的提交
loginForm.addEventListener('submit', async (e) => {
  // 阻止表单提交事件的默认刷新行为
  e.preventDefault()
  // 校验表单
  validate(loginForm)
  // 调用接口
  // 获取输入框
  const [usernameInput, passwordInput] = loginForm.querySelectorAll('input')
  await axios.post('/api/login', {
    username: usernameInput.value,
    password: passwordInput.value,
  })
  // 等待接口成功，提示用户
  toastr.success('登录成功')
})

// 处理注册表单的提交
registerForm.addEventListener('submit', async (e) => {
  // 阻止表单提交事件的默认刷新行为
  e.preventDefault()
  // 校验表单
  validate(registerForm)
  // 获取表单的输入框
  const [usernameInput, passwordInput] = registerForm.querySelectorAll('input')
  // 调用接口
  const res = await axios.post('/api/register', {
    username: usernameInput.value,
    password: passwordInput.value
  })
  // 提示用户，注册成功
  toastr.success('注册成功')
  console.log('注册结果', res);
})