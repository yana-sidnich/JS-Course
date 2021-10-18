let count = 0;
let countEl = document.getElementById("count-el");
console.log(countEl);

let saveEl = document.getElementById("save-el");

function increment() {
  count++;
  console.log(count);
  countEl.textContent = count;
}

function save() {
  let message = " " + count + " - ";
  console.log(message);
  saveEl.textContent += message;
  count = 0;
  countEl.textContent = count;
}
