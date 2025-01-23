import {
  setCommonRoot,
  autoScale,
  scale,
  // toggleFullScreen,
  fullScreenChangeHandler,
} from "./common.js";
import anime from "./anime.js";
import { SetAriaLabel, SetTabIndex } from "./UDLController.js";
import MainEvent from "../../remote/js/Activity/MainEvent.js";

var metaUrl = import.meta.url;
var root = null;

window.addEventListener("script-loaded", function (ev) {
  if (root) return;
  const u = new URL(metaUrl);
  const param = u.searchParams.get("embed-unique");

  if (param && param !== ev.detail.unique) return;

  const shadowRoot = ev.detail.root; // 커스텀 이벤트에 담겨진 shadowRoot 객체
  root = shadowRoot;

  SetTabIndex(root);

  Array.from(root.querySelector("#answer_number_container").children).forEach((element, index) => {
    element.style.visibility = "hidden";
  })

  Array.from(root.querySelector("#expanded_number_container").children).forEach((element, index) => {
    element.style.visibility = "hidden";
  })

  setTimeout(() => {
    this.thousandTabIndex = root.querySelector("#total_number_3").tabIndex;
    this.hundredTabIndex = root.querySelector("#total_number_2").tabIndex;
    this.tenTabIndex = root.querySelector("#total_number_1").tabIndex;
    this.oneTabIndex = root.querySelector("#total_number_0").tabIndex;
  })

  setCommonRoot(root, {});
  
  var url = root.querySelector(".ukp__js_wrap_font").getAttribute("href").replace("/font.css", "");
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

  const colorPalettePerUnit = {
    1: "#E2507A",
    2: "#1D96D1",
    3: "#93A800",
    4: "#E46E00",
  };

  const greyColor = "#BFC7DA";

  let cardNumbers = {
    1: 8,
    2: 7,
    3: 2,
    4: 5,
  };

  let isEditingNumber = false;
  let isFirstNumber = true;

  let isNumbersValidated = {
    1: false,
    2: false,
    3: false,
    4: false,
  };

  let isResetClicked = false;
  const guideHand = root.querySelector("#guide_hand");

  let guideHandAnimation;
  const setGuideHandAnimation = (delay = 5000) => {
    guideHand.style.zIndex = 99;
    guideHandAnimation = anime({
      targets: guideHand,
      opacity: [1, 0],
      loop: 3,
      duration: 1000,
      easing: "easeInOutQuad",
      complete: () => {
        setTimeout(() => {
          if (guideHandAnimation) {
            guideHandAnimation.play();
          }
        }, delay);
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

  guideHand.addEventListener("click", () => {
    pauseHandAnimation();
  });

  const fullScreenBtn = root.querySelector("#full_screen_btn");
  const resetBtn = root.querySelector("#reset_btn");

  const keyboardContainer = root.querySelector("#keyboardContainer");
  const keyboard = keyboardContainer.querySelector("#keyboard");
  const keyPadNums = keyboard.querySelectorAll(".key");

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

  const totalNumberContainer = root.querySelector("#total_number_container");
  const totalNumbers = totalNumberContainer.querySelectorAll(".total_number");

  const expandedNumberContainer = root.querySelector(
    "#expanded_number_container"
  );
  const expandedNumbers =
    expandedNumberContainer.querySelectorAll(".expanded_number");
  const expandBtn = root.querySelector("#expand_btn");
  const expandArea = root.querySelector("svg#expand_area");
  const expandAreas = root.querySelectorAll(".expand_area");
  const expandLines = root.querySelectorAll(".expand_line");
  let expandAreaAnimation;
  let expandLineAnimation;

  const expandAreaLines = root.querySelectorAll(".expand_area_unit_line");
  const expandAreaBlocks = root.querySelectorAll(".expand_area_unit_block");
  const pencils = root.querySelectorAll(".pencil");

  const errorMessageContainer = root.querySelector('#errorMessageContainer');

  const setTotalNumber = (numberObj) => {
    totalNumbers.forEach((totalNumber) => {
      const unit = totalNumber.dataset.unit;
      totalNumber.querySelector("span").innerHTML = numberObj[unit];
    });
  };

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

  /**
   * handle number type in events
   */
  const typeInNumberHandler = (number) => {
    const input = root.querySelector(".active");
    if (!input) {
      return;
    }
    const unit = input.dataset.unit;
    if (input.classList.contains("total_number")) {
      cardNumbers[unit] = number;
    }
    if (isNumbersValidated[unit] || validateAnimation) {
      return;
    }
    if (input.querySelector("span.num").innerHTML !== "") {
      return;
    }
    input.classList.remove("pencil");
    input.querySelector("span.num").innerHTML = number;


    let unitString = "";
    let numberString = "";
    switch (Number(unit)) {
      case 4:
        unitString = "천만";
        break;
      case 3:
        unitString = "백만";
        break;
      case 2:
        unitString = "십만";
        break;
      case 1:
        unitString = "만";
        break;
      default:
        break;
    }
    switch (number) {
      case 9:
        numberString = "구";
        break;
      case 8:
        numberString = "팔";
        break;
      case 7:
        numberString = "칠";
        break;
      case 6:
        numberString = "육";
        break;
      case 5:
        numberString = "오";
        break;
      case 4:
        numberString = "사";
        break;
      case 3:
        numberString = "삼";
        break;
      case 2:
        numberString = "이";
        break;
      case 1:
        numberString = "일";
        break;
      default:
        break;
    }

    SetAriaLabel(input.querySelector("span.num").parentElement, `${numberString}${unitString}`);

    animateAnswer();
    if (Number(keyboard.style.opacity)) {
      keyboardAnimation = anime({
        targets: keyboard,
        delay: 500,
        duration: 1,
        opacity: [1, 0],
        easing: "easeInQuad",
        complete: () => {
          keyboardContainer.style.display = "none";
        },
      });
    }
  };

  const animateKeyPadNum = (targets) => {
    targets.style.transformOrigin = "50% 50%";
    anime({
      targets: targets,
      duration: 200,
      scale: [1, 1.2, 1],
      easing: "linear",
    });
  };

  let keyboardAnimation;
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

  const validateAnswer = (unit) => {
    const answer = root.querySelector(`.expanded_number_digit.active`);
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

  const totalNumberEventHandler = (event) => {
    event.stopPropagation();
    if (!isEditingNumber) {
      return;
    }
    pauseHandAnimation();
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
    activateKeyboard(event.target.getAttribute('tabindex'));
  };

  let validateAnimation;
  let isNumberValidated = false;
  const answerNumbers = root.querySelectorAll(".answer_number");

  /**
   * freeze total numbers when expanded
   */
  const freezeTotalNumbers = () => {
    totalNumbers.forEach((totalNumber) => {
      root
        .querySelector(
          `.total_number_border[data-unit='${totalNumber.dataset.unit}']`
        )
        .setAttribute("fill", "#BFC7DA");
      totalNumber.style.borderColor = "transparent";
      totalNumber.classList.remove("active");
      totalNumber.classList.remove("btn");
      totalNumber.removeEventListener("click", totalNumberEventHandler);
    });
  };

  const unfreezeTotalNumbers = () => {
    totalNumbers.forEach((totalNumber) => {
      root
        .querySelector(
          `.total_number_border[data-unit='${totalNumber.dataset.unit}']`
        )
        .setAttribute("fill", "#BFC7DA");
      totalNumber.style.borderColor = "transparent";
      totalNumber.classList.remove("active");
      totalNumber.classList.add("btn");
      totalNumber.addEventListener("click", totalNumberEventHandler);
    });
  };

  const animateAnswer = () => {
    const activeDigit = root.querySelector(`.expanded_number_digit.active`);
    if (!activeDigit) {
      return true;
    }
    const unit = activeDigit.dataset.unit;
    const restNumbers = root.querySelectorAll(
      `#expanded_number_${unit} > .expanded_number_digit:not(.active) > span`
    );
    activeDigit.classList.remove("pencil");
    if (isNumbersValidated[unit]) {
      return;
    }
    if (validateAnswer(unit)) { // correct
      isNumbersValidated[unit] = true;
      isNumberValidated = true;

      const answerNumber = root.querySelector(
        `.answer_number[data-unit='${unit}']`
      );

      answerNumber.classList.add("display_flex");
      answerNumber.classList.remove("opacity_0");
      answerNumber.style.opacity = 1;

      answerNumber.style.visibility = "visible";

      if (validateAnimation) {
        validateAnimation.pause();
        validateAnimation = null;
      }
      validateAnimation = anime({
        targets: restNumbers,
        duration: 1000,
        opacity: [0, 1],
        easing: "easeInQuad",
        complete: () => {
          validateAnimation = null;
          const lines = root.querySelectorAll([
            `.expand_area_unit_line[data-unit='${unit}']`,
          ]);
          const blocks = root.querySelectorAll([
            `.expand_area_unit_block[data-unit='${unit}']`,
          ]);
          lines.forEach((line) => {
            line.setAttribute("stroke", "");
            line.setAttribute("fill", colorPalettePerUnit[unit]);
            line.setAttribute("fill-opacity", 1);
          });
          blocks.forEach((block) => {
            block.setAttribute("fill", colorPalettePerUnit[unit]);
            block.setAttribute("fill-opacity", 0.08);
          });
          root
            .querySelector(`#expand_area_unit_line_${unit}`)
            .setAttribute("stroke", "#C483D0");

          answerNumber.classList.add("btn");
          root.querySelector(
            `.answer_number_border[data-unit='${unit}']`
          ).style.opacity = 1;
          root.querySelector(
            `.answer_number_block[data-unit='${unit}']`
          ).style.opacity = 1;

          guideHand.style.left = "1703px";
          switch (unit) {
            case "4":
              guideHand.style.top = "480px";
              break;
            case "3":
              guideHand.style.top = "612px";
              break;
            case "2":
              guideHand.style.top = "744px";
              break;
            case "1":
              guideHand.style.top = "876px";
              break;
          }
          
          if (unit === "4") {
            if (answerNumber.querySelector(`span`).innerHTML === "") {
              setGuideHandAnimation();
            }
          } else {
              setTimeout(() => {
                if (answerNumber.querySelector(`span`).innerHTML === "" && !(expandedNumberContainer.style.display === 'none')) {
                  setGuideHandAnimation(10000);
                }
              }, 10000);
          }
          root
            .querySelector(`.expanded_number_digit[data-unit="${unit}"]`)
            .classList.remove("btn");
        },
      });
    } else {
      // wrong
      const activeDigit = root.querySelector(
        `.expanded_number_digit.active[data-unit='${unit}']`
      );
      activeDigit.classList.remove('active');
      restNumbers.forEach((num) => (num.style.opacity = 0));
      const lines = root.querySelectorAll([
        `.expand_area_unit_line[data-unit='${unit}']`,
      ]);
      const blocks = root.querySelectorAll([
        `.expand_area_unit_block[data-unit='${unit}']`,
      ]);
      validateAnimation = anime({
        targets: activeDigit.querySelector(`span`),
        opacity: [0, 1, 0, 1],
        delay: 300,
        duration: 1000,
        easing: "easeInQuad",
        complete: () => {
          activeDigit.querySelector(`span`).innerHTML = "";
          validateAnimation = null;
          const otherAnswer = activeDigit.querySelector(`span`).innerHTML; // 중간에 입력한 다른 숫자
          if (otherAnswer === "") {
            activeDigit.classList.add("pencil");
          }
        },
      });

     /* validateAnimation = anime({
        targets: [...lines, ...blocks],
        delay: 300,
        duration: 1000,
        fill: [
          greyColor,
          colorPalettePerUnit[unit],
          greyColor,
          colorPalettePerUnit[unit],
          greyColor,
        ],
        easing: "easeInQuad",
      });*/
     /* validateAnimation = anime({
        targets: root.querySelector(`#expand_area_unit_line_${unit}`),
        delay: 300,
        duration: 1200,
        stroke: [greyColor, "#C483D0", greyColor, "#C483D0", greyColor],
        easing: "easeInQuad",
        
      });*/
    }
  };

  const resetExpandAreaColor = () => {
    expandAreaLines.forEach((line) => {
      line.setAttribute("stroke", "#BFC7DA");
      line.setAttribute("fill", "#BFC7DA");
      line.setAttribute("fill-opacity", "1");
    });
    expandAreaBlocks.forEach((line) => {
      line.setAttribute("fill", "#FFF");
    });
  };

  const activateNumbers = (unit) => {
    if (!unit) {
      return;
    }
    root.querySelector(`#expand_area_${unit}`).style.opacity = 1;
    root.querySelector(`#expanded_number_${unit}`).style.opacity = 1;
    root.querySelector(`#expanded_number_${unit}`).style.display = 'flex';
    root.querySelector(`#expanded_number_${unit}`).style.visibility = 'visible';
    root.querySelector(`#expanded_number_${unit}_0`).style.opacity = 1;
    root.querySelector(`#expanded_number_${unit}_0`).classList.add('btn');
    root.querySelector(`#expanded_number_${unit}_0`).classList.add('pencil');
  };

  setTotalNumber(cardNumbers);

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
      },
    });
  });

  const resetBtnClickHandler = () => {
    if (expandAreaAnimation) {
      expandAreaAnimation.pause();
      expandAreaAnimation = null;
    }

    if (expandLineAnimation) {
      expandLineAnimation.pause();
      expandLineAnimation = null;
      expandLines.forEach((line) => {
        line.setAttribute("height", 90);
      });
    }

    if (keyboardAnimation) {
      keyboardAnimation.pause();
      keyboardAnimation = null;
    }

    if (validateAnimation) {
      validateAnimation.pause();
      validateAnimation = null;
    }
    if (
      root.querySelector("#expand_area_unit_line_extra").style.display ===
      "block"
    ) {
      root.querySelector("#expand_area_unit_line_extra").style.display = "none";
    }
    expandAreas.forEach((area) => {
      area.style.opacity = 1;
    });
    root.querySelectorAll(".expanded_number_digit").forEach((digit) => {
      if (digit.classList.contains("first")) {
        digit.querySelector("span").innerHTML = "";
        digit.querySelector("span").style.opacity = 1;
      } else {
        digit.querySelector("span").style.opacity = 0;
      }
    });
    unfreezeTotalNumbers();
    resetExpandAreaColor();
    keyboard.style.opacity = 0;
    keyboardContainer.style.top = "";
    keyboardContainer.style.bottom = "0px";

    resetCardBtn.style.display = "block";
    resetCardPopup.style.opacity = 0;
    resetCardPopup.classList.remove("expand_animation");
    toggleResetCardPopupDisplay("none");

    expandArea.style.display = "none";
    expandedNumberContainer.style.display = "none";
    expandedNumbers.forEach((expandedNumber) => {
      expandedNumber.querySelector(".active")?.classList.remove("active");
    });
    root.querySelector("#answer_number_container").style.display = "none";
    Array.from(root.querySelector("#answer_number_container").children).forEach((element, index) => {
      element.style.visibility = "hidden";
    })

    answerNumbers.forEach((answerNumber) => {
      answerNumber.querySelector("span.num").innerHTML = "";
      answerNumber.querySelector("span.unit").innerHTML = "";
      answerNumber.classList.remove("btn");
    });

    pencils.forEach((pencil) => {
      pencil.classList.add("pencil");
    });

    root
      .querySelectorAll(`.answer_number_border`)
      .forEach((border) => (border.style.opacity = 0));
    root
      .querySelectorAll(`.answer_number_block`)
      .forEach((block) => (block.style.opacity = 0));
    root.querySelectorAll(`.answer_number_block`).forEach((block) => {
      block.setAttribute("fill", "");
    });

    isNumbersValidated = { 1: false, 2: false, 3: false, 4: false };
  };

  // reset card confirm
  resetCardPopupOk.addEventListener("click", (event) => {
    event.stopPropagation();
    resetBtnClickHandler();

    expandBtn.classList.add('btn');
    
    totalNumbers.forEach((totalNumber) => {
      totalNumber.querySelector("span").innerHTML = "";
      totalNumber.style.borderColor = "transparent";
      const greyBorder = root.querySelector(
        `.total_number_border[data-unit='${totalNumber.dataset.unit}']`
      );
      greyBorder.setAttribute("fill", "#BFC7DA");
      totalNumber.classList.remove("active");
    });

    SetAriaLabel(root.querySelector("#expanded_number_4_0"), "천만 자리 입력 박스")
    SetAriaLabel(root.querySelector("#expanded_number_3_0"), "백만 자리 입력 박스")
    SetAriaLabel(root.querySelector("#expanded_number_2_0"), "십만 자리 입력 박스")
    SetAriaLabel(root.querySelector("#expanded_number_1_0"), "일만 자리 입력 박스")

    SetAriaLabel(root.querySelector("#answer_number_container").children[0], "천만 자리 정답 박스")
    SetAriaLabel(root.querySelector("#answer_number_container").children[1], "백만 자리 정답 박스")
    SetAriaLabel(root.querySelector("#answer_number_container").children[2], "십만 자리 정답 박스")
    SetAriaLabel(root.querySelector("#answer_number_container").children[3], "일만 자리 정답 박스")
    
    expandedNumbers.forEach(
      (expandedNumber) => {
        expandedNumber.style.opacity = 0;
        expandedNumber.style.visibility = 'hidden';
        expandedNumber.style.display = 'flex';
    });
    
    expandAreas.forEach(a => {
      a.style.display = 'none';
    });

    totalNumbers.forEach((element, idx) => {
      if(element) {
        SetAriaLabel(element, "영");
      }
    })
    
    expandAreas.forEach((expandArea) => (expandArea.style.opacity = 1));
    expandLines.forEach((line) => {
      line.setAttribute("height", 90);
    });

    cardNumbers = { 1: null, 2: null, 3: null, 4: null };
    setTotalNumber(cardNumbers);
    isEditingNumber = true;
    isFirstNumber = true;
    pauseHandAnimation();
    setTimeout(() => {
      if (root.querySelector('#total_number_3').getAttribute('style').split(': ')[1] === 'transparent;') {
        guideHand.style.top = "310px";
        guideHand.style.left = "290px";
        setGuideHandAnimation();        
      }
    }, 1000);
  });

  // reset card cancel
  resetCardPopupCancel.addEventListener("click", () => {
    toggleResetCardPopupDisplay("none");
  });

  totalNumbers.forEach((number) => {
    number.addEventListener("click", totalNumberEventHandler);
  });
  
  let firstExpandedNumber = 0;
  
  const showExpandedNumberSlot = (unit) => {
    if (cardNumbers[unit] === 0) {
      root.querySelector('.expand_area_unit_line_patch').style.opacity = 1;
      root.querySelector(
        `.expand_area[data-unit='${unit}']`
      ).style.display = 'block';
      root.querySelector(
        `.expand_area[data-unit='${unit}']`
      ).style.opacity = 1;
      const lines = root.querySelectorAll([
        `.expand_area_unit_line[data-unit='${unit}']`,
      ]);
      const blocks = root.querySelectorAll([
        `.expand_area_unit_block[data-unit='${unit}']`,
      ]);

      lines.forEach((line) => {
        line.setAttribute("stroke", "");
        line.setAttribute("fill", colorPalettePerUnit[unit]);
        line.setAttribute("fill-opacity", 1);
      });
      blocks.forEach((block) => {
        block.setAttribute("fill", "#E6E9F0");
        block.setAttribute("fill-opacity", 1);
      });
      
      root
        .querySelector(`#expand_area_unit_line_${unit}`)
        .setAttribute("stroke", "#C483D0");
      root.querySelector(
        `.answer_number_block[data-unit="${unit}"]`
      ).style.opacity = 1;
      root.querySelector(
        `.answer_number_border[data-unit="${unit}"]`
      ).style.opacity = 1;

      const answerNumberBlock = root.querySelector(
        `.answer_number_block[data-unit='${unit}']`
      );

      answerNumberBlock.setAttribute("fill", "#E6E9F0");
      answerNumberBlock.setAttribute("fill-opacity", 1);
      setTimeout(() => {
        expandLine(5 - unit);
      }, 1000);
    } else {
      root.querySelector('.expand_area_unit_line_patch').style.opacity = 1;
      root.querySelector(
        `.expand_area[data-unit='${unit}']`
      ).style.display = 'block';
      root.querySelector(
        `.expand_area[data-unit="${unit}"]`
      ).style.opacity = 0;

      firstExpandedNumber = unit;
      activateNumbers(firstExpandedNumber);
      root.querySelector(`#expanded_number_${firstExpandedNumber}`).style.opacity = 1;
      root.querySelector(`#expanded_number_${firstExpandedNumber}`).style.visibility = 'visible';
      root.querySelector(`#expanded_number_${firstExpandedNumber}_0`).classList.add('btn');          
      root.querySelector(`#expanded_number_${firstExpandedNumber}_0`).classList.add('pencil');          
    }
  };
  
  const expandLine = (unit) => {
    const line = expandLines[unit];
    if (!line) {
      return;
    }
    
    expandLineAnimation = anime({
      targets: line,
      height: [90, Number(line.dataset.originHeight)], 
      duration: 600,
      easing: "easeOutExpo",
      complete: () => {
        showExpandedNumberSlot(4 - unit);
      }
    });
  };
  
  /**
   * expand
   */
  expandBtn.addEventListener("click", (event) => {
    pauseHandAnimation();
    event.stopPropagation();
    if (!expandBtn.classList.contains("btn")) {
      return;
    }
    for (let idx = 1; idx <= 4; idx++) {
      if (typeof cardNumbers[idx] !== "number") {
        errorMessageContainer.style.display = 'block';
        anime({
          targets: errorMessageContainer,
          complete: () => {
            errorMessageContainer.style.display = 'none';
          },
          duration: 1500,
          opacity: [1, 1, 1, 1, 1, 1, 0],
          easing: "linear",
        });
        return true;
      }
    }
    if (expandedNumberContainer.style.display === "flex") {
      return true;
    }
    expandBtn.classList.remove("btn");
    freezeTotalNumbers();

    keyboard.style.opacity = 0;
    keyboardContainer.style.display = "none";

    // resetCardBtn.style.display = "none";
    
    expandArea.style.display = "flex";
    expandedNumberContainer.style.display = "flex";
    root.querySelector("#answer_number_container").style.display = "flex";
    
    resetCardPopup.style.opacity = 0;


    
    

    expandAreaAnimation = anime({
      targets: expandArea,
      duration: 1000,
      opacity: [0, 1],
      complete: () => {
        expandLine(0);
      }
    });
    
  });

  /**
   * pencil area
   */
  pencils.forEach((pencil) => {
    pencil.addEventListener("click", (event) => {
      event.stopPropagation();
      pauseHandAnimation();
      if (!pencil.classList.contains('btn')) {
        return;
      }

      const unit = pencil.dataset.unit;
      const number = cardNumbers[unit];
      if (isNumbersValidated[unit]) {
        return;
      }
      const answerNumber = root.querySelector(
        `.answer_number[data-unit='${unit}']`
      );

      if (
        root
          .querySelector(`.expanded_number_digit.active`)
          ?.querySelector("span").innerHTML !== ""
      ) {
        animateAnswer();
      }
      answerNumber.querySelector("span").innerHTML = "";
      
      root
        .querySelectorAll(`.expand_number_digit[data-unit='${unit}']`)
        .forEach((digit) => {
          if (digit.classList.contains("first")) {
            digit.querySelector("span").innerHTML = "";
            digit.querySelector("span").style.opacity = 1;
          } else {
            digit.querySelector("span").style.opacity = 0;
          }
        });

      isNumbersValidated[unit] = false;
      
      let blockFillColor;
      let blockFillOpacity;
      if (number > 0) {
        blockFillColor = colorPalettePerUnit[unit];
        blockFillOpacity = 0.08;
      } else {
        if (unit === "1") {
          root.querySelector("#expand_area_unit_line_extra").style.display = "block";
        }
        blockFillColor = "#E6E9F0";
        blockFillOpacity = 1;
      }
      const lines = root.querySelectorAll([
        `.expand_area_unit_line[data-unit='${unit}']`,
      ]);
      const blocks = root.querySelectorAll([
        `.expand_area_unit_block[data-unit='${unit}']`,
      ]);
      lines.forEach((line) => {
        line.setAttribute("stroke", "");
        line.setAttribute("fill", colorPalettePerUnit[unit]);
        line.setAttribute("fill-opacity", 1);
      });
      blocks.forEach((block) => {
        block.setAttribute("fill", blockFillColor);
        block.setAttribute("fill-opacity", blockFillOpacity);
      });
      root
        .querySelector(`#expand_area_unit_line_${unit}`)
        .setAttribute("stroke", "#C483D0");

      pencil.classList.remove("pencil");

      if (number > 0) {
        if (unit === "1") {
          keyboardContainer.style.top = "43px";
          keyboardContainer.style.bottom = "";
        } else {
          keyboardContainer.style.top = "";
          keyboardContainer.style.bottom = "0px";
        }
        if (
          !root.querySelector(".active") ||
          (root.querySelector(".active") &&
            pencil.dataset.unit !== root.querySelector(".active").dataset.unit)
        ) {
        }
        activateKeyboard(pencil.getAttribute("tabindex"));
        pencils.forEach((p) => {
          if (p.dataset.unit === unit) {
            p.classList.add("active");
          } else {
            p.classList.remove("active");
          }
        });
      } else {
        pencils.forEach((p) => {
          if (p.dataset.unit === unit) {
            p.classList.remove("active");
            p.classList.remove("btn");
          }
        });
        root
          .querySelector(`.answer_number[data-unit='${unit}']`)
          .classList.remove("btn");
        const answerNumberBlock = root.querySelector(
          `.answer_number_block[data-unit='${unit}']`
        );

        answerNumberBlock.setAttribute("fill", blockFillColor);
        answerNumberBlock.setAttribute("fill-opacity", blockFillOpacity);
        deactivateKeyboard();
      }
    });
  });

  /**
   * answer click area
   */
  answerNumbers.forEach((answerNumber) => {
    answerNumber.addEventListener("click", (event) => {
      pauseHandAnimation();
      event.stopPropagation();

      if (answerNumber.classList.contains("btn")) {
        answerNumber.classList.remove("btn");
      } else {
        return;
      }
      deactivateKeyboard();
      animateAnswer();

      const unit = answerNumber.dataset.unit;
      const number = root.querySelector(
        `.expanded_number_digit[data-unit='${answerNumber.dataset.unit}'] > span`
      ).innerHTML;
      
      if (number) {
        answerNumber.querySelector("span.num").innerHTML = `${
          number * 10 ** (unit - 1)
        }`;
        answerNumber.querySelector("span.unit").innerHTML = `만`;
        answerNumber.style.opacity = 1;
        SetAriaLabel(answerNumber, `${number * 10 ** (unit - 1)}만`);
      }
      
      let idx = Number(unit);
      if (idx > 0) {
        setTimeout(() => {
          expandLine(5 - idx);
        }, 1000);        
      }
    });
  });

  const expandedNumberDigits = root.querySelectorAll(".expand_number_digit");

  const deactivateCurrentBox = () => {
    const input = root.querySelector(`.expanded_number_digit.active`);
    if (!input) {
      return true;
    }
    const unit = input.dataset.unit;
    if (isNumbersValidated[unit]) {
      return false;
    }

    const lines = root.querySelectorAll([
      `.expand_area_unit_line[data-unit='${unit}']`,
    ]);
    const blocks = root.querySelectorAll([
      `.expand_area_unit_block[data-unit='${unit}']`,
    ]);

    lines.forEach((line) => {
      line.setAttribute("stroke", "");
      line.setAttribute("fill", greyColor);
      line.setAttribute("fill-opacity", 1);
    });

    blocks.forEach((block) => {
      block.setAttribute("fill", greyColor);
      block.setAttribute("fill-opacity", 0.08);
    });
    root
      .querySelector(`#expand_area_unit_line_${unit}`)
      .setAttribute("stroke", greyColor);
    input.classList.add("pencil");
    input.classList.add("btn");
  };
  
  /**
   * outside click
   */
  root.addEventListener("click", (event) => {
    [
      keyboard,
      expandBtn,
      resetCardBtn,
      guideHand,
      ...totalNumbers,
      ...expandedNumbers,
      expandedNumberContainer,
      // ...expandedNumberDigits,
      ...answerNumbers,
    ].map((node) => {
      return node.contains(event.target);
    });
    deactivateKeyboard();
    deactivateCurrentBox();
    toggleResetCardPopupDisplay("none");
  });

  // web / mobile key click event
  keyPadNums.forEach((key) => {
    key.addEventListener("click", (event) => {
      event.stopPropagation();
      pauseHandAnimation();
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

    SetAriaLabel(root.querySelector("#total_number_3"), "오천만")
    SetAriaLabel(root.querySelector("#total_number_2"), "이백만")
    SetAriaLabel(root.querySelector("#total_number_1"), "칠십만")
    SetAriaLabel(root.querySelector("#total_number_0"), "팔만")

    SetAriaLabel(root.querySelector("#expanded_number_4_0"), "천만 자리 입력 박스")
    SetAriaLabel(root.querySelector("#expanded_number_3_0"), "백만 자리 입력 박스")
    SetAriaLabel(root.querySelector("#expanded_number_2_0"), "십만 자리 입력 박스")
    SetAriaLabel(root.querySelector("#expanded_number_1_0"), "일만 자리 입력 박스")

    SetAriaLabel(root.querySelector("#answer_number_container").children[0], "천만 자리 정답 박스")
    SetAriaLabel(root.querySelector("#answer_number_container").children[1], "백만 자리 정답 박스")
    SetAriaLabel(root.querySelector("#answer_number_container").children[2], "십만 자리 정답 박스")
    SetAriaLabel(root.querySelector("#answer_number_container").children[3], "일만 자리 정답 박스")

    if(MainEvent.step !== 'problem'){
      cardNumbers = { 1: 8, 2: 7, 3: 2, 4: 5 };
      setTotalNumber(cardNumbers);
    }
    
    
    expandBtn.classList.add('btn');
    expandedNumbers.forEach(
      (expandedNumber) => {
        expandedNumber.style.opacity = 0;
        expandedNumber.style.display = 'none';
        expandedNumber.style.visibility = 'hidden';  
      }
    );
    expandLines.forEach((line) => {
      line.setAttribute("height", 90);
    });
    expandAreas.forEach((expandArea) => (expandArea.style.opacity = 0));

    isEditingNumber = false;
    isFirstNumber = true;

    root.querySelector("#expanded_number_4_0").classList.add("btn");
    root.querySelector("#expanded_number_4_0").classList.add("pencil");
    setTimeout(() => {
      guideHand.style.top = "410px";
      guideHand.style.left = "887px";
      setGuideHandAnimation();
    }, 300);
  });

  resetExpandAreaColor();
});
