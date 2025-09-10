const button = document.getElementById("changeColor");

button.addEventListener("click", () => {

  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});
