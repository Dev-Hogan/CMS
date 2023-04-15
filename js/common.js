// 配置axios公共基地址
axios.defaults.baseURL = "http://www.itcbc.com:8000";
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    if (response.data.code === 1) {
      // 接口是失败的
      // 提示用户
      console.log(1, response.data.message);
      toastr.error(response.data.message);
      // 你可以返回一个失败的Promise，阻止接口正常返回
      // Promise.reject()表示创建一个失败的Promise
      return Promise.reject(new Error(response.data.message));
    } 
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 提示用户错误消息
    toastr.error(error.response.data.message);
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      setTimeout(() => {
        
        if (!window.parentPageFlag) {
          //子页面身份失效
          parent.location.href = 'login.html'
        } else {
          //父页面身份失效
          location.href = "login.html"; 
        }
      },1500)
    }
    return Promise.reject(error);
  }
);
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    toastr.error(error.response.data.message);

    return Promise.reject(error);
  }
);
// 配置toastr位置，顶部中间
toastr.options.positionClass = "toast-top-center";
