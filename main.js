const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

myForm.addEventListener("submit", onSubmit);
userList.addEventListener("click", removeItem);
userList.addEventListener("click", editItem);
window.addEventListener("DOMContentLoaded", getData);

function onSubmit(e) {
  e.preventDefault();
  if (nameInput.value === "" || !emailInput.value.includes("@")) {
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";

    setTimeout(() => msg.remove(), 3000);
  } else {
    const UserName = nameInput.value;
    const userEmail = emailInput.value;
    const userData = {
      UserName,
      userEmail,
    };

    axios
      .post(
        "https://crudcrud.com/api/9e837c7becf445caa946637186238fbd/bookingdata",
        userData
      )
      .then((response) => {
        showOnUI(response.data);
        // console.log(response);
      })
      .catch((err) => {
        console.error(err);
        msg.classList.add("error");
        msg.innerHTML = "Something Went wrong";

        setTimeout(() => {
          msg.remove();
          nameInput.value = "";
          emailInput.value = "";
        }, 3000);
      });
    // showOnUI(userData);
    // uploadLocalStore(userData);
  }
}

function removeItem(e) {
  if (e.target.classList.contains("delBtn")) {
    if (confirm("Are You Sure?")) {
      // console.log(e.target.parentElement.childNodes);
      // const key = e.target.parentElement.childNodes[1].nodeValue.trim();
      // const li = e.target.parentElement;
      // userList.removeChild(li);
      // localStorage.removeItem(`${key}`);
      const li = e.target.parentElement;
      axios
        .delete(
          `https://crudcrud.com/api/9e837c7becf445caa946637186238fbd/bookingdata/${li.id}`
        )
        .then((response) => {
          console.log(response);
          userList.removeChild(li);
        })
        .catch((err) => {
          console.error(err);
          msg.classList.add("error");
          msg.innerHTML = "Something Went wrong";
          setTimeout(() => {
            msg.remove();
          }, 3000);
        });
    }
  }
}

function editItem(e) {
  if (e.target.classList.contains("editBtn")) {
    // console.log(e.target.parentElement.childNodes);
    const key = e.target.parentElement.childNodes[1].nodeValue.trim();
    const li = e.target.parentElement;
    userList.removeChild(li);
    localStorage.removeItem(`${key}`);
    nameInput.value = e.target.parentElement.childNodes[0].nodeValue.replace(
      ":",
      ""
    );
    emailInput.value = e.target.parentElement.childNodes[1].nodeValue.replace(
      " ",
      ""
    );
  }
}

function showOnUI(obj) {
  const li = document.createElement("li");
  li.id = obj._id;
  const btn = document.createElement("button");
  const edit = document.createElement("button");

  li.appendChild(document.createTextNode(`${obj.UserName} :`));
  li.appendChild(document.createTextNode(` ${obj.userEmail}`));

  btn.appendChild(document.createTextNode("Delete"));
  btn.classList.add("delBtn");
  edit.appendChild(document.createTextNode("Edit"));
  edit.classList.add("editBtn");
  li.appendChild(btn);
  li.appendChild(edit);
  // Append to ul
  userList.appendChild(li);
  nameInput.value = "";
  emailInput.value = "";
}

// function uploadLocalStore(obj) {
//   localStorage.setItem(`${obj.userEmail}`, JSON.stringify(obj));
//   nameInput.value = "";
//   emailInput.value = "";
// }

function getData() {
  // const localStorageobj = localStorage;
  // const localStorageKeys = Object.keys(localStorageobj);
  // for (let i = 0; i < localStorageKeys.length; i++) {
  //   const key = localStorageKeys[i];
  //   const userDetailsJson = localStorageobj[key];
  //   const userDetailsObj = JSON.parse(userDetailsJson);
  //   showOnUI(userDetailsObj);
  // }
  axios
    .get(
      "https://crudcrud.com/api/9e837c7becf445caa946637186238fbd/bookingdata"
    )
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        showOnUI(response.data[i]);
      }
    })
    .catch((err) => {
      console.error(err);
      msg.classList.add("error");
      msg.innerHTML = "Something Went wrong";
      setTimeout(() => {
        msg.remove();
      }, 3000);
    });
}
