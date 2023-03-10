const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

myForm.addEventListener("submit", onSubmit);
userList.addEventListener("click", removeItem);
userList.addEventListener("click", editItem);

function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === "" || !emailInput.value.includes("@")) {
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";

    setTimeout(() => msg.remove(), 3000);
  } else {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const edit = document.createElement("button");

    li.appendChild(document.createTextNode(`${nameInput.value} :`));
    li.appendChild(document.createTextNode(` ${emailInput.value}`));

    btn.appendChild(document.createTextNode("Delete"));
    btn.classList.add("delBtn");
    edit.appendChild(document.createTextNode("Edit"));
    edit.classList.add("editBtn");

    const userData = JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
    });
    li.appendChild(btn);
    li.appendChild(edit);
    // Append to ul
    userList.appendChild(li);
    localStorage.setItem(`${emailInput.value}`, userData);
    nameInput.value = "";
    emailInput.value = "";
  }
}

function removeItem(e) {
  if (e.target.classList.contains("delBtn")) {
    if (confirm("Are You Sure?")) {
      console.log(e.target.parentElement.childNodes);
      const key = e.target.parentElement.childNodes[1].nodeValue.trim();
      const li = e.target.parentElement;
      userList.removeChild(li);
      localStorage.removeItem(`${key}`);
    }
  }
}

function editItem(e) {
  if (e.target.classList.contains("editBtn")) {
    console.log(e.target.parentElement.childNodes);
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
