import { FillBlankArray, NumToArray } from "../../Utill/ArrayUtill.js"
import EventEmitter from "../../Utill/EventEmitter.js"
import { ProblemWriteController } from "../../Utill/ProblemWriteController.js"
import { GetRandomValue } from "../../Utill/RandomUtill.js"
import MainEvent from "../MainEvent.js"

export default class Problem_4 {
    constructor() {
        this.problem4 = document.querySelector("#problem4")

        this.p4_inputZone1 = document.querySelector("#p4_inputZone1")
        this.p4_inputZone2 = document.querySelector("#p4_inputZone2")
        this.p4_inputZone3 = document.querySelector("#p4_inputZone3")
        this.p4_inputZone4 = document.querySelector("#p4_inputZone4")

        this.problem4_reset = document.querySelector("#problem4_reset")

        this.pb4_line = document.querySelector("#pb4_line")
    }

    Init() {
        this.value1
        this.value2

        this.rowCnt = 4
        
        // this.SetObject()

        this.ProblemList1 = []
        // this.SetProblem()

        this.SetEvent()
    }

    SetObject() {
        this.inputDiv1List = []
        this.inputDiv2List = []

        this.value1Array = NumToArray(this.value1)
        this.value2Array = NumToArray(this.value2)

        this.value1ArrayReverse = NumToArray(this.value1).reverse()

        //올림 수 세팅
        this.answer1Array = [""]
        this.value1ArrayReverse.forEach((element, index) => {
            //이전에 계산된 올림수 자리까지 더한 값
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
            this.DivParentPush(inputBox, this.p4_inputZone1)
        })

        //곱하는 수 세팅
        this.answer2Array = FillBlankArray(this.value1Array, this.rowCnt, true)
        
        this.answer2Array.forEach((element, index) => {
            let div = document.createElement("div")
            div.style.fontSize = "65px"
            div.style.fontFamily = "Bbatang"
            div.textContent = element
          
            this.DivParentPush(div, this.p4_inputZone2)
        })
        
        // 곱해지는 수 세팅
        this.answer3Array = FillBlankArray(this.value2Array, this.rowCnt, true)
        this.answer3Array[0] = "×"
        
        this.answer3Array.forEach((element, index) => {
            let div = document.createElement("div")
            div.style.fontSize = "65px"
            div.style.fontFamily = "Bbatang"
            div.textContent = element
          
            this.DivParentPush(div, this.p4_inputZone3)
        })

        //정답 세팅
        this.answer = this.value1 * this.value2
        this.answerArray = FillBlankArray(NumToArray(this.answer), this.rowCnt, true)

        this.pb4_line.style.clipPath = ""
        this.answerArray.forEach((element, index) => {
            let inputBox = document.createElement("div")
            inputBox.style.width = "100px"
            // inputBox.style.height = "100px"
            inputBox.classList.add("writeBox")

            if (element === "") {
                inputBox.style.visibility = "hidden"
                inputBox.classList.add("hide")
                this.pb4_line.style.clipPath = "polygon(20% 0%, 100% 0, 100% 100%, 20% 100%)"
            }

            this.inputDiv2List.push(inputBox)
    
            this.DivParentPush(inputBox, this.p4_inputZone4)
        })

        
    }

    DivParentPush(valEl, pushEl) {
        let spaceParent = document.createElement("div")
        spaceParent.classList.add("calcSpace")

        spaceParent.appendChild(valEl)

        pushEl.appendChild(spaceParent)
    }

    SetProblem() {

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
        this.problem4_reset.addEventListener("click", (e) => {
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
        this.p4_inputZone1.innerHTML = ""
        this.p4_inputZone2.innerHTML = ""
        this.p4_inputZone3.innerHTML = ""
        this.p4_inputZone4.innerHTML = ""

        this.ProblemList1 = []

        this.Reset()

        this.value1 = GetRandomValue(100, 999)
        this.value2 = GetRandomValue(1, 9)

        let event = new Event('input', {
            bubbles: true,
            cancelable: true
        });
        
        let sec1 = MainEvent.embed2.querySelector("#sec1")
        if (sec1.classList.contains("hid")) {
            let back = MainEvent.embed2.querySelector(".back")
            back.click()
            this.ClearEmbedEvent()
        }

        let val1 = MainEvent.embed2.querySelector("#input-3")
        val1.click()
        val1.dispatchEvent(event)

        let val2 = MainEvent.embed2.querySelector("#input-1")
        val2.click()
        val2.dispatchEvent(event)

        let btnDone = MainEvent.embed2.querySelector("#btnDone")
        btnDone.click()

        let sucard = MainEvent.embed2.querySelector('#enabledSel > button:nth-child(1)')
        sucard.click()

        this.SetObject()
        this.SetProblem()

    }
}