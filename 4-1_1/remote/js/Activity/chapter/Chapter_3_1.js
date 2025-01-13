import EventEmitter from "../../Utill/EventEmitter.js"
import { ProblemClickController } from "../../Utill/ProblemClickController.js"
import { SwitchController } from "../../Utill/SwitchController.js"
import MainEvent from "../MainEvent.js"

export default class Chapter_3_1 {
    constructor() {
        this.chapter3 = document.querySelector("#chapter3")

        this.chapter3_reset = document.querySelector("#chapter3_reset")

        this.c3_multiText = document.querySelector("#c3_multiText")
    }

    Init() {
        this.ProblemList1 = []
        this.SetProblem()

        this.SetEvent()
    }

    SetProblem() {
        this.problemEmmiter = new EventEmitter()

        /** 우선순위 증가 시키는 인덱스 범위 */
        this.priorityStandardList1 = [0, 1, 2, 3, 4]

        this.inputBoxList_1 = this.chapter3.querySelectorAll(".c3_1")

        this.answerList = ["만의 자리", "십만", "백만", "천만", "만"]
        this.answerFontSizeList = [44, 44, 44, 44, 44]

        this.inputBoxList_1.forEach((element, index) => {
            let problemCtrl = new ProblemClickController(element, this.problemEmmiter)
            problemCtrl.priorityStandardList = this.priorityStandardList1
            problemCtrl.priorityNum = index
            problemCtrl.opacityDelay = 0
            problemCtrl.blueQimgPath = MainEvent.ImgPath + "common/blue_big_btn_q.png"
            problemCtrl.grayQimgPath = MainEvent.ImgPath + "common/gray_big_btn_q.png"
            problemCtrl.imgSize = {x: 68, y: 70}

            problemCtrl.activeBorder = "7px solid #5090EA"
            problemCtrl.deActiveBorder = "7px solid #BFC7DA"

            problemCtrl.answer = this.answerList[index]
            problemCtrl.answerFontSize = this.answerFontSizeList[index]

            if (index == 2) {
                problemCtrl.marginBottomVal = "2px"
            }

            problemCtrl.Init()
            
            if (index <= this.priorityStandardList1[0]) {
                problemCtrl.Activate()
            }

            this.ProblemList1.push(problemCtrl)

            element.style.borderRadius = "28px"
            //클릭 이벤트
            element.addEventListener("click", (e) => {
                if (this.ProblemList1[index].isActive == false) {
                    return
                }

                switch(index) {
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        //this.c3_multiText.textContent = this.answerList[index]
                        break;
                    case 3:
                        //this.c3_multiText.textContent = this.answerList[index]
                        break;
                    case 4:
                        //this.c3_multiText.textContent = this.answerList[index]
                        break;
                    default:
                        break;
                }
            })
        })   
    }
    
    SetEvent() {
        this.chapter3_reset.addEventListener("click", (e) => {
            this.Reset()
        })
    }

    Reset() {
        console.log(this.c3_multiText)
        this.c3_multiText.textContent = ""

        this.ProblemList1.forEach((problem, index) => {
            problem.Clear()

            if (index <= this.priorityStandardList1[0]) {
                problem.Activate()
            }
        })
    }

    Clear() {
        this.Reset()
    }


}