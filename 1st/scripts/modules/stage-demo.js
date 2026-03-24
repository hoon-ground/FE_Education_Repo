import { stages } from "../data/stages.js";

export function initStageDemo() {
  const htmlCode = document.getElementById("html-code");
  const cssCode = document.getElementById("css-code");
  const jsCode = document.getElementById("js-code");
  const stageTitle = document.getElementById("stage-title");
  const stageDescription = document.getElementById("stage-description");
  const demoPreview = document.getElementById("demo-preview");
  const stageButtons = document.querySelectorAll(".stage-btn");

  if (
    !htmlCode ||
    !cssCode ||
    !jsCode ||
    !stageTitle ||
    !stageDescription ||
    !demoPreview ||
    !stageButtons.length
  ) {
    return;
  }

  function bindDemoEvents(stage) {
    if (stage !== 3) return;

    const button = document.getElementById("demo-like-btn");
    const text = document.getElementById("demo-like-text");
    const status = document.getElementById("demo-status");
    let liked = false;

    if (button && text && status) {
      button.addEventListener("click", () => {
        liked = !liked;
        text.textContent = liked ? "좋아요 121개" : "좋아요 120개";
        status.textContent = liked
          ? "JavaScript가 DOM의 텍스트를 바꿨습니다."
          : "다시 누르면 원래 상태로 돌아갑니다.";
        button.textContent = liked ? "좋아요 취소" : "좋아요";
      });
    }
  }

  function renderStage(stage) {
    const current = stages[stage];
    if (!current) return;

    htmlCode.textContent = current.html;
    cssCode.textContent = current.css;
    jsCode.textContent = current.js;
    stageTitle.textContent = current.title;
    stageDescription.textContent = current.description;
    demoPreview.innerHTML = current.preview;

    stageButtons.forEach((button) => {
      button.classList.toggle("active", Number(button.dataset.stage) === stage);
    });

    bindDemoEvents(stage);
  }

  stageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderStage(Number(button.dataset.stage));
    });
  });

  renderStage(1);
}
