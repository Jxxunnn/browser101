"use strict";

const target = document.querySelector(".target");
const tag = document.querySelector(".tag");
const vertical = document.querySelector(".vertical");
const horizontal = document.querySelector(".horizontal");

document.addEventListener("mousemove", (event) => {
  const x = event.clientX;
  const y = event.clientY;

  vertical.style.left = `${x}px`;
  horizontal.style.top = `${y}px`;

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  tag.style.left = `${x}px`;
  tag.style.top = `${y}px`;
  tag.innerHTML = `${x}px, ${y}px`;

  aim.style.left = event.pageX - aim.offsetWidth / 2 + "px";
  aim.style.top = event.pageY - aim.offsetHeight / 2 + "px";

  vertical.style.left = event.pageX - aim.offsetWidth / 2 + 100 + "px";
  horizontal.style.top = event.pageY - aim.offsetHeight / -50 + "px";

  coordinate.innerHTML = `x: ${event.pageX - aim.offsetWidth / 2}px, y: ${
    event.pageY - aim.offsetHeight / 2
  }px`;
});
