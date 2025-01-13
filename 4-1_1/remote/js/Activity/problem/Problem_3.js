import { FillBlankArray, NumToArray } from "../../Utill/ArrayUtill.js"
import EventEmitter from "../../Utill/EventEmitter.js"
import { RemoveListener } from "../../Utill/EventListenerHelper.js"
import { ProblemWriteController } from "../../Utill/ProblemWriteController.js"
import { GetRandomValue } from "../../Utill/RandomUtill.js"
import MainEvent from "../MainEvent.js"

export default class Problem_3 {
    constructor() {
        this.problem3 = document.querySelector("#problem3")

        this.p3_inputZone1 = document.querySelector("#p3_inputZone1")
        this.p3_inputZone2 = document.querySelector("#p3_inputZone2")
        this.p3_inputZone3 = document.querySelector("#p3_inputZone3")
        this.p3_inputZone4 = document.querySelector("#p3_inputZone4")

        this.chapter3_reset = document.querySelector("#problem3_reset")

        this.pb3_line = document.querySelector("#pb3_line")
    }

    Init() {
        this.rowCnt = 4


        this.SetEvent()
    }

    SetObject() {
        this.value1 = GetRandomValue(100, 999)
        this.value2 = GetRandomValue(1, 4)

        this.inputDiv1List = []
        this.inputDiv2List = []

        this.value1Array = NumToArray(this.value1)
        this.value2Array = NumToArray(this.value2)

        this.value1ArrayReverse = NumToArray(this.value1).reverse()

        //올림 수 세팅
        this.answer1Array = [""]
        this.value1ArrayReverse.forEach((element, index) => {
            //올림수 자리까지 더한 값
            let calcNumber = element * this.value2 + this.answer1Array[0]

            //10보다 크고 자리수(임시 4자리)의 첫자리는 제외한다
            if (calcNumber >= 10 && index != this.value1ArrayReverse.length - 1) {
                this.answer1Array.unshift(Math.floor(calcNumber / 10))
            } else {
                this.answer1Array.unshift("")
            }
        })

        this.answer1Array.forEach((element, index) => {
            let inputBox = document.createElement("div")
            inputBox.style.width = "80px"
            inputBox.style.height = "80px"
            inputBox.style.border = "6.4px solid rgba(191, 199, 218, 1)"
            inputBox.classList.add("writeBox")

            if (element === "" ) {
                inputBox.style.visibility = "hidden"
                inputBox.classList.add("hide")
            }
    
            this.inputDiv1List.push(inputBox)
            this.DivParentPush(inputBox, this.p3_inputZone1)
        })

        //곱하는 수 세팅
        this.answer2Array = FillBlankArray(this.value1Array, this.rowCnt, true)
        
        this.answer2Array.forEach((element, index) => {
            let div = document.createElement("div")
            div.style.fontSize = "65px"
            div.style.fontFamily = "Bbatang"
            div.textContent = element
          
            this.p3_inputZone2.appendChild(div)
            this.DivParentPush(div, this.p3_inputZone2)
        })
        
        // 곱해지는 수 세팅
        this.answer3Array = FillBlankArray(this.value2Array, this.rowCnt, true)
        this.answer3Array[0] = "×"
        
        this.answer3Array.forEach((element, index) => {
            let div = document.createElement("div")
            div.style.fontSize = "65px"
            div.style.fontFamily = "Bbatang"
            div.textContent = element
          
            this.DivParentPush(div, this.p3_inputZone3)
        })

        //정답 세팅
        this.answer = this.value1 * this.value2
        this.answerArray = FillBlankArray(NumToArray(this.answer), this.rowCnt, true)

        this.pb3_line.style.clipPath = ""
        this.answerArray.forEach((element, index) => {
            let inputBox = document.createElement("div")
            inputBox.style.width = "100px"
            // inputBox.style.height = "100px"
            inputBox.classList.add("writeBox")

            if (element === "") {
                inputBox.style.visibility = "hidden"
                inputBox.classList.add("hide")
                this.pb3_line.style.clipPath = "polygon(20% 0%, 100% 0, 100% 100%, 20% 100%)"
            }

            this.inputDiv2List.push(inputBox)
    
            this.DivParentPush(inputBox, this.p3_inputZone4)
        })
        
    }

    DivParentPush(valEl, pushEl) {
        let spaceParent = document.createElement("div")
        spaceParent.classList.add("calcSpace")

        spaceParent.appendChild(valEl)

        pushEl.appendChild(spaceParent)
    }


    SetProblem() {

        this.ProblemList1 = []
        this.inputBoxList = []
        this.inputAnswerList = []

        /* 올림수 영역 위치 체크 변수 */
        this.optionCaseIdxList = []

        /** 우선순위 증가 시키는 인덱스 범위 */
        this.priorityStandardList_1 = []
        this.priority = 0

        for (let i = this.rowCnt - 1; i >= 0 ; i--) {
            if (!this.inputDiv2List[i].classList.contains("hide")) {
                this.inputBoxList.push(this.inputDiv2List[i])
                this.inputAnswerList.push(this.answerArray[i])
            }

            if (this.inputDiv1List[i - 1]) {
                if (!this.inputDiv1List[i-1].classList.contains("hide")) {
                    this.inputBoxList.push(this.inputDiv1List[i-1])
                    this.inputAnswerList.push(this.answer1Array[i-1])

                    this.optionCaseIdxList.push(this.inputBoxList.length - 1)
                }
            }

            // if (this.priorityStandardList_1[this.priorityStandardList_1.length - 1] != this.inputBoxList.length - 1) {
            //     this.priorityStandardList_1.push(this.inputBoxList.length - 1)
            // }
        }

        this.priorityStandardList_1.push(this.inputBoxList.length - 1)

        this.problemEmmiter = new EventEmitter()

        this.inputBoxList.forEach((element, index) => {
            element = RemoveListener(element)

            let problemCtrl = new ProblemWriteController(element, this.problemEmmiter)
            problemCtrl.priorityStandardList = this.priorityStandardList_1
            problemCtrl.answer = this.inputAnswerList[index]

            //올림수 영역이라면
            if (this.optionCaseIdxList.includes(index)) {
                problemCtrl.imgSize = {x: 44.8, y: 44.8}
                problemCtrl.answerFontSize = 43
            }
            
            problemCtrl.priorityNum = index

            problemCtrl.Init()

            this.ProblemList1.push(problemCtrl)
        })   
    }

    SetEvent() {
        this.chapter3_reset.addEventListener("click", (e) => {
            this.Clear()
        })
    }

    Reset() {
        this.ProblemList1.forEach((problem, index) => {
            problem.answerDiv.textContent = ""

            if (problem.animation) {
                problem.animation.pause()
                problem.animation.reset();

                problem.isActive = true
            }

            problem.isComplete = false
            problem.answerCnt = 0
            problem.priorityStandardIdx = 0

            if (problem.isActive) {
                problem.imgDiv.style.opacity = "1"
                problem.Activate()
            }
        })
    }

    Clear() {
        MainEvent.embed1.querySelector('.number_reset').click()

        this.p3_inputZone1.innerHTML = ""
        this.p3_inputZone2.innerHTML = ""
        this.p3_inputZone3.innerHTML = ""
        this.p3_inputZone4.innerHTML = ""

        this.ProblemList1 = []

        this.SetObject()
        this.SetProblem()
    }

}