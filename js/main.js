const addInput = document.querySelector("#add-input");
const addForm = document.querySelector(".add-todo");
const resetBtn = document.querySelector(".reset-btn");
const todoContainer = document.querySelector("#todo-container");
const addInput2 = document.querySelector("#add-input2");
const addInput3 = document.querySelector("#add-input3");
const addInput4 = document.querySelector("#add-input4");
const editInput = document.querySelector("#edit-input");
const editInput2 = document.querySelector("#edit-input2");
const editInput3 = document.querySelector("#edit-input3");
const editInput4 = document.querySelector("#edit-input4");
const editCancel = document.querySelector("#edit-cancel");
const editSubmit = document.querySelector(".edit-submit");
const editModal = document.querySelector("#edit-modal");
const closeModal = document.querySelector("#close-modal");

let API = "http://localhost:3000/contacts";

async function getContact() {
  const res = await fetch(API);
  const data = await res.json();
  return data;
}

async function getOneTodos(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();
  return data;
}
// getContact();
async function addTodo(newContact) {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify(newContact),
    headers: {
      "Content-type": "application/json",
    },
  });
}

async function deleteTodo(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
}

async function editTodo(newData, id) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// let todos = JSON.parse(localStorage.getItem("todos")) || [];
// console.log(todos);

async function tttt() {
  const data = await getContact();
  todoContainer.innerHTML = "";

  data.forEach((item) => {
    todoContainer.innerHTML += `
    <div class="todo-item">
    <span>${item.name}</span>
    <span>${item.surname}</span>
    <span>${item.phone}</span>
    <img class = "image"src="${item.url}" alt="" >
    <div>
      <button id =${item.id} class="edit-btn">Edit</button>
      <button id =${item.id} class="delete-btn">Delete</button>
    </div>
  </div>
        `;
    console.log(item);
  });
}
tttt();

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    !addInput.value.trim() ||
    !addInput2.value.trim() ||
    !addInput3.value.trim() ||
    !addInput4.value.trim()
  ) {
    alert("Заполни поля");
    return;
  }
  const contact = {
    name: addInput.value,
    surname: addInput2.value,
    phone: addInput3.value,
    url: addInput4.value,
  };

  await addTodo(contact);

  addInput.value = "";
  addInput2.value = "";
  addInput3.value = "";
  addInput4.value = "";
  tttt();
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    await deleteTodo(e.target.id);
  }
  tttt();
});
let id = null;

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";
    const contact = await getOneTodos(e.target.id);
    editInput.focus();

    id = e.target.id;
    editInput.value = contact.name;
    editInput2.value = contact.surname;
    editInput3.value = contact.phone;
    editInput4.value = contact.url;
  }
});

function Close() {
  editModal.style.visibility = "hidden";
}

closeModal.addEventListener("click", Close());

editCancel.addEventListener("click", Close());

editSubmit.addEventListener("click", async (e) => {
  if (
    !editInput.value.trim() ||
    !editInput2.value.trim() ||
    !editInput3.value.trim() ||
    !editInput4.value.trim()
  ) {
    return;
  }

  const newContact = {
    name: editInput.value,
    surname: editInput2.value,
    phone: editInput3.value,
    url: editInput4.value,
  };
  await editTodo(newContact, id);
  tttt();
  Close();

  editCancel.click();
});
