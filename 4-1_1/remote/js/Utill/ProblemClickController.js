import MainEvent from "../Activity/MainEvent.js";
import { AnimationHelper } from "./AnimationHelper.js";
import { RemoveListener } from "./EventListenerHelper.js";
import { KeyBoardOff, KeyBoardOn } from "./KeyBoard.js";

//#region 클릭형 정답체크 기능
/** 클릭형 정답체크 기능 */
export class ProblemClickController {
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

        this.marginBottomVal = 0

        this.ClickEvent = () => {}
    }

    Init() {
        this.SetElement()


        //클릭 이벤트
        this.element.addEventListener("click", (e) => {
            if (!this.isActive || this.isComplete) return;

            this.isComplete = true

            this.animation = AnimationHelper.Opacity(this.imgDiv, 1, 0, this.opacityDelay, () => {
                this.animation = AnimationHelper.Opacity(this.answerDiv, 0, 1, this.opacityDelay)
            })
            this.TriggerEvent("click-problem")

            this.ClickEvent()
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

    SetElement() {
        //이미지 추가
        this.imgDiv = document.createElement("div")
        this.imgDiv.style.backgroundImage = `url(${this.blueQimgPath})`
        this.imgDiv.style.width = this.imgSize.x + "px"
        this.imgDiv.style.height = this.imgSize.y + "px"

        this.imgDiv.classList.add("click-img-div")

        this.element.appendChild(this.imgDiv)

        //정답 텍스트 추가
        this.answerDiv = document.createElement("div")

        //폰트 변경 & 스타일 커스텀시 this.answer값 태그로 전달 => <span class="Batang" style="font-size:40px">곱해지는 수</span>
        this.answerDiv.style.fontSize = this.answerFontSize + "px"
        this.answerDiv.style.fontFamily = "Malgunbd"
        this.answerDiv.style.marginBottom = this.marginBottomVal + "px"
        this.answerDiv.classList.add("click-answer-div")
        this.SetAnswerText(this.answer)

        this.element.appendChild(this.answerDiv)
    }

    SetAnswerText(text) {
        this.answer = text
        this.answerDiv.innerHTML = `${this.answer}`
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