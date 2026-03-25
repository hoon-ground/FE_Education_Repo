export const stages = {
  1: {
    title: "1단계: HTML만 있으면 구조는 보인다",
    description:
      "HTML만 작성해도 제목, 문장, 버튼 같은 구조는 브라우저에 나타난다. 다만 아직 꾸밈도 없고, 클릭해도 특별한 동작은 없다.",
    html: `<section class="post">
  <h3>인스타그램 게시물</h3>
  <p>좋아요 120개</p>
  <button>좋아요</button>
</section>`,
    css: `/* 아직 스타일 없음 */`,
    js: `// 아직 동작 없음`,
    preview: `
            <div class="demo-card basic">
              <div class="demo-avatar"></div>
              <h3 class="text-lg font-bold mb-2">인스타그램 게시물</h3>
              <p class="text-sm text-gray-600">좋아요 120개</p>
              <button class="demo-button basic" disabled>좋아요</button>
            </div>
          `,
  },
  2: {
    title: "2단계: CSS를 더하면 보기 좋은 화면이 된다",
    description:
      "같은 HTML 구조라도 CSS를 더하면 색상, 여백, 배치가 생기면서 서비스처럼 보이기 시작한다. 즉 CSS는 '무엇을 보여줄지'가 아니라 '어떻게 보일지'를 담당한다.",
    html: `<section class="post">
  <h3>인스타그램 게시물</h3>
  <p>좋아요 120개</p>
  <button>좋아요</button>
</section>`,
    css: `.post {
  padding: 20px;
  border-radius: 16px;
  background: #eff6ff;
}

button {
  background: #2563eb;
  color: white;
  border: none;
}`,
    js: `// 아직 동작 없음`,
    preview: `
            <div class="demo-card styled">
              <div class="demo-avatar"></div>
              <h3 class="text-lg font-bold mb-2">인스타그램 게시물</h3>
              <p class="text-sm text-gray-600">좋아요 120개</p>
              <button class="demo-button styled" disabled>좋아요</button>
            </div>
          `,
  },
  3: {
    title: "3단계: JavaScript를 더하면 사용자의 행동에 반응한다",
    description:
      "이제 버튼 클릭이라는 이벤트를 받아서 숫자를 바꾸고 문구를 바꾼다. 여기서부터 '정적인 문서'가 아니라 '상호작용하는 서비스'가 된다.",
    html: `<section class="post">
  <h3 id="postTitle">인스타그램 게시물</h3>
  <p id="likeText">좋아요 120개</p>
  <button id="likeBtn">좋아요</button>
</section>`,
    css: `.post {
  padding: 20px;
  border-radius: 16px;
  background: #eff6ff;
}

button {
  background: #2563eb;
  color: white;
}`,
    js: `const btn = document.querySelector("#likeBtn");
const text = document.querySelector("#likeText");

btn.addEventListener("click", () => {
  text.textContent = "좋아요 121개";
});`,
    preview: `
            <div class="demo-card styled">
              <div class="demo-avatar"></div>
              <h3 class="text-lg font-bold mb-2" id="demo-title">인스타그램 게시물</h3>
              <p class="text-sm text-gray-600" id="demo-like-text">좋아요 120개</p>
              <p class="text-xs text-blue-700 font-semibold mt-2" id="demo-status">버튼을 눌러보세요.</p>
              <button class="demo-button styled" id="demo-like-btn">좋아요</button>
            </div>
          `,
  },
};
