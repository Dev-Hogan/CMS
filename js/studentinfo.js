//获取学员信息列表渲染
const tbody = document.querySelector("tbody");
async function render() {
  const res = await axios.get("/student/list");
  const Date = res.data.data;
  console.log(Date, typeof Date);
  let html = "";
  for (const student of Date) {
    html += `<tr>
                <th scope="row">${student.id}</th>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.sex}</td>
                <td>${student.group}</td>
                <td>${student.phone}</td>
                <td>${student.salary}</td>
                <td>${student.truesalary}</td>
                <td>${student.province + student.city}</td>
                <td>
                    <button data-type="modify" data-id="${
                      student.id
                    }" class="btn btn-primary">修改</button>
                    <button data-type="delete" data-id="${
                      student.id
                    }" class="btn btn-danger">删除</button>
                </td>
               
            </tr>`;
  }
  tbody.innerHTML = html;
}
render();

//渲染省份
const province = document.querySelector("#province");
async function renderProvince() {
  const res = await axios.get("/geo/province");
  const opt = res.data
    .map((province) => `<option value="${province}" >${province}</option>`)
    .join("");
  province.insertAdjacentHTML("beforeend", opt);
}
renderProvince();

//选择省份渲染市县
province.addEventListener("change", () => {
  const provinceName = province.value;
  console.log(provinceName);
  renderCity(provinceName);
});

//渲染市区
async function renderCity(province) {
  if (province !== "--省--") {
    console.log("@@@", province);
    const city = await axios.get("/geo/city", {
      params: {
        pname: province,
      },
    });
    const opt = city.data.map(
      (city) => `<option value="${city}">${city}</option>`
    );
    opt.unshift(`<option value="--市--" selected>--市--</option>`);
    const cityDom = document.querySelector("#city");
    cityDom.innerHTML = opt.join("");
  }
}
//渲染县区
const cityDom = document.querySelector("#city");
cityDom.addEventListener("change", () => {
  const cityName = cityDom.value;
  const provinceName = document.querySelector("#province").value;
  renderArea(provinceName, cityName);
});
async function renderArea(province, city) {
  const areaDom = document.querySelector("#area");
  if (city !== "--市--") {
    const area = await axios.get("/geo/county", {
      params: {
        pname: province,
        cname: city,
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

//上传添加或修改学员数据
const saveBtn = document.querySelector("#saveBtn");
const studentForm = document.querySelector("#studentForm");
const modal = bootstrap.Modal.getOrCreateInstance("#exampleModal");
saveBtn.addEventListener("click", async ({target}) => {
  const fd = new FormData(studentForm);
  const formDate =  Array.from(fd).reduce((acc, [key, val]) => {
      acc[key] = val;
      return acc;
    },{})
  const id = target.dataset.id
  if (id) {
    formDate.id = id
    const res = await axios.put("/student/update", formDate);
    toastr.success(res.data.message);
  } else {
    const res = await axios.post("/student/add", formDate);
    toastr.success(res.data.message);
  }

  modal.hide();
  render();
});

//关闭，保存和重置清空表单
const addStudent = document.querySelector("#addStudent");
addStudent.addEventListener("click", () => {
  delete saveBtn.dataset.id;
  updateModalText("录入新学员", "确认添加");
  clearForm();
});
const restBtn = document.querySelector("#restBtn");
restBtn.addEventListener("click", clearForm);
function clearForm() {
  studentForm.reset();
}

//修改弹窗
tbody.addEventListener("click", modifyStudent);
function modifyStudent({ target }) {
  const { type,id } = target.dataset;
  if (type === "modify") {
    modal.show();
    clearForm();
    updateModalText("修改学员", "保存修改");
    backfillStudent(id);
    modifyBtnId(id);
  }
}
function updateModalText(title, btn) {
  document.querySelector("#exampleModalLabel").innerText = title;
  saveBtn.innerText = btn;
}
function modifyBtnId(id) {
  const changeBtn = document.querySelector("#saveBtn");
  changeBtn.dataset.id = id;
}
async function backfillStudent(id) {
  const res = await axios.get("/student/one", {
    params: {
      id
    },
  });
  const student = res.data.data;
  console.log(student);
  updateInputText(student);
}
async function updateInputText(student) {
  const inputs = studentForm.querySelectorAll("[name]");
  for (const input of inputs) {
    const name = input.getAttribute("name");
    if (name in student && name !== "sex") {
      input.value = student[name];
    }
  }
  /*
 //tch的选择单选框
 const radios = studentForm.querySelectorAll('input[type=radio]')
  const radio = [...radios].find(radio => radio.value === student.sex)
  radio.checked = true */
  // updateSex("sex", student.sex);
  updateSelect("group", student.group);
  updateSelect("province", student.province);
  await renderCity(student.province);
  await renderArea(student.province, student.city);
  updateSelect("city", student.city);
  updateSelect("county", student.county);
}
function updateSex(name, value) {
  const radioList = document.querySelectorAll(`input[name=${name}]`);
  radioList.forEach((radio) => {
    if (radio.value === value) {
      radio.checked = true;
    } else {
      radio.checked = false;
    }
  });
}
function updateSelect(name, value) {
  const select = document.querySelector(`select[name=${name}]`);
  const options = select.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === value) {
      select.selectedIndex = i;
      break;
    }
  }
}
