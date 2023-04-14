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
      (province) => `<option value="${province}" selected>${province}</option>`
    ).join('')
    province.insertAdjacentHTML('beforeend', opt)
}
renderProvince()


