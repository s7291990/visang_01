import {
  setCommonRoot,
  autoScale,
  scale,
  fullScreenChangeHandler,
} from "./common.js";
import anime from "./anime.js";
import { SetAriaLabel, SetTabIndex } from "./UDLController.js";
import {MainEvent} from "../../remote/js/Activity/MainEvent.js";

var metaUrl = import.meta.url;
var root = null;

window.addEventListener("script-loaded", function (ev) {
  if (root) return;
  const u = new URL(metaUrl);
  const param = u.searchParams.get("embed-unique");

  if (param && param !== ev.detail.unique) return;

  const shadowRoot = ev.detail.root; // 커스텀 이벤트에 담겨진 shadowRoot 객체
  root = shadowRoot;

  SetTabIndex(ev.detail.root);

  setTimeout(() => {
    this.tenThousandTabIndex = root.querySelector("#string_number_5").tabIndex;
    this.thousandTabIndex = root.querySelector("#string_number_4").tabIndex;
    this.hundredTabIndex = root.querySelector("#string_number_3").tabIndex;
    this.tenTabIndex = root.querySelector("#string_number_2").tabIndex;
    this.oneTabIndex = root.querySelector("#string_number_1").tabIndex;

    root.querySelector("#reset_btn").click();
  }, 100);

  setCommonRoot(root, {});

  var url = root
    .querySelector(".ukp__js_wrap_font")
    .getAttribute("href")
    .replace("/font.css", "");
  var style = document.createElement("style");
  style.textContent = `
      @font-face {
          font-family: "Malgun Gothic";
          src: url('${url}/malgunsl.woff2') format("woff2");
          src: url('${url}/malgunsl.woff') format("woff");
          font-weight: 300;
      }

      @font-face {
          font-family: "Malgun Gothic";
          src: url('${url}/malgun.woff2') format("woff2");
          src: url('${url}/malgun.woff') format("woff");
          font-weight: 400;
      }

      @font-face {
          font-family: "Malgun Gothic";
          src: url('${url}/malgunbd.woff2') format("woff2");
          src: url('${url}/malgunbd.woff') format("woff");
          font-weight: 700;
      }

      @font-face {
          font-family: "Batang";
          src: url('${url}/batang.woff2') format("woff2");
          src: url('${url}/batang.woff') format("woff");
      }
  `;
  document.body.appendChild(style);

  window.addEventListener("resize", function () {
    autoScale();
  });
  autoScale();

  let guideHandAnimation;
  let isResetClicked = false;
  let isFail = false;
  const guideHand = root.querySelector("#guide_hand");

  const setGuideHandAnimation = () => {
    guideHand.style.zIndex = 100;
    guideHandAnimation = anime({
      targets: guideHand,
      opacity: [1, 0],
      loop: 3,
      duration: 1000,
      easing: "easeInOutQuad",
      update: () => {
        if (keyboard.style.opacity === "1") {
          pauseHandAnimation();
        
        }
      },
      complete: () => {
        setTimeout(() => {
          if (guideHandAnimation) guideHandAnimation.play();
        }, 5000);
      },
    });
    guideHandAnimation.play();
  };
  setGuideHandAnimation();

  const pauseHandAnimation = () => {
    guideHand.style.opacity = 0;
    guideHand.style.zIndex = -999;
    if (guideHandAnimation) {
      guideHandAnimation.pause();
      guideHandAnimation = null;
    }
  };

  const colorPaletteForChipContainer = {
    1: "rgba(250, 123, 159, 0.80)",
    2: "rgba(86, 191, 242, 0.80)",
    3: "rgba(194, 220, 13, 0.80)",
    4: "rgba(255, 163, 46, 0.80)",
    5: "rgba(196, 131, 208, 0.80)",
  };

  const backgroundImage = root.querySelector("#backgroundImage");
  const answerNumbers = root.querySelectorAll(".answer_number");
  answerNumbers.forEach((answerNumber) => {
    answerNumber.addEventListener("click", (event) => {
      event.stopPropagation();
      pauseHandAnimation();
      deactivateMessage();

      // 다른 애니메이션 진행 중일 시 영역 선택 불가
      if (validateAnimation && !validateAnimation.completed) return;

      // 입력 박스 미 완성시 활성화 X
      let idx = 0;
      while (idx < 5) {
        const totalNumber = totalNumbers[idx].querySelector("span").innerHTML;
        if (totalNumber === "") {
          messageContainer.querySelector("#message span").innerHTML =
            "먼저 수 카드를 완성하세요.";
          deactivateKeyboard();
          activateMessage();
          return;
        }
        idx++;
      }

      animateAnswer();

      answerNumber.classList.remove("pencil");

      const unit = answerNumber.dataset.unit;
      if (isNumbersValidated[unit]) return;

      answerNumber.classList.remove("btn");
      answerNumber.classList.remove("pencil");

      const userAnswer = root.querySelector(
        `.total_number[data-unit="${unit}"] span`
      ).innerHTML;

      if (userAnswer === "0") {
        // 값이 0인 경우
        // const box = backgroundImage.querySelector(
        //   `[data-id="answer_number_${unit}"]`
        // );
        // const background = box.querySelector(".background");
        // const line = box.querySelector(".line");
        // answerNumber.classList.remove("active");
        // background.setAttribute("fill", "rgb(230, 233, 240)");
        // line.setAttribute("stroke", "#A1C8EB");
        // return;
      }

      answerNumber.querySelector("span").innerHTML = "";
      root.querySelector(
        `.string_number[data-unit="${answerNumber.dataset.unit}"] span`
      ).innerHTML = "";
      root
        .querySelectorAll(
          `.expanded_number[data-unit="${answerNumber.dataset.unit}"] .expanded_number_chip`
        )
        .forEach((chip) => (chip.style.opacity = 0));

      // activate effect
      answerNumbers.forEach((num) => {
        const box = backgroundImage.querySelector(
          `[data-id="${num.getAttribute("id")}"]`
        );
        const background = box.querySelector(".background");
        const line = box.querySelector(".line");
        if (num === answerNumber) {
          console.log("버튼 활성화")

          num.classList.add("active");
          background.setAttribute("fill", "#FFEBA3");
          line.setAttribute("stroke", "#F50F00");
          line.setAttribute("style", "stroke-width: 8px;");
        } else {
          console.log("버튼 비활성화")

          num.classList.remove("active");
          const userAnswer = root.querySelector(
            `.total_number[data-unit="${num.dataset.unit}"] span`
          ).innerHTML;
          if (
            num.querySelector("span").innerHTML === "" &&
            userAnswer !== "0"
          ) {
            num.classList.add("pencil");
            background.setAttribute("fill", "white");
            line.setAttribute("stroke", "#A1C8EB");
            line.setAttribute("style", "stroke-width: 4px;");
          }
        }
      });
      activateKeyboard(answerNumber.getAttribute('tabindex'));
    });
  });

  const fullScreenBtn = root.querySelector("#full_screen_btn");
  const resetBtn = root.querySelector("#reset_btn");

  const keyboardContainer = root.querySelector("#keyboardContainer");
  const keyboard = keyboardContainer.querySelector("#keyboard");
  const keyPadNums = keyboard.querySelectorAll(".key");

  /**
   * handle number type in events
   */
  const typeInNumberHandler = (number) => {
    pauseHandAnimation();
    const input = root.querySelector(".active");
    if (!input) {
      return;
    }
    const unit = Number(input.dataset.unit);

    // 만의 자리 0 입력 금지
    if (unit === 5 && number === 0) {
      deactivateKeyboard();
      deactivateCurrentBox();
      messageContainer.querySelector("#message span").innerHTML =
        "만의 자리에는 0을 입력할 수 없어요.";
      activateMessage();
      return false;
    }
    if (input.querySelector("span.num").innerHTML !== "") return;
    
    input.querySelector("span.num").innerHTML = number;

    // 상단 카드 숫자
    if (input.classList.contains("total_number")) {
      input.classList.remove("active");
      if (unit > 1) {
        root
          .querySelector(`.total_number[data-unit='${unit - 1}']`)
          .classList.add("active");
      } else {
        deactivateKeyboard();
      }
      const stringNumberBackground = root.querySelector(
        `.string_number_background[data-unit='${unit}']`
      );
      const back = stringNumberBackground.querySelector(".back");
      const front = stringNumberBackground.querySelector(".front");
      // 값이 0인 경우 하단 클릭 박스 바로 회색 처리
      back.setAttribute("fill", !number ? "#BFC7DA" : back.dataset.color);
      front.setAttribute("fill", !number ? "#D5D5D5" : front.dataset.color);
    }
    animateAnswer();
  };

  const animateKeyPadNum = (targets) => {
    targets.style.transformOrigin = "50% 50%";
    anime({
      targets: targets,
      duration: 200,
      scale: [1, 1.2, 1],
      easing: "linear",
      complete: deactivateKeyboard,
    });
  };

  const deactivateCurrentBox = () => {
    console.log("입력 박스 비활성화")
    
    if(isFail) return;

    const input = root.querySelector(`.answer_number.active`);
    if (!input) return true;

    const unit = input.dataset.unit;
    if (isNumbersValidated[unit]) return false;

    input.querySelector("span").innerHTML = "";
    input.querySelector("span").style.opacity = 1;
    const box = backgroundImage.querySelector(
      `[data-id="answer_number_${unit}"]`
    );
    const background = box.querySelector(".background");
    const line = box.querySelector(".line");
    box.style.opacity = 1;

    input.classList.remove("active");
    background.setAttribute("fill", "white");
    line.setAttribute("stroke", "#A1C8EB");
    line.setAttribute("style", "stroke-width: 4;");

    input.classList.add("pencil");
    input.classList.add("btn");
  };

  let keyboardAnimation;

  const validateAnswer = (unit) => {
    const answer = root.querySelector(`.answer_number.active`);
    const expandedAnswer = root.querySelector(
      `.total_number[data-unit='${unit}']`
    );

    /// UDL 번역
    if(expandedAnswer.querySelector("span").children[0]) {
      return (
        answer.querySelector("span").innerHTML ===
        expandedAnswer.querySelector("span").children[0].children[0].innerHTML
      );
    }

    return (
      answer.querySelector("span").innerHTML ===
      expandedAnswer.querySelector("span").innerHTML
    );
  };

  const activateKeyboard = (num) => {
    keyboardContainer.style.display = "flex";
    keyboardAnimation = anime({
      targets: keyboard,
      duration: 1,
      opacity: [0, 1],
      easing: "easeInQuad",
    });

    keyPadNums.forEach((element) => {
      element.setAttribute("tabindex", num);
    })
  };

  const deactivateKeyboard = () => {
    if (Number(keyboard.style.opacity)) {
      keyboardAnimation = anime({
        targets: keyboard,
        duration: 1,
        opacity: [1, 0],
        easing: "easeInQuad",
        complete: () => {
          keyboardContainer.style.display = "none";
        },
      });
    }
  };

  // web / mobile key click event
  keyPadNums.forEach((key) => {
    key.addEventListener("click", (event) => {
      event.stopPropagation();
      const value = Number(key.dataset.value);
      animateKeyPadNum(key);
      typeInNumberHandler(value);
      deactivateKeyboard();
    });
  });

  // web number keypress event
  document.addEventListener("keypress", (event) => {
    const key = Number(event.key);
    if (!isNaN(key)) {
      typeInNumberHandler(key);
    }
    deactivateKeyboard();
  });

  const totalNumberContainer = root.querySelector("#total_number_container");
  const totalNumbers = totalNumberContainer.querySelectorAll(".total_number");

  /**
   * outside click
   */
  root.addEventListener("click", (event) => {
    pauseHandAnimation();
    [
      keyboard,
      resetCardBtn,
      guideHand,
      totalNumberContainer,
      stringNumberContainer,
      ...totalNumbers,
      // ...stringNumbers,
      ...visibilities,
      ...answerNumbers,
    ].map((node) => {
      return node.contains(event.target);
    });
    deactivateKeyboard();
    deactivateCurrentBox();
    toggleResetCardPopupDisplay("none");
  });

  let validateAnimation;

  let isNumbersValidated = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  };
  let isNumberValidated = false;
  const messageContainer = root.querySelector("#messageContainer");

  const deactivateMessage = () => {
    messageContainer.style.display = "none";
  };

  const activateMessage = () => {
    messageContainer.style.display = "block";
    validateAnimation = anime({
      targets: messageContainer,
      duration: 2200,
      opacity: [0, 1, 1, 1, 1, 0],
      easing: "easeInQuad",
      complete: deactivateMessage,
    });
  };

  const animateAnswer = () => {
    const activeDigit = root.querySelector(`.answer_number.active`);
    if (!activeDigit)return true;
    const unit = activeDigit.dataset.unit;

    if (isNumbersValidated[unit]) return true;
    const chips = Array.from(
      root.querySelectorAll(
        `.expanded_number[data-unit='${unit}'] .expanded_number_chip`
      )
    );
    if (validateAnswer(unit)) {
      console.log("정답")
      
      const mainEvent = new MainEvent();
      mainEvent.SetChapter1Active(unit, true);
      // MainEvent.SetChapter1Active(unit, true);

      isFail = false;
      isNumbersValidated[unit] = true;
      // correct answer
      const box = backgroundImage.querySelector(
        `[data-id="answer_number_${unit}"]`
      );
      const background = box.querySelector(".background");
      const line = box.querySelector(".line");
      const answer = root.querySelector(`.answer_number.active span`).innerHTML;

      background.setAttribute("fill", "white");
      anime({
        targets: line,
        stroke: "#A1C8EB",
        duration: 1200,
        easing: "easeInQuad",
      });
      anime({
        targets: line,
        strokeWidth: "4",
        duration: 1200,
        easing: "easeInQuad",
      });
      isNumbersValidated[unit] = true;
      if (answer !== "0") {
        root
          .querySelector(`.string_number[data-unit='${unit}']`)
          .classList.add("btn");

        const temp = [this.oneTabIndex, this.tenTabIndex, this.hundredTabIndex, this.thousandTabIndex, this.tenThousandTabIndex]
        root.querySelector(`.string_number[data-unit='${unit}']`).tabIndex = temp[unit - 1]
      }
      validateAnimation = anime({
        targets: chips.filter(
          (chip) => Number(chip.dataset.idx) <= Number(answer)
        ),
        duration: 1000,
        opacity: [0, 1],
        easing: "easeInQuad",
        complete: () => {
          if (
            root.querySelector(`.answer_number[data-unit='${unit}'] span`)
              .innerHTML !== ""
          ) {
            guideHand.style.left = "1733px";
            switch (Number(unit)) {
              case 5:
                if (!isResetClicked) {
                  guideHand.style.top = "330px";
                  setGuideHandAnimation();
                }
                break;
              case 4:
                // guideHand.style.top = "450px";
                break;
              case 3:
                // guideHand.style.top = "560px";
                break;
              case 2:
                // guideHand.style.top = "677px";
                break;
              case 2:
                // guideHand.style.top = "787px";
                break;
            }
          }
        },
      });
    } else {
      console.log("실패");
      // wrong answer
      const currentAnswer = root.querySelector(
        `.answer_number.active[data-unit='${unit}'] span`
      );
      if (currentAnswer.innerHTML == "") return true;
      isFail = true;

      validateAnimation = anime({
        targets: root.querySelector(
          `.answer_number.active[data-unit='${unit}'] span`
        ),
        opacity: [1, 0, 1, 0],
        easing: "easeInQuad",
        endDelay: 200,
        complete: () => {
          isFail = false;
          chips.forEach((chip) => (chip.style.opacity = 0));
          // messageContainer.querySelector("#message span").innerHTML =
          //   "다시 한번 생각해 보세요.";
          // activateMessage();
          currentAnswer.innerHTML = "";
          deactivateCurrentBox();
          deactivateKeyboard();
        },
      });
    }
  };

  const stringNumberContainer = root.querySelector("#string_number_container");
  const stringNumbers =
    stringNumberContainer.querySelectorAll(".string_number");
  stringNumbers.forEach((stringNumber, idx) => {
    stringNumber.addEventListener("click", (event) => {
      event.stopPropagation();
      pauseHandAnimation();

      deactivateCurrentBox();
      if (!stringNumber.classList.contains("btn")) {
        return;
      }
      stringNumber.style.opacity = 0;
      stringNumber.classList.remove("btn");
      const unit = Number(stringNumber.dataset.unit);
      const answer = root.querySelector(
        `.answer_number[data-unit='${unit}'] span`
      ).innerHTML;
      let unitString = "";
      let number = "";
      switch (Number(unit)) {
        case 5:
          unitString = "만";
          break;
        case 4:
          unitString = "천";
          break;
        case 3:
          unitString = "백";
          break;
        case 2:
          unitString = "십";
          break;
        default:
          break;
      }
      switch (Number(answer)) {
        case 9:
          number = "구";
          break;
        case 8:
          number = "팔";
          break;
        case 7:
          number = "칠";
          break;
        case 6:
          number = "육";
          break;
        case 5:
          number = "오";
          break;
        case 4:
          number = "사";
          break;
        case 3:
          number = "삼";
          break;
        case 2:
          number = "이";
          break;
        case 1:
          number = "일";
          break;
        default:
          break;
      }
      stringNumber.querySelector("span").innerHTML = `${number}${unitString}`;
      SetAriaLabel(root.querySelector(`#string_number_${5 - idx}`), stringNumber.querySelector("span").innerHTML)
      stringNumber.classList.remove("btn");
      stringNumber.style.opacity = 1;
      switch (unit) {
        case 5:
          // guideHand.style.top = "450px";
          // guideHand.style.left = "1280px";
          break;
        case 4:
          // guideHand.style.top = "560px";
          // guideHand.style.left = "1373px";
          break;
        case 3:
          // guideHand.style.top = "677px";
          // guideHand.style.left = "1473px";
          break;
        case 2:
          // guideHand.style.top = "787px";
          // guideHand.style.left = "1563px";
          break;
        default:
          break;
      }
      setTimeout(() => {
        // setGuideHandAnimation();
      }, 500);
    });
  });

  const visibilities = root.querySelectorAll(".visibility");
  visibilities.forEach((visibility) => {
    visibility.addEventListener("click", (event) => {
      event.stopPropagation();
      const unit = visibility.dataset.unit;
      const visible = visibility.dataset.visible === "true";
      const visibilityIcon = visibility.querySelector("img");
      const chipContainer = backgroundImage.querySelector(
        `#chip_container_${unit}`
      );
      const expandedNumber = root.querySelector(
        `.expanded_number[data-unit='${unit}']`
      );
      if (visible) {
        visibility.dataset.visible = false;
        visibilityIcon.src = new URL("../img/btn_hidden.svg", metaUrl).href;
        chipContainer.setAttribute("fill", colorPaletteForChipContainer[unit]);
        expandedNumber.style.opacity = 0;
      } else {
        visibility.dataset.visible = true;
        visibilityIcon.src = new URL("../img/btn_visible.svg", metaUrl).href;
        chipContainer.setAttribute("fill", "");
        expandedNumber.style.opacity = 1;
      }
    });
  });

  const resetCardBtn = root.querySelector("#reset_card_btn");
  const resetCardPopup = root.querySelector("#reset_card_popup");
  const resetCardPopupText = resetCardPopup.querySelector(
    "#reset_card_popup_text"
  );
  const resetCardPopupCancel = resetCardPopup.querySelector(
    "#reset_card_popup_btn_cancel"
  );
  const resetCardPopupOk = resetCardPopup.querySelector(
    "#reset_card_popup_btn_ok"
  );

  const toggleResetCardPopupDisplay = (visibility) => {
    [
      resetCardPopup,
      resetCardPopupText,
      resetCardPopupCancel,
      resetCardPopupOk,
    ].forEach((elem) => {
      elem.style.display = visibility;
    });
  };

  resetCardBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    pauseHandAnimation();
    resetCardPopup.style.display = "block";
    anime({
      targets: resetCardPopup,
      duration: 600,
      opacity: [0, 1],
      easing: "easeInQuad",
      complete: () => {
        toggleResetCardPopupDisplay("block");
        pauseHandAnimation();
      },
    });
  });

  const resetBtnClickHandler = () => {
    isFail = false;

    if (keyboardAnimation) {
      keyboardAnimation.pause();
      keyboardAnimation = null;
    }

    if (validateAnimation) {
      validateAnimation.pause();
      validateAnimation = null;
    }

    for (let idx = 1; idx <= 5; idx++) {
      isNumbersValidated[idx] = false;
    }

    keyboard.style.opacity = 0;

    resetCardPopup.style.display = "none";
    resetCardPopup.style.opacity = 0;
    toggleResetCardPopupDisplay("none");
    messageContainer.style.display = "none";
    messageContainer.style.opaicty = 0;

    answerNumbers.forEach((answerNumber) => {
      answerNumber.querySelector("span").innerHTML = "";
      answerNumber.querySelector("span").style.opacity = 1;
      const box = backgroundImage.querySelector(
        `[data-id="answer_number_${answerNumber.dataset.unit}"]`
      );
      const background = box.querySelector(".background");
      const line = box.querySelector(".line");
      box.style.opacity = 1;

      answerNumber.classList.remove("active");
      background.setAttribute("fill", "white");
      line.setAttribute("stroke", "#A1C8EB");
      line.setAttribute("stroke-width", "4");
    });

    root.querySelectorAll(".expanded_number_chip").forEach((chip) => {
      chip.style.opacity = 0;
    });

    stringNumbers.forEach((stringNumber) => {
      stringNumber.classList.remove("btn");
      stringNumber.querySelector("span").innerHTML = "";
    });

    visibilities.forEach((visibility) => {
      const unit = visibility.dataset.unit;
      const visibilityIcon = visibility.querySelector("img");
      const chipContainer = backgroundImage.querySelector(
        `#chip_container_${unit}`
      );
      const expandedNumber = root.querySelector(
        `.expanded_number[data-unit='${unit}']`
      );
      visibility.dataset.visible = true;
      visibilityIcon.src = new URL("../img/btn_visible.svg", metaUrl).href;
      chipContainer.setAttribute("fill", "");
      expandedNumber.style.opacity = 1;
    });
  };

  // reset card confirm
  resetCardPopupOk.addEventListener("click", (event) => {
    event.stopPropagation();
    // toggleResetCardPopupDisplay("none");
    resetBtnClickHandler();
    totalNumbers.forEach((totalNumber) => {
      totalNumber.querySelector("span").innerHTML = "";
      if (totalNumber.dataset.unit !== "5") {
        totalNumber.classList.remove("active");
      } else {
        totalNumber.classList.add("active");
      }
    });
    totalNumberContainer.classList.add("btn");

    SetAriaLabel(totalNumberContainer, "0");
    
    for (let idx = 1; idx <= 5; idx++) {
      const stringNumberBackground = root.querySelector(
        `.string_number_background[data-unit='${idx}']`
      );
      const back = stringNumberBackground.querySelector(".back");
      const front = stringNumberBackground.querySelector(".front");
      back.setAttribute("fill", back.dataset.color);
      front.setAttribute("fill", front.dataset.color);
    }
    
    answerNumbers.forEach((answerNumber) => {
      answerNumber.classList.add("pencil");
      answerNumber.classList.add("btn");
      answerNumber.classList.remove("active");

      const box = backgroundImage.querySelector(
        `[data-id="answer_number_${answerNumber.dataset.unit}"]`
      );
      const background = box.querySelector(".background");
      const line = box.querySelector(".line");
      background.setAttribute("fill", "white");
      line.setAttribute("stroke", "#A1C8EB");
      line.setAttribute("style", "stroke-width: 4px;");
    });

    isResetClicked = true;

    /// UDL 추가
    [5, 4, 3, 2, 1].forEach((num) => {
      const element = root.querySelector(`#string_number_${num}`);
      if (element) {
        element.tabIndex = -1;
      }
    })

    setTimeout(() => {
      if (keyboard.style.opacity === "0") {
        guideHand.style.top = "150px";
        guideHand.style.left = "1199px";
        setGuideHandAnimation();
      }
    }, 1000);
  });

  // reset card cancel
  resetCardPopupCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    resetCardPopup.style.opacity = 0;
    resetCardPopup.style.display = "none";
    toggleResetCardPopupDisplay("none");
  });

  totalNumberContainer.addEventListener("click", (event) => {
    event.stopPropagation();
    pauseHandAnimation();
    let idx = 0;
    let cardNumber = "";
    while (idx < 5) {
      cardNumber += totalNumbers[idx].querySelector("span").innerHTML;
      idx++;
    }
    if (cardNumber.length < 5) {
      activateKeyboard(totalNumberContainer.getAttribute("tabindex"));
    }

    var temp = "";
    const temp2 = ["만", "천", "백", "십", ""]
    totalNumbers.forEach((totalNumber, i) => {
      if(totalNumber.querySelector("span").innerHTML != "0") {
        temp += totalNumber.querySelector("span").innerHTML;
        if (totalNumber.querySelector("span").innerHTML != "") temp += temp2[i];
      }
    })

    if (temp == "") temp = "0";
      SetAriaLabel(root.querySelector("#total_number_container"), temp)
  });

  const totalNumberEventHandler = (event) => {
    // pauseHandAnimation();
    event.stopPropagation();
    const unit = event.target.dataset.unit;
    totalNumbers.forEach((totalNumber) => {
      const totalNumberUnit = totalNumber.dataset.unit;
      const greyBorder = root.querySelector(
        `.total_number_border[data-unit='${totalNumberUnit}']`
      );
      if (totalNumberUnit === unit) {
        totalNumber.style.borderColor = colorPalettePerUnit[totalNumberUnit];
        greyBorder.setAttribute("fill", "");
        totalNumber.classList.add("active");
      } else {
        totalNumber.style.borderColor = "transparent";
        greyBorder.setAttribute("fill", "#BFC7DA");
        totalNumber.classList.remove("active");
      }
    });
    // activateKeyboard();
  };

  // toggle full screen mode btn
  fullScreenBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    var doc = document;
    var docEl = root.firstElementChild;

    var requestFullScreen =
      doc.documentElement.requestFullscreen ||
      doc.mozRequestFullScreen ||
      doc.webkitRequestFullScreen ||
      doc.msRequestFullscreen;
    var cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
      // 전체화면 이미지로 변경
      root.querySelector("#full_screen_btn > img").src = new URL(
        "../img/btn-fullscreen-off.png",
        metaUrl
      ).href;
    } else {
      cancelFullScreen.call(doc);
      // 일반 이미지로 변경
      root.querySelector("#full_screen_btn > img").src = new URL(
        "../img/btn-fullscreen-on.png",
        metaUrl
      );
    }
  });

  let agent = navigator.userAgent.toLowerCase();
  if (
    agent.indexOf("iphone") > -1 ||
    agent.indexOf("ipad") > -1 ||
    agent.indexOf("ipod") > -1 ||
    agent.indexOf("mac") > -1
  ) {
    fullScreenBtn.style.display = "none";
  }

  // esc key -> escape full mode
  if (document.addEventListener) {
    document.addEventListener(
      "fullscreenchange",
      fullScreenChangeHandler,
      false
    );
    document.addEventListener(
      "mozfullscreenchange",
      fullScreenChangeHandler,
      false
    );
    document.addEventListener(
      "MSFullscreenChange",
      fullScreenChangeHandler,
      false
    );
    document.addEventListener(
      "webkitfullscreenchange",
      fullScreenChangeHandler,
      false
    );
  }

  // reset btn
  resetBtn.addEventListener("click", (event) => {
    pauseHandAnimation();
    event.stopPropagation();
    resetBtnClickHandler();

    // totalNumbers.forEach((totalNumber) => {
    //   let originNumber;
    //   switch (Number(totalNumber.dataset.unit)) {
    //     case 5:
    //       originNumber = 6;
    //       break;
    //     case 4:
    //       originNumber = 8;
    //       break;
    //     case 3:
    //       originNumber = 2;
    //       break;
    //     case 2:
    //       originNumber = 6;
    //       break;
    //     case 1:
    //       originNumber = 3;
    //       break;
    //     default:
    //       break;
    //   }
    //   totalNumber.querySelector("span").innerHTML = originNumber;
    // });

    /// UDL 추가
    [5, 4, 3, 2, 1].forEach((num, idx) => {
      const element = root.querySelector(`#string_number_${num}`);
      if (element) {
        element.tabIndex = -1;

        const aria = ["만", "천", "백", "십", "일"]
        SetAriaLabel(element, aria[idx] + " 자릿수 확인 박스")
      }
    })

    isNumbersValidated = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    };

    answerNumbers.forEach((answerNumber) => {
      answerNumber.classList.add("btn");
      answerNumber.classList.add("pencil");
    });

    isResetClicked = false;

    setTimeout(() => {
      guideHand.style.top = "340px";
      guideHand.style.left = "1199px";
      setGuideHandAnimation();
    }, 800);
  });
});
