import MainEvent from "../Activity/MainEvent.js";
import { AnimationHelper } from "./AnimationHelper.js";
import { RemoveListener } from "./EventListenerHelper.js";
import { KeyBoardOff, KeyBoardOn } from "./KeyBoard.js";

//#region 입력식 정답체크 기능
/** 입력식 정답체크 기능 */
export class ProblemWriteController {
    constructor(element, eventEmitter) {
        this.element = element
        this.eventEmitter = eventEmitter

        this.answer = `000`
        this.answerMaxLength = String(this.answer).length
        this.answerFontSize = 34

        this.imgPath = MainEvent.ImgPath + "/common/pencil_icon.png"
        this.imgSize = {x: 34, y: 34}

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

        /** 키보드 정규식 타입 구분 (korean, number) + 필요시 별도 추가 */
        this.keyBoardType = "number"
        /** 키보드 타입이 한글일때 마지막 값 입력수 체크 */
        this.inputHangulCnt = 0

        this.defaultFontFamily = "Bbatang"

        this.answerDivHeight = 80
        this.answerDivLineHeight = 80

        this.InputEvent = () => {}
        this.SuccessEvent = () => {}
        this.FailEvent = () => {}
    }

    Init() {
        this.answerMaxLength = String(this.answer).length
        
        this.SetElement()


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

            //입력박스에 값이 없으면 높이값으로 한다
            this.answerDiv.style.lineHeight = this.answerDivHeight + "px"

            let agent = navigator.userAgent;
            //모바일 체크
            this.isMobile = /iphone|ipod|android|blackberry|windows phone|opera mini|iemobile|mobile/i.test(agent);
            
            // iPad IOS 13버전 이후로는 웹 형식으로 나와서 별도 비교 로직 추가
            this.isIpad = /iPad|Macintosh/.test(agent) && 'ontouchend' in document;
            
            if ((this.isMobile || this.isIpad) && this.keyBoardType == "number") {
                this.SetCustomKeyBoard(this.element);
                KeyBoardOn();
            }

            this.TriggerEvent("click-problem")
            this.element.style.boxShadow = "rgb(255, 255, 0) 0px -1px 15px";

            this.isFocus = true
            this.imgDiv.style.opacity = 0

            setTimeout(() => {
                this.answerDiv.textContent = ""

                //한글 입력시 값이 남는 현상 수정을 위해 추가
                this.answerDiv.focus();
                this.answerDiv.blur();
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
        });

        //키보드 입력될 때
        this.answerDiv.addEventListener('input', (event) => {
            if (this.answerDiv.textContent.length >= this.answerMaxLength) {
                const selection = window.getSelection();
                const range = document.createRange();

                this.answerDiv.textContent = this.answerDiv.textContent.substring(0, this.answerMaxLength);

                range.selectNodeContents(this.answerDiv);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);

            }


            const currentValue = this.answerDiv.textContent;
            this.imgDiv.style.opacity = 0

            let filteredValue;
            if (this.keyBoardType == "number") {
                // 정규식 숫자랑 .만
                filteredValue = currentValue.replace(/[^0-9.]/g, '');
            } else if (this.keyBoardType == "korean") {
                // 한글
                filteredValue = currentValue.replace(/[^\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF\s]/g, '')
            }

            this.answerDiv.textContent = filteredValue;

            if (this.answerDiv.textContent.length == "") {
                this.answerDiv.style.lineHeight = this.answerDivHeight + "px"
            } else {
                this.answerDiv.style.lineHeight = this.answerDivLineHeight + "px"
            }

            if (this.isUseAnswer) {
                //키보드 타입이 숫자일때
                if (this.keyBoardType == "number") {
                    if (this.answerDiv.textContent.length == this.answerMaxLength) this.CheckAnswer()
                }
                //키보드 타입이 한글일때
                else if (this.keyBoardType == "korean") {
                    if (this.answerDiv.textContent.length > this.answerMaxLength) {
                        return
                    }
                    if (this.answerDiv.textContent.length == this.answerMaxLength) {
                        this.inputHangulCnt++
    
                        //정답이랑 일치할때
                        if (this.answerDiv.textContent == this.answer) {
                            this.CheckAnswer()
                        }
    
                        //글자수 마지막에서 글자가 완성되었을 때
                        if (this.inputHangulCnt == 3 && this.answerDiv.textContent != this.answer) {
                            this.CheckAnswer()
                        }
                        
                    } 
                    //글자수 보다 많이 입력했을 때
                    else if (this.answerDiv.textContent.length > this.answerMaxLength) {
                        this.CheckAnswer()
                    }
                }    
            }

            this.InputEvent(this)
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

            this.element.style.backgroundColor = "white"

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

    SetAnswerText(answer) {
        this.answer = answer
        this.answerMaxLength = String(answer).length
    }

    CheckAnswer() {
        this.answerDiv.blur()

        if (this.keyBoardType == "korean") this.inputHangulCnt = 0
        
        if (this.answerDiv.textContent == this.answer) {
            if ((this.isMobile || this.isIpad) && this.keyBoardType == "number") KeyBoardOff();
            this.isComplete = true
            this.element.style.boxShadow = ""
            this.TriggerEvent("write-problem")
            
            this.SuccessEvent(this)
            
            
        } else {
            this.isActive = false
            this.animation = AnimationHelper.Wrong(this.answerDiv, () => {
                if ((this.isMobile || this.isIpad) && this.keyBoardType == "number") KeyBoardOff();
                this.answerDiv.textContent = ""
                this.imgDiv.style.opacity = 1
                this.element.style.boxShadow = ""
                this.isActive = true
                this.FailEvent(this)
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

    SetElement() {
        //이미지 추가
        if (this.imgDiv) this.imgDiv.remove()
        this.imgDiv = document.createElement("div")
        this.imgDiv.style.backgroundImage = `url(${this.imgPath})`
        this.imgDiv.style.width = this.imgSize.x + "px"
        this.imgDiv.style.height = this.imgSize.y + "px"
        this.imgDiv.classList.add("write-img-div")

        this.element.appendChild(this.imgDiv)

        //정답 텍스트 추가
        if (this.answerDiv) this.answerDiv.remove()
        this.answerDiv = document.createElement("div")
        this.answerDiv.style.fontSize = this.answerFontSize + "px"
        this.answerDiv.innerHTML = ``
        this.answerDiv.style.fontFamily = this.defaultFontFamily
        this.answerDiv.setAttribute("tabindex", "-1")

        this.answerDiv.style.height = this.answerDivHeight + "px"
        
        //입력박스에 값이 없으면 높이값으로 한다
        this.answerDiv.style.lineHeight = this.answerDivHeight + "px"
        
        
        this.answerDiv.classList.add("write-answer-div")

        this.answerDiv.setAttribute("contenteditable", "false")
        this.answerDiv.setAttribute("autocomplete", "off")

        if (this.keyBoardType == "number") {
            this.answerDiv.setAttribute("inputmode", "none")
        }

        this.element.appendChild(this.answerDiv)
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
