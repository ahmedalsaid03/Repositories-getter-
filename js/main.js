// select Elements 

let usernameInput = document.getElementById("usernameInput");
let repoInput = document.getElementById("repoInput");
let btn = document.querySelector("button");
let tBody = document.querySelector("tbody");
let info = document.querySelector(".info");




btn.addEventListener("click", getRepos)
function getRepos() {
    clearInputs(); 
    let username = usernameInput.value.trim();  
    let repoFilter = repoInput.value.trim().toLowerCase();

    if (username === "") {
        info.innerHTML = "<p>خطأ، يرجى إدخال اسم مستخدم Github صالح</p>";
        return;
    }


    info.innerHTML = "<p>جاري البحث...</p>";

    fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("لم يتم العثور على المستخدم");
        }
        return response.json();
    })
    .then((data) => {
        clearInputs();

        let filteredRepos = data.filter((repo) => 
            repoFilter === "" || repo.name.toLowerCase().includes(repoFilter)
        );

        if (filteredRepos.length === 0) {
            info.innerHTML = "<p>لم يتم العثور على مستودعات بالاسم المحدد.</p>";
            return;
        }

        let table = document.createElement("table");
        table.classList.add("table","table-bordered")
        table.innerHTML = `<thead><tr> <th class="w-25">Repository Name</th> <th class="w-50">Link</th>`;
        let newTBody = document.createElement("tbody");

        filteredRepos.forEach((repo) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${repo.name}</td>
                <td><a href="${repo.html_url}" target="_blank">${repo.html_url}</a></td>
            `;
            newTBody.appendChild(row);
        });

        table.appendChild(newTBody);
            info.appendChild(table);

    })
    .catch ((error) => {
        clearInputs();
        info.innerHTML = `<p>${error.message}</p>`;
    });
}

function clearInputs(){
    info.innerHTML = "";
}


// btn.addEventListener("click", function () {

//     getRepositories();
// })
// function getRepositories() {
//     clearInputs();
//     let userInput = usernameInput.value.trim();
//     let filterInput = repoInput.value.trim().toLowerCase()

//     if (userInput === "") {
//         info.innerHTML = "<p> يرجى إدخال إسم مستخدم صالح </p>"
//         return
//     }
//     info.innerHTML = "<p> جارى البحث ... </p>"
//     fetch(`https://api.github.com/users/${userInput}/repos`)
//         .then((response) => {
//             if (!response.ok) {
//                 info.innerHTML = "<p>لم يتم العثور على المستخدم</p>"
//                 return;
//             }
//             return response.json();
//         })
//         .then((data) => {
//             let filteredData = data.filter((repo) => {
//               return  filterInput === "" || repo.name.toLowerCase().includes(filterInput)
//             });
//             if (filteredData.length === 0) {
//                 info.innerHTML = "<p>لم يتم العثور على مستودعات بالاسم المحدد.</p>";
//                 return;
//             }

//            let newTable = `<table class="table table-bordered ">
//                         <thead>
//                             <tr>
//                                 <td>User Name</td>
//                                 <td>Repo Link</td>
//                             </tr>
//                         </thead>
//                         <tbody></tbody>
//                     </table>`;
//                     info.innerHTML = newTable;
//            let tBody = info.querySelector("tbody");
//             let result = "";
//             filteredData.forEach((repo)=>{
//                 result += `<tr>
//                         <td>${repo.name}</td>
//                         <td><a href=${repo.html_url} target="_blank">${repo.html_url}</a></td>
//                     </tr>`
//             })
//                 tBody.innerHTML = result;
//                 console.log(result)
//         }) 
//         .catch((error) => {
//             info.innerHTML = "<p>حدث خطأ أثناء البحث</p>";
//         });
// }


// function clearInputs() {
//     info.innerHTML = "";
// }