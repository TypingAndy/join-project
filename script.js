let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";
let signUpData = {};
let responseToJson;



async function postData() {
    console.log('test');
    
  let nameInput = document.getElementById("signUpNameInput").value;
  let mailInput = document.getElementById("signUpMailInput").value;
  let passwordInput = document.getElementById("signUpPasswordInput").value;
  signUpData = { name: nameInput, email: mailInput, password: passwordInput};

  await fetch(BASE_URL + `users/${nameInput}/.json`, {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpData),
  });

  document.getElementById("signUpNameInput").value = "";
  document.getElementById("signUpMailInput").value = "";
  document.getElementById("signUpPasswordInput").value = "";
}




// async function loadData(path = "users") {
//   let response = await fetch(BASE_URL + path + ".json");
//   responseToJson = await response.json();
//   console.log(responseToJson);

//   document.getElementById("dataOutputWrapper").innerHTML = "";

//   if (!responseToJson) {
//     return;
//   } else {
//     Object.entries(responseToJson).forEach(([key, user]) => {
//       dataOutputWrapper.innerHTML += `
//       <div class="data">
//         <div class="name">${user.name}</div>
//         <div class="email">${user.email}</div>
//         <div class="delete" onclick="deleteUser('${key}')">X</div>
//       </div>
//     `;
//     });
//   }
// }


// function deleteUser(userId) {
//   fetch(BASE_URL + `users/${userId}.json`, {
//     method: "DELETE",
//   }).then(() => loadData());
// }

