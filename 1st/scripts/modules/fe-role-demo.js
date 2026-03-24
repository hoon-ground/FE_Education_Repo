export function initFeRoleDemo() {
  const likeBtn = document.getElementById("insta-like-btn");
  const resetBtn = document.getElementById("insta-reset-btn");
  const likeCount = document.getElementById("insta-like-count");
  const visualState = document.getElementById("insta-visual-state");
  const bigHeart = document.getElementById("big-heart");
  const requestPacket = document.getElementById("request-packet");
  const responsePacket = document.getElementById("response-packet");
  const networkLane = document.querySelector(".network-lane");
  const processSteps = document.querySelectorAll(".process-step");
  const roleLog = document.getElementById("role-log");

  if (
    !likeBtn ||
    !resetBtn ||
    !likeCount ||
    !visualState ||
    !bigHeart ||
    !requestPacket ||
    !responsePacket ||
    !networkLane ||
    !processSteps.length ||
    !roleLog
  ) {
    return;
  }

  let liked = false;
  let animationTimers = [];
  let animating = false;

  function clearRoleTimers() {
    animationTimers.forEach((timer) => clearTimeout(timer));
    animationTimers = [];
  }

  function setRoleLog(lines) {
    roleLog.innerHTML = lines
      .map(
        (line) => `
          <div class="role-log-line ${line.type}">
            <div class="dot"></div>
            <div>${line.text}</div>
          </div>
        `,
      )
      .join("");
  }

  function activateRoleStep(stepNumber) {
    processSteps.forEach((step) => {
      step.classList.toggle("active", Number(step.dataset.step) === stepNumber);
    });
  }

  function updatePacketTravel() {
    const laneWidth = networkLane.clientWidth ?? 0;
    if (!laneWidth) return;

    const requestTravel = Math.max(
      0,
      laneWidth - requestPacket.offsetWidth - 36,
    );
    const responseTravel = Math.max(
      0,
      laneWidth - responsePacket.offsetWidth - 36,
    );

    requestPacket.style.setProperty("--travel-x", `${requestTravel}px`);
    responsePacket.style.setProperty("--travel-x", `${responseTravel}px`);
  }

  function resetPackets() {
    requestPacket.className = "packet request";
    responsePacket.className = "packet response";
    updatePacketTravel();
  }

  function resetRoleDemo() {
    clearRoleTimers();
    animating = false;
    liked = false;
    likeBtn.classList.remove("liked");
    likeCount.textContent = "좋아요 120개";
    visualState.textContent = "대기 중";
    bigHeart.classList.remove("show");
    processSteps.forEach((step) => step.classList.remove("active"));
    resetPackets();
    setRoleLog([
      {
        type: "fe",
        text: "대기 중입니다. 하트 버튼을 누르면 단계가 순서대로 진행됩니다.",
      },
    ]);
  }

  function playLikeFlow() {
    if (animating || liked) return;
    animating = true;

    const schedule = (delay, callback) => {
      const timer = setTimeout(callback, delay);
      animationTimers.push(timer);
    };

    setRoleLog([{ type: "fe", text: "사용자가 하트 버튼을 클릭했습니다." }]);

    schedule(0, () => {
      activateRoleStep(1);
      visualState.textContent = "클릭 감지";
    });

    schedule(900, () => {
      activateRoleStep(2);
      visualState.textContent = "요청 전송 중";
      resetPackets();
      requestPacket.classList.add("move-right");
      setRoleLog([
        { type: "fe", text: "1) FE가 클릭 이벤트를 감지했습니다." },
        {
          type: "fe",
          text: "2) FE가 POST /like 요청을 준비해 서버로 보냅니다.",
        },
      ]);
    });

    schedule(2200, () => {
      activateRoleStep(3);
      visualState.textContent = "백엔드 처리 중";
      setRoleLog([
        { type: "fe", text: "1) FE가 클릭 이벤트를 감지했습니다." },
        { type: "fe", text: "2) FE가 POST /like 요청을 서버로 보냈습니다." },
        {
          type: "be",
          text: "3) 백엔드가 사용자/게시물 정보를 확인하고 DB에 좋아요를 반영합니다.",
        },
      ]);
    });

    schedule(3400, () => {
      activateRoleStep(4);
      visualState.textContent = "응답 생성";
      responsePacket.classList.add("move-left");
      setRoleLog([
        { type: "fe", text: "1) FE가 클릭 이벤트를 감지했습니다." },
        { type: "fe", text: "2) FE가 POST /like 요청을 서버로 보냈습니다." },
        { type: "be", text: "3) 백엔드가 DB 반영을 끝냈습니다." },
        {
          type: "be",
          text: "4) 백엔드가 liked=true, likeCount=121 응답을 생성합니다.",
        },
      ]);
    });

    schedule(4700, () => {
      activateRoleStep(5);
      liked = true;
      likeBtn.classList.add("liked");
      likeCount.textContent = "좋아요 121개";
      bigHeart.classList.remove("show");
      void bigHeart.offsetWidth;
      bigHeart.classList.add("show");
      visualState.textContent = "화면 업데이트 완료";
      setRoleLog([
        { type: "fe", text: "1) FE가 클릭 이벤트를 감지했습니다." },
        { type: "fe", text: "2) FE가 서버로 요청을 보냈습니다." },
        { type: "be", text: "3) 백엔드가 DB에 반영했습니다." },
        { type: "be", text: "4) 백엔드가 성공 응답을 보냈습니다." },
        {
          type: "ok",
          text: "5) FE가 응답을 받아 하트 색과 좋아요 수를 화면에 반영했습니다.",
        },
      ]);
    });

    schedule(5600, () => {
      animating = false;
    });
  }

  likeBtn.addEventListener("click", playLikeFlow);
  resetBtn.addEventListener("click", resetRoleDemo);
  window.addEventListener("resize", updatePacketTravel);
  resetRoleDemo();
}
