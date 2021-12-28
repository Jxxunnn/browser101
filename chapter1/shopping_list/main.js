"use strict";

const main = document.querySelector(".main");
const buttonAdd = document.querySelector(".button__add");
const ul = document.querySelector(".main__list");

buttonAdd.addEventListener("click", () => {
  paintList();
});

function paintList() {
  const item = prompt();
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = `${item}`;
  const button = document.createElement("button");
  button.innerHTML = `<i class="fas fa-trash">`;
  li.appendChild(span);
  li.appendChild(button);
  ul.appendChild(li);

  button.addEventListener("click", deleteList);
}

function deleteList(e) {
  const li = e.target.parentElement.parentElement;
  li.remove();
}
