const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

myForm.addEventListener("submit", onSubmit);
let user = 1;
function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === "" || !emailInput.value.includes("@")) {
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";

    setTimeout(() => msg.remove(), 3000);
  } else {
    const li = document.createElement("li");

    li.appendChild(
      document.createTextNode(`${nameInput.value}: ${emailInput.value}`)
    );

    const userData = JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
    });

    // Append to ul
    userList.appendChild(li);
    localStorage.setItem(`User${user}`, userData);
    user++;
    nameInput.value = "";
    emailInput.value = "";
  }
}
