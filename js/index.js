const form = document.getElementById("form");
const button = document.getElementById("button");
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const age = document.getElementById("age");
const nationality = document.getElementById("nationality");
const image = document.getElementById("image");
const wrapper = document.getElementById("wrapper");

function validate() {
  if (name.value.length < 3) {
    alert("3 ta xarifdan kop bolishi kerak");
    name.focus();
    name.style.outlineColor = "red";
    return false;
  }

  if (surname.value.length < 3) {
    alert("3 ta xarifdan kop bolishi kerak.");
    surname.focus();
    surname.style.outlineColor = "red";
    return false;
  }

  if (!age || age > 150 || age < 0) {
    alert("togri yosh kiriting");
    age.focus();
    age.style.outlineColor = "red";
    return false;
  }
  if (!image.value.startsWith("https://")) {
    alert("rasim linkini joylang");
    image.focus();
    image.style.outlineColor = "red";
    return false;
  }
  return true;
}
function getUser() {
  let users = [];
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  return users;
}

button &&
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const inValid = validate();
    if (!inValid) {
      return;
    }
    let users = getUser();
    let user = {
      name: name.value,
      surname: surname.value,
      age: age.value,
      image: image.value,
      nationality: nationality.value,
      id: Date.now(),
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    let card = createCard(user);
    wrapper.innerHTML += card;
  });

function createCard(user) {
  return `
          <div class="cart">
            <img src="${user.image}" alt="">
            <h3>${user.name + " " + user.surname}</h3>
            <p>${user.age}</p>
            <p>${user.nationality}</p>
            <button data-id ="${user.id}>edit</button>
            <button class="delete" data-id ="${user.id}>delete</button>
        </div>
`;
}
document.addEventListener("DOMContentLoaded", function () {
  let users = getUser();
  users.length > 0 &&
    users.forEach((element) => {
      let card = createCard(element);
      wrapper.innerHTML += card;
    });

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.length > 0 && deleteButtons.forEach(function (element) {
      element.addEventListener('click', function (event) {
        event.preventDefault();
        let id = this.getAttribute('data-id');
        let isDelete = confirm("ochirmoqchimisiz");
        if (isDelete && id) {
          let copiedUsers = JSON.parse(JSON.stringify(users));
          copiedUsers = copiedUsers.filter(function (el) {
            return el.id != id
          })
          localStorage.setItem("users", JSON.stringify(copiedUsers));
          window.location.reload();
        }
      });
    });
});
