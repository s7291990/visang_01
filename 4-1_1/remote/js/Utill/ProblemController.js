import MainEvent from "../Activity/MainEvent.js";
import { AnimationHelper } from "./AnimationHelper.js";
import { RemoveListener } from "./EventListenerHelper.js";
import { KeyBoardOff, KeyBoardOn } from "./KeyBoard.js";

//#region 클릭형 정답체크 기능
/** 클릭형 정답체크 기능 */
export class ClickProblemController {
    constructor(element, eventEmitter) {
        this.element = element
        this.eventEmitter = eventEmitter

        this.answer = `<span>5</span>장`
        this.answerFontSize = 50

        this.blueQimgPath = MainEvent.ImgPath + "common/blue_btn_q.png"
        this.grayQimgPath = MainEvent.ImgPath + "common/gray_btn_q.png"

        this.imgSize = {x: 44, y: 46}

        this.activeBorder = "5px solid #5090EA"
        this.deActiveBorder = "5px solid #BFC7DA"

        /** 클릭 사용가능 여부 */
        this.isActive = false

        /** 클릭 우선 순위 */
        this.priorityNum = 0;

        /** 완료 여부 */
        this.isComplete = false

        this.answerCnt = 0

        this.priorityStandardList = [1000000];
        this.priorityStandardIdx = 0

        /** 정답시 표출 시간 */
        this.opacityDelay = 400

        this.marginBottomVal = "0px"
    }

    Init() {
        //이미지 추가
        this.imgDiv = document.createElement("div")
        this.imgDiv.style.backgroundImage = `url(${this.blueQimgPath})`
        this.imgDiv.style.width = this.imgSize.x + "px"
        this.imgDiv.style.height = this.imgSize.y + "px"
        this.imgDiv.style.position = "absolute"
        this.imgDiv.style.opacity = 1;
        this.imgDiv.style.marginTop = "3px"
        this.imgDiv.style.backgroundSize = "cover"
        this.imgDiv.style.backgroundPosition = "center"

        this.imgDiv.classList.add("imgDiv")

        this.element.appendChild(this.imgDiv)

        //정답 텍스트 추가
        this.answerDiv = document.createElement("div")
        this.answerDiv.style.fontSize = this.answerFontSize + "px"
        this.answerDiv.style.display = "flex"
        this.answerDiv.style.justifyContent = "center";
        this.answerDiv.style.alignItems = "center";
        this.answerDiv.style.width = "100%"
        this.answerDiv.style.height = "100%"
        this.answerDiv.style.fontWeight = "700"
        this.answerDiv.innerHTML = `${this.answer}`
        this.answerDiv.style.opacity = 0;
        this.answerDiv.style.fontFamily = "Malgun"
        this.answerDiv.style.lineHeight = "80px"
        this.answerDiv.style.marginBottom = this.marginBottomVal
        this.answerDiv.classList.add("answerDiv")

        this.element.appendChild(this.answerDiv)


        //클릭 이벤트
        this.element.addEventListener("click", (e) => {
            if (!this.isActive || this.isComplete) return;

            this.isComplete = true

            this.animation = AnimationHelper.Opacity(this.imgDiv, 1, 0, this.opacityDelay, () => {
                this.animation = AnimationHelper.Opacity(this.answerDiv, 0, 1, this.opacityDelay)
            })
            this.TriggerEvent("click-problem")
        })

        //---------------- 트리거 이벤트 ---------------
        this.eventEmitter.on("click-problem", (data) => {
            if (this.priorityStandardList[this.priorityStandardIdx] == this.answerCnt) {
                this.priorityStandardIdx++

                if (this.priorityStandardList[this.priorityStandardIdx] >= this.priorityNum && this.isComplete == false) {
                    this.Activate()
                }
            }

            this.answerCnt++
        });
        //---------------------------------------------
    }

    TriggerEvent(type, data) {
        this.eventEmitter.emit(type, data);
    }

    Activate(isStyle = true) {
        this.isActive = true

        if (isStyle) {
            this.imgDiv.style.opacity = 1;
            this.imgDiv.style.backgroundImage = `url(${this.blueQimgPath})`
            this.element.style.border = this.activeBorder
        }
    }

    DeActivate(isStyle = false) {
        this.isActive = false

        if (isStyle) {
            this.imgDiv.style.opacity = 1;
            this.imgDiv.style.backgroundImage = `url(${this.grayQimgPath})`
            this.element.style.border = this.deActiveBorder
        }
    }

    Clear() {
        if (this.animation) {
            this.animation.pause()
            this.animation.reset();
        }
        
        this.isFocus = false
        this.isComplete = false
        this.answerCnt = 0
        this.priorityStandardIdx = 0
        this.answerDiv.style.opacity = 0
        this.DeActivate(true)
    }
    
}
//#endregion

//#region 입력식 정답체크 기능
/** 입력식 정답체크 기능 */
export class WriteProblemController {
    constructor(element, eventEmitter) {
        this.element = element
        this.eventEmitter = eventEmitter

        this.answer = `000`
        this.answerMaxLength = 3
        this.answerFontSize = 62

        this.imgPath = MainEvent.ImgPath + "/common/pencil_icon.png"
        this.imgSize = {x: 56, y: 56}

        /** 클릭 사용가능 여부 */
        this.isActive = false

        /** 클릭 우선 순위 */
        this.priorityNum = 0;

        /** 완료 여부 */
        this.isComplete = false

        /** 포커스 여부 */
        this.isFocus = false

        /** 정오답을 체크 기능을 사용 하는지 */
        this.isUseAnswer = true

        this.answerCnt = 0

        this.priorityStandardList = [1000000];
        this.priorityStandardIdx = 0

        this.SuccessEvent
        this.FailEvent

        this.activeBorderColor = "rgba(242, 55, 43, 1)"
    }

    Init() {
        this.answerMaxLength = String(this.answer).length
        
        //이미지 추가
        this.imgDiv = document.createElement("div")
        this.imgDiv.style.backgroundImage = `url(${this.imgPath})`
        this.imgDiv.style.width = this.imgSize.x + "px"
        this.imgDiv.style.height = this.imgSize.y + "px"
        this.imgDiv.style.position = "absolute"
        this.imgDiv.style.opacity = 0;
        this.imgDiv.style.pointerEvents = "none"
        this.imgDiv.style.backgroundSize = "cover";
        this.imgDiv.style.backgroundPosition = "center";
        this.imgDiv.style.backgroundRepeat = "no-repeat";
        this.imgDiv.classList.add("imgDiv")

        this.element.appendChild(this.imgDiv)

        //정답 텍스트 추가
        this.answerDiv = document.createElement("div")
        this.answerDiv.style.fontSize = this.answerFontSize + "px"
        this.answerDiv.style.display = "flex"
        this.answerDiv.style.justifyContent = "center";
        this.answerDiv.style.alignItems = "center";
        this.answerDiv.innerHTML = ``
        this.answerDiv.style.outline = "none";
        this.answerDiv.style.width = "100%"
        this.answerDiv.style.height = this.element.height
        this.answerDiv.style.textAlign = "center"
        this.answerDiv.style.height = "80px";
        this.answerDiv.style.lineHeight = "80px";
        this.answerDiv.setAttribute("tabindex", "0")
        this.answerDiv.style.fontFamily = "Bbatang"
        this.answerDiv.classList.add("answerDiv")

        this.answerDiv.setAttribute("contenteditable", "false")
        this.answerDiv.setAttribute("inputmode", "none")

        this.element.appendChild(this.answerDiv)


        document.body.addEventListener("click", (e) => {
            e.stopPropagation()

            if (this.isFocus && this.isActive && this.isComplete == false) {
                this.isFocus = false

                this.answerDiv.blur();

                this.element.style.boxShadow = "";

                if (this.answerDiv.textContent == "") {
                    this.imgDiv.style.opacity = 1
                } else {
                    if (this.isUseAnswer) {
                        this.CheckAnswer()
                    }
                }
            }

            KeyBoardOff()
        })


        this.answerDiv.addEventListener("mousedown", (e) => {
            e.stopPropagation()
            e.preventDefault()
            this.answerDiv.blur();
        })

        //클릭 이벤트
        this.answerDiv.addEventListener("click", (e) => {
            e.stopPropagation()
            if (this.isActive == false || this.isComplete) return;

            let agent = navigator.userAgent;
            //모바일 체크
            let isMobile = /iphone|ipod|android|blackberry|windows phone|opera mini|iemobile|mobile/i.test(agent);
            
            // iPad IOS 13버전 이후로는 웹 형식으로 나와서 별도 비교 로직 추가
            let isIpad = /iPad|Macintosh/.test(agent) && 'ontouchend' in document;
            
            if (isMobile || isIpad) {
                this.SetCustomKeyBoard(this.element);
                KeyBoardOn();
            }

            this.TriggerEvent("click-problem")
            this.element.style.boxShadow = "rgb(255, 255, 0) 0px -1px 15px";

            this.isFocus = true
            this.imgDiv.style.opacity = 0

            setTimeout(() => {
                this.answerDiv.textContent = ""
                this.answerDiv.focus();
                this.TriggerEvent("check-answer")
            }, 0)
            
            
        })

        //키보드 누를때
        this.answerDiv.addEventListener('keydown', (event) => {
            if (!this.isActive || this.isComplete) {
                event.preventDefault();
                return;
            }

            if (!isNaN(event.key)) {
                //입력 제한수 보다 적을때만 입력
                if (this.answerDiv.textContent.length < this.answerMaxLength) {
                    this.imgDiv.style.opacity = 0                    
                } else {
                    event.preventDefault();
                }
            }
        });

        //키보드 입력될 때
        this.answerDiv.addEventListener('input', (event) => {
            const currentValue = this.answerDiv.textContent;
        
            // 숫자만
            const filteredValue = currentValue.replace(/[^0-9]/g, '');
        
            // 커서 위치 저장
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const cursorPosition = range.startOffset;
        
            // 필터링된 값으로 업데이트
            this.answerDiv.textContent = filteredValue;
        
            // 커서 위치를 다시 설정
            const newRange = document.createRange();
            newRange.setStart(this.answerDiv.childNodes[0] || this.answerDiv, Math.min(cursorPosition, filteredValue.length));
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);

            if (this.isUseAnswer) {
                //입력 글자 같으면 정답 비교
                if (this.answerDiv.textContent.length == this.answerMaxLength) this.CheckAnswer()
            }
        });

        
        
        //---------------- 트리거 이벤트 ---------------
        this.eventEmitter.on("click-problem", (data) => {
            if (this.answerDiv.textContent === "" && this.isActive == true) {
                this.imgDiv.style.opacity = "1"
            }

            this.element.style.boxShadow = "";

            this.isFocus = false
        });

        this.eventEmitter.on("check-answer", (data) => {
            if (this.isUseAnswer && this.answerDiv.textContent != "" && this.isComplete == false && this.isActive) {
                this.CheckAnswer()
            }
        });

        this.eventEmitter.on("write-problem", (data) => {
            if (this.priorityStandardList[this.priorityStandardIdx] == this.answerCnt) {
                this.priorityStandardIdx++

                if (this.priorityStandardList[this.priorityStandardIdx] >= this.priorityNum && this.isComplete == false) {

                    this.Activate()
                }
            }

            this.answerCnt++
        })
        //---------------------------------------------
    }

    TriggerEvent(type, data) {
        this.eventEmitter.emit(type, data);
    }

    Activate(isStyle = true) {
        this.isActive = true

        if (isStyle) {
            this.imgDiv.style.opacity = 1;
            this.answerDiv.setAttribute("contenteditable", "true")

            let computedStyle = window.getComputedStyle(this.element);
            let borderWidth = computedStyle.getPropertyValue('border-width')

            this.element.style.border = borderWidth + " solid " + this.activeBorderColor
        }
    }

    DeActivate(isStyle = false) {
        this.isActive = false

        if (isStyle) {
            this.imgDiv.style.opacity = 0;

            let computedStyle = window.getComputedStyle(this.element);
            let borderWidth = computedStyle.getPropertyValue('border-width')

            this.element.style.border = borderWidth + " solid rgba(191, 199, 218, 1)"
        }
    }

    CheckAnswer() {
        this.answerDiv.blur()
        
        if (this.answerDiv.textContent == this.answer) {
            this.isComplete = true
            this.element.style.boxShadow = ""
            this.TriggerEvent("write-problem")
            if (this.SuccessEvent) {
                this.SuccessEvent()
            }
            
        } else {
            this.isActive = false
            this.animation = AnimationHelper.Wrong(this.answerDiv, () => {
                if (this.FailEvent) {
                    this.FailEvent()
                } else {
                    this.answerDiv.textContent = ""
                    this.imgDiv.style.opacity = 1
                }
                this.isActive = true
            })
        }
    }

    SetCustomKeyBoard() {
        let btnList = document.querySelectorAll(".key-btn")
        let keyboard = document.querySelector(".keyboard")

        keyboard.addEventListener("click", (e) => {
            e.stopPropagation()
        })
    
        btnList.forEach((element, index) => {
            element = RemoveListener(element)

            element.addEventListener("click", (event) => {
                event.preventDefault();  
                event.stopPropagation();    
                AnimationHelper.BtnClick(element)
                this.imgDiv.style.opacity = 0

                if (element.getAttribute("data-num") == "del") {
                    this.answerDiv.textContent = this.answerDiv.textContent.slice(0, -1);
                    return
                }

                //입력 제한수와 같다면 (제한 수보다 더 긴 수를 입력하면)
                if (this.answerDiv.textContent.length === this.answerMaxLength) {
                    //this.CKOverEvent()
                }

                //입력 제한수 보다 적을때만 입력
                else if (this.answerDiv.textContent.length < this.answerMaxLength) {
                    
                    //this.element.style.backgroundImage = `url()`
                    this.answerDiv.textContent +=  element.getAttribute("data-num");

                    if (this.isUseAnswer) {
                        //입력 글자 같으면 정답 비교
                        if (this.answerDiv.textContent.length == this.answerMaxLength && this.answer) this.CheckAnswer()
                    }
                    
                }
            })
        })
    }

    Clear() {
        if (this.animation) {
            this.animation.pause()
            this.animation.reset();
        }

        this.element.style.boxShadow = ""
        this.isFocus = false
        this.imgDiv.style.opacity = 0;
        this.answerDiv.textContent = ""
        this.isComplete = false
        this.answerCnt = 0
        this.priorityStandardIdx = 0

        this.DeActivate(true)
    }
}
//#endregion
