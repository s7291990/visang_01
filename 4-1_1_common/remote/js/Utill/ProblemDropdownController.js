import MainEvent from "../Activity/MainEvent.js";

export class ProblemDropdownController {
    constructor(element, eventEmitter) {
        this.element = element
        this.eventEmitter = eventEmitter


        this.UpimgPath = MainEvent.ImgPath + "common/dropup.png"
        this.DownimgPath = MainEvent.ImgPath + "common/dropdown.png"
        this.imgSize = {x: 30, y: 30}

        /** 정답 */
        this.answer = 0
        this.userAnswer = 0
        
        this.defaultAnswerText = ""
        this.answerFontSize = 40

        /** 선택자 리스트 */
        this.selectAnswerList = [0, 1, "<span style='font-family:Malgun'>한글</span>"]

        /** 클릭 사용가능 여부 */
        this.isActive = false

        /** 완료 여부 */
        this.isComplete = false

        /** 포커스 여부 */
        this.isFocus = false

        /** 정오답을 체크 기능을 사용 하는지 */
        this.isUseAnswer = true

        /** 클릭 우선 순위 */
        this.priorityNum = 0;

        this.priorityStandardList = [1000000];
        this.priorityStandardIdx = 0
        this.answerCnt = 0

        /** 셀렉터 오픈 여부 */
        this.isSelectorOpen = false

        this.SuccessEvent
        this.FailEvent
        

        this.SelectorClickEvent = () => {}
    }

    Init() {
        this.SetElement()
        this.SetSelectContainer()

        document.body.addEventListener("click", (e) => {
            e.stopPropagation()

            if (this.isFocus && this.isActive && this.isComplete == false) {
                this.isFocus = false
                this.isSelectorOpen = true
                this.ToggleControll()

                if (this.answerDiv.textContent == "") {
                    
                } else {
                    if (this.isUseAnswer) {
                        
                    }
                }
            }
        })

        this.element.addEventListener("click", (e) => {
            e.stopPropagation()
            if (this.isActive == false || this.isComplete) return;

            this.ToggleControll()
            
            this.TriggerEvent("click-selector-before")
            this.isFocus = true
            this.TriggerEvent("click-selector")
        })

        //---------------- 트리거 이벤트 ---------------
        this.eventEmitter.on("click-selector-before", (data) => {
            this.isFocus = false
        });

        this.eventEmitter.on("click-selector", (data) => {
            if (!this.isFocus) {
                this.isSelectorOpen = true
                this.ToggleControll()
            }
        });

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

    ToggleControll() {
        this.isSelectorOpen = !this.isSelectorOpen
        this.selectContainer.style.display = this.isSelectorOpen ? "flex" : "none"
        this.imgDiv.style.backgroundImage = `url(${this.isSelectorOpen ? this.UpimgPath : this.DownimgPath})`
    }

    TriggerEvent(type, data) {
        this.eventEmitter.emit(type, data);
    }

    Activate(isStyle = true) {
        this.isActive = true

        if (isStyle) {
            this.element.style.backgroundColor = "#5090EA"
        }
    }

    DeActivate(isStyle = false) {
        this.isActive = false

        if (this.isSelectorOpen) this.ToggleControll()

        if (isStyle) {
            this.element.style.backgroundColor = "#dfdfdf"
        }
    }

    SetSelectContainer() {
        if (this.selectContainer) this.selectContainer.remove()

        // display:none 했을 경우 대비해서 엘리먼트 크기 기록
        if (!this.elementWidth && !this.elementHeight) {
            this.elementWidth = this.element.offsetWidth
            this.elementHeight = this.element.offsetHeight
        }

        //셀렉트 컨테이너 추가
        this.selectContainer = document.createElement("div")
        this.selectContainer.style.width = this.elementWidth - 30 + "px"
        this.selectContainer.style.height = this.selectAnswerList.length * 43 - 1 + "px"
        this.selectContainer.style.marginTop = this.selectAnswerList.length * 43 + this.elementHeight + 5 + "px"
        this.selectContainer.classList.add("selectContainer")


        //셀렉터 추가
        this.selectorList = []
        this.selectAnswerList.forEach((element, index) => {
            this.selector = document.createElement("div")

            this.selector.style.fontFamily = "Bbatang"
            this.selector.innerHTML = element

            this.selector.classList.add("selector")
            this.selectContainer.appendChild(this.selector)
            this.selectorList.push(this.selector)
        })

        //셀렉터 클릭 이벤트
        this.selectorList.forEach((element, index) => {
            element.addEventListener("click", (e) => {
                this.userAnswer = this.selectAnswerList[index]
                this.answerDiv.innerHTML = this.selectAnswerList[index]

                this.selectorList.forEach((el2, idx) => {
                    el2.style.backgroundColor = ""
                    el2.style.borderRadius = ""

                    if (element == el2) {
                        //선택된 대상 색상 표기
                        el2.style.backgroundColor = "#E6E9F0"
                        
                        //첫번째와 마지막에 borde-radius 주기
                        if (index == 0) {
                            el2.style.borderTopLeftRadius = "8px"
                            el2.style.borderTopRightRadius = "8px"
                        } else if (index == this.selectorList.length - 1) {
                            el2.style.borderBottomLeftRadius = "8px"
                            el2.style.borderBottomRightRadius = "8px"
                        }
                    }
                })

                this.SelectorClickEvent(this)
            })
        })


        this.element.appendChild(this.selectContainer)
    }

    SetElement() {
        //정답 박스 추가
        this.answerContainer = document.createElement("div")
        this.answerContainer.style.width = this.element.offsetWidth - 30 + "px"
        this.answerContainer.classList.add("dropdown-answer-container")

        this.answerDiv = document.createElement("div")
        this.answerDiv.style.fontSize = this.answerFontSize + "px"
        this.answerDiv.innerHTML = this.defaultAnswerText
        this.answerDiv.style.fontFamily = "Bbatang"
        this.answerDiv.classList.add("dropdown-answer-div")
        
        this.answerContainer.appendChild(this.answerDiv)
        this.element.appendChild(this.answerContainer)

        //이미지 추가
        this.imgDiv = document.createElement("div")
        this.imgDiv.style.backgroundImage = `url(${this.DownimgPath})`
        this.imgDiv.style.width = this.imgSize.x + "px"
        this.imgDiv.style.height = this.imgSize.y + "px"
        this.imgDiv.classList.add("dropdown-img-div")

        this.element.appendChild(this.imgDiv)
    }

    Clear() {
        if (this.animation) {
            this.animation.pause()
            this.animation.reset();
        }
        
        this.isFocus = false
        this.isComplete = false
        this.answerDiv.textContent = ""
        this.answerCnt = 0
        this.priorityStandardIdx = 0
        this.SetSelectContainer()
        this.DeActivate(true)
    }
}