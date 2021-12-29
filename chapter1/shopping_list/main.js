"use strict";

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input')
const addBtn = document.querySelector('footer__button')

function onAdd() {
  const newItem = input.ariaValueMax;

}

// 1. 사용자가 입력한
// 1.사용자가 입력한 텍스트를 받아옴
// 1.사용자가 입력한 텍스트를 받아옴
// 2.새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
// 3. ITEMS 컨테이너 안에 새로 만든 아이템을 추가한다.
// 4. 인풋을 초기화 한다.
// 5.인풋을 초기호하ㅏㄴ다


buttonAdd.addEventListener("click", () => {
  paintList();
});

function paintList(new) {
  const item = prompt();
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = `${item}`;
  const button = document.createElement("button");
  button.innerHTML = `<i class="fas fa-trash>`;
  li.appendChild(span);
  li.appendChild(button);
  ul.appendChild(li);

  button.addEventListener("click", deleteList);
}

function deleteList(e) {
  const li = e.target.parentElement.parentElement;
  li.remove();
}
