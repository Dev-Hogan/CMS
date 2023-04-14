//获取成绩列表渲染
const tbody = document.querySelector("tbody");
async function render () {
    const res = await axios.get("/score/list")
    const Date = res.data.data
    console.log(Date,typeof Date);
    let html = ''
    for (const [id, student] of Object.entries(Date)) {
      html += `<tr>
                <th scope="row">${id}</th>
                <td>${student.name}</td>
                ${student.score.map((score) => `<td class="student-score" >${score===null?'-':score}</td>`).join("")}
            </tr>`;
    }
    tbody.innerHTML = html;
}
//初次渲染
render()