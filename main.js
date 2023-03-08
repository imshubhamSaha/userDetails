const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

//helper
const helper = {
  type: "post",
  UserName: null,
  userEmail: null,
  _id: null,
};

// Functions
const showOnUI = function (obj, id) {
  const li = document.createElement("li");
  li.id = !id ? obj._id : id;
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
};

const onSubmit = function (e) {
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
    if (helper.type === "post") {
      axios
        .post(
          "https://crudcrud.com/api/bfdd7fc07ddd4564a61cbe6276b85ce1/bookingdata",
          userData
        )
        .then((response) => {
          showOnUI(response.data);
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
    } else {
      axios
        .put(
          `https://crudcrud.com/api/bfdd7fc07ddd4564a61cbe6276b85ce1/bookingdata/${helper._id}`,
          userData
        )
        .then((response) => {
          // console.log(response);
          showOnUI(userData, helper._id);
          nameInput.value = "";
          emailInput.value = "";
          helper.type = "post";
          helper._id = null;
          helper.UserName = null;
          helper.userEmail = null;
        })
        .catch((err) => {
          console.error(err);
          msg.classList.add("error");
          msg.innerHTML = "Something Went wrong";
          setTimeout(() => {
            msg.remove();
          }, 3000);
          showOnUI(helper);
          helper.type = "post";
          helper._id = null;
          helper.UserName = null;
          helper.userEmail = null;
        });
    }
  }
};

const removeItem = function (e) {
  if (e.target.classList.contains("delBtn")) {
    if (confirm("Are You Sure?")) {
      const li = e.target.parentElement;
      axios
        .delete(
          `https://crudcrud.com/api/bfdd7fc07ddd4564a61cbe6276b85ce1/bookingdata/${li.id}`
        )
        .then((response) => {
          // console.log(response);
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
};

const editItem = function (e) {
  if (e.target.classList.contains("editBtn")) {
    const li = e.target.parentElement;
    helper.type = "edit";
    helper._id = li.id;
    helper.UserName = e.target.parentElement.childNodes[0].nodeValue.replace(
      ":",
      ""
    );
    helper.userEmail = e.target.parentElement.childNodes[1].nodeValue.replace(
      " ",
      ""
    );
    userList.removeChild(li);
    nameInput.value = e.target.parentElement.childNodes[0].nodeValue.replace(
      ":",
      ""
    );
    emailInput.value = e.target.parentElement.childNodes[1].nodeValue.replace(
      " ",
      ""
    );
  }
};

const getData = function () {
  axios
    .get(
      "https://crudcrud.com/api/bfdd7fc07ddd4564a61cbe6276b85ce1/bookingdata"
    )
    .then((response) => {
      // console.log(response);
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
};

// Events
myForm.addEventListener("submit", onSubmit);
userList.addEventListener("click", removeItem);
userList.addEventListener("click", editItem);
window.addEventListener("DOMContentLoaded", getData);
