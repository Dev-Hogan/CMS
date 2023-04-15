//获取学员信息列表渲染
const tbody = document.querySelector("tbody");
async function render() {
  const res = await axios.get("/student/list");
  const Date = res.data.data;
  console.log(Date, typeof Date);
  let html = "";
  for (const  student of Date) {
    html += `<tr>
                <th scope="row">${student.id}</th>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.sex}</td>
                <td>${student.group}</td>
                <td>${student.phone}</td>
                <td>${student.salary}</td>
                <td>${student.truesalary}</td>
                <td>${student.province}</td>
                <td>
                    <button class="btn btn-primary">修改</button>
                    <button class="btn btn-danger">删除</button>
                </td>
               
            </tr>`;
  }
  tbody.innerHTML = html;
}
render()

//渲染省份
const province = document.querySelector("#province");
async function renderProvince() {
    const res = await axios.get("/geo/province")
    const opt = res.data.map(
      (province) => `<option value="${province}" >${province}</option>`
    ).join('')
    province.insertAdjacentHTML('beforeend', opt)
}
renderProvince()

//选择省份渲染市县
province.addEventListener('change', () => {
    const provinceName = province.value
    console.log(provinceName);
    renderCity(provinceName)
})

//渲染市区
async function renderCity(province) {
    if (province !== '--省--') {
        console.log("@@@", province);
        const city =  await axios.get("/geo/city", {
          params: {
            pname: province
          },
        });
        const opt = city.data.map(
          (city) => `<option value="${city}">${city}</option>`
        );
        opt.unshift(`<option value="--市--" selected>--市--</option>`);
        const cityDom = document.querySelector("#city");
        cityDom.innerHTML = opt.join('')
    }
}
//渲染县区
const cityDom = document.querySelector("#city");
cityDom.addEventListener('change', () => {
    const cityName = cityDom.value;
    const provinceName = document.querySelector("#province").value
    renderArea(provinceName, cityName);

})
async function renderArea(province, city) {
    const areaDom = document.querySelector("#area");
  if (city !== "--市--") {
    const area = await axios.get("/geo/county", {
      params: {
            pname: province,
            cname: city
      },
    });
    const opt = area.data.map(
      (area) => `<option value="${area}" >${area}</option>`
    );
    opt.unshift(`<option value="1" selected>--县--</option>`);
    areaDom.innerHTML = opt.join("");
  } else {
    areaDom.innerHTML = "<option value='--县--' selected>--县--</option>";
  }
}

//上传添加学员数据
const saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", async () => {
  const studentForm = document.querySelector("#studentForm");
  const fd = new FormData(studentForm);
  const res = await axios.post("/student/add", Array.from(fd).reduce((acc, [key, val]) => {
    acc[key] = val
    return acc
  },{}))
  toastr.success(res.data.message);
  render();
})