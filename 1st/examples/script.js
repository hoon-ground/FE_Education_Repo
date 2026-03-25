let count = 0;

const button = document.getElementById("likeBtn");
const text = document.getElementById("count");

button.addEventListener("click", () => {
  count++;
  text.textContent = `좋아요 개수: ${count}`;
});
