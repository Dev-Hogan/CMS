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
                ${student.score
                  .map(
                    (score, index) =>
                      `<td class="student-score" data-id="${id}" data-batch="${index+1}" >${
                        score === null ? "暂无数据" : score
                      }</td>`
                  )
                  .join("")}
            </tr>`;
    }
    tbody.innerHTML = html;
}
//初次渲染
render()

//双击显示可以修改分数
tbody.addEventListener('dblclick', e => {
    const target = e.target
    if (target.classList.contains('student-score')) {
        const input = document.createElement('input')
        input.value = target.textContent
        target.append(input)
        input.focus()

        //失去焦点
        input.onblur = () => input.remove()
        input.onkeyup = async (e) => {
            const td = input.parentElement
            console.log(td.dataset.id);
            if (e.key === 'Enter') {
                const res = await axios.post("/score/entry", {
                    stu_id: td.dataset.id,
                    batch: td.dataset.batch,
                    score: +input.value
                })
                console.log(res);
                toastr.success(res.data.message)
                render()
            }
        }
    }
})