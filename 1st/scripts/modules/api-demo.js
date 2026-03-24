export function initApiDemo() {
  const apiGetBtn = document.getElementById("api-get-btn");
  const apiPostBtn = document.getElementById("api-post-btn");
  const apiRequestBox = document.getElementById("api-request-box");
  const apiResponseBox = document.getElementById("api-response-box");
  const apiCodeBox = document.getElementById("api-code-box");
  const apiUrlBar = document.getElementById("api-url-bar");
  const apiStatus = document.getElementById("api-status");
  const requestMethodChip = document.getElementById("request-method-chip");
  const responseMethodChip = document.getElementById("response-method-chip");
  const apiSteps = document.querySelectorAll(".api-step");

  if (
    !apiGetBtn ||
    !apiPostBtn ||
    !apiRequestBox ||
    !apiResponseBox ||
    !apiCodeBox ||
    !apiUrlBar ||
    !apiStatus ||
    !requestMethodChip ||
    !responseMethodChip ||
    !apiSteps.length
  ) {
    return;
  }

  function setApiStatus(mode, text) {
    apiStatus.className = `api-status ${mode}`;
    apiStatus.innerHTML = text;
  }

  function setApiStep(stepNumber) {
    apiSteps.forEach((step) => {
      step.classList.toggle(
        "active",
        Number(step.dataset.apiStep) <= stepNumber,
      );
    });
  }

  function setMethodChip(element, type) {
    element.className = `api-chip ${type}`;
    element.textContent = type.toUpperCase();
  }

  async function runApiDemo(type) {
    const isGet = type === "get";
    const url = isGet
      ? "https://jsonplaceholder.typicode.com/posts/1"
      : "https://jsonplaceholder.typicode.com/posts";

    const requestBody = isGet
      ? null
      : {
          postId: 42,
          userId: 7,
          action: "like",
        };

    apiUrlBar.textContent = `${isGet ? "GET" : "POST"} ${url}`;
    setMethodChip(requestMethodChip, isGet ? "get" : "post");
    setMethodChip(responseMethodChip, isGet ? "get" : "post");
    setApiStatus("loading", '<span class="spin"></span> 요청 중');
    setApiStep(1);

    apiRequestBox.textContent = isGet
      ? `{
  "method": "GET",
  "url": "${url}"
}`
      : `{
  "method": "POST",
  "url": "${url}",
  "headers": {
    "Content-Type": "application/json; charset=UTF-8"
  },
  "body": ${JSON.stringify(requestBody, null, 2)}
}`;

    apiResponseBox.textContent = "서버 응답을 기다리는 중...";

    apiCodeBox.textContent = isGet
      ? `fetch("${url}")
  .then((response) => response.json())
  .then((data) => console.log(data));`
      : `fetch("${url}", {
  method: "POST",
  body: JSON.stringify({
    postId: 42,
    userId: 7,
    action: "like",
  }),
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data));`;

    setTimeout(() => setApiStep(2), 280);

    try {
      const response = await fetch(url, {
        method: isGet ? "GET" : "POST",
        headers: isGet
          ? undefined
          : {
              "Content-Type": "application/json; charset=UTF-8",
            },
        body: isGet ? undefined : JSON.stringify(requestBody),
      });

      const data = await response.json();
      setApiStep(3);
      setApiStatus("success", `성공 · ${response.status}`);

      apiResponseBox.textContent = JSON.stringify(
        {
          status: response.status,
          ok: response.ok,
          data,
        },
        null,
        2,
      );
    } catch (error) {
      setApiStatus("error", "오류 발생");
      apiResponseBox.textContent = JSON.stringify(
        {
          message: "요청에 실패했습니다.",
          detail: error.message,
        },
        null,
        2,
      );
    }
  }

  apiGetBtn.addEventListener("click", () => runApiDemo("get"));
  apiPostBtn.addEventListener("click", () => runApiDemo("post"));
}
