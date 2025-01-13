import EventEmitter from "../../Utill/EventEmitter.js"
import { RemoveListener } from "../../Utill/EventListenerHelper.js"
import { ProblemWriteController } from "../../Utill/ProblemWriteController.js"
import { GetRandomValue } from "../../Utill/RandomUtill.js"
import MainEvent from "../MainEvent.js"

export default class Problem_2 {
    constructor() {
        this.problem2 = document.querySelector("#problem2")

        this.p2_value1 = document.querySelector("#p2_value1")
        this.p2_value2 = document.querySelector("#p2_value2")
        this.p2_value3 = document.querySelector("#p2_value3")
        this.p2_value4 = document.querySelector("#p2_value4")
        this.p2_value5 = document.querySelector("#p2_value5")

        this.problem2_reset = document.querySelector("#problem2_reset")

        this.problem_container = document.querySelectorAll(".problem2_container")
    }

    Init() {
        this.answerCnt = 0;

        this.SetEvent()
    }

    SetObject() {
        this.value1_1 = String(GetRandomValue(1, 4))
        this.value1_2 = String(GetRandomValue(0, 4))
        this.value1_3 = String(GetRandomValue(0, 4))

        this.value1 = Number(this.value1_1 + this.value1_2 + this.value1_3)
        this.value2 = GetRandomValue(100, 999)
        this.value3 = GetRandomValue(100, 999)

        this.p2_value1.textContent = this.value1
        this.p2_value2.textContent = this.value1
        this.p2_value3.textContent = this.value1

        this.p2_value4.textContent = this.value2
        this.p2_value5.textContent = this.value3

        this.multiVal1Arr = [this.value1, this.value2, this.value3]
        this.multiVal2Arr = [2, 3, 4, 2, 2]

        this.multiValObj = {}
        this.multiValObj[this.value1] = [2, 3, 4]
        this.multiValObj[this.value2] = [2]
        this.multiValObj[this.value3] = [2]

        this.answerList1 = [
            this.value1 * this.multiVal2Arr[0],
            this.value1 * this.multiVal2Arr[1],
            this.value1 * this.multiVal2Arr[2],
            this.value2 * this.multiVal2Arr[3],
            this.value3 * this.multiVal2Arr[4],
        ]

    }

    SetProblem() {
        this.ProblemList1 = []
        this.ProblemObj1 = {}
        
        this.ProblemObj1[this.value1] = []
        this.ProblemObj1[this.value2] = []
        this.ProblemObj1[this.value3] = []

        this.problemEmmiter = new EventEmitter()

        this.priorityStandardList_1 = [2]
        this.inputBoxList_1 = this.problem2.querySelectorAll(".p2_1")

        this.inputBoxList_1.forEach((element, index) => {
            element.innerHTML = ""
            element = RemoveListener(element)

            let problemCtrl = new ProblemWriteController(element, this.problemEmmiter)

            problemCtrl.answer = this.answerList1[index]
            
            problemCtrl.priorityNum = index

            problemCtrl.SuccessEvent = () => {
                if (index >= 2) 
                    MainEvent.embed1.querySelector('.number_reset').click()
                this.answerCnt++
                this.problem_container[this.answerCnt].style.opacity = "1"
            }

            problemCtrl.Init()

            if (index <= 2) {
                this.ProblemObj1[this.value1].push(problemCtrl)
            } else if (index == 3) {
                this.ProblemObj1[this.value2].push(problemCtrl)
            } else if (index == 4) {
                this.ProblemObj1[this.value3].push(problemCtrl)
            }

            this.ProblemList1.push(problemCtrl)

        })   

    }

    SetEvent() {
        this.problem2_reset.addEventListener("click", (e) => {
            this.Clear()
        })

        this.problem_container.forEach((element, index) => {
            if (index != 0) {
                element.style.opacity = "0"
            } else {
                element.style.opacity = "1"
            }
        })
    }

    Reset() {
        this.ProblemObj1[this.value1].forEach((problem, index) => {
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
                problem.Clear()
            }
        })

        this.ProblemObj1[this.value2].forEach((problem, index) => {
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
                problem.Clear()
            }
        })

        this.ProblemObj1[this.value3].forEach((problem, index) => {
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
                problem.Clear()
            }
        })

        this.answerCnt = 0;
        MainEvent.embed1.querySelector('.number_reset').click()
    }

    Clear() {
        
        this.SetObject()
        this.SetProblem()
        
        MainEvent.embed1.querySelector('.number_reset').click()

        if (this.ProblemList1) {
            this.ProblemList1.forEach((problem, index) => {
                problem.Clear()
            })
        }

        this.problem_container.forEach((element, index) => {
            if (index != 0) {
                element.style.opacity = "0"
            } else {
                element.style.opacity = "1"
            }
        })

        this.answerCnt = 0;
    }

}