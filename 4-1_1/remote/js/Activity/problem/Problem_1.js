import { NumToArray } from "../../Utill/ArrayUtill.js";
import EventEmitter from "../../Utill/EventEmitter.js";
import { RemoveListener } from "../../Utill/EventListenerHelper.js";
import { ProblemWriteController } from "../../Utill/ProblemWriteController.js"
import { GetRandomValue } from "../../Utill/RandomUtill.js";
import MainEvent from "../MainEvent.js";

export default class Problem_1 {
    constructor() {
        this.problem1 = document.querySelector("#problem1")

        this.p1_value1 = document.querySelector("#p1_value1")
        this.p1_value2 = document.querySelector("#p1_value2")

        this.problem1_reset = document.querySelector("#problem1_reset")
    }

    Init() {
        this.SetEvent()

        
    }

    SetObject() {
        this.value1 = GetRandomValue(100, 999)
        this.value2 = GetRandomValue(1, 4)


        this.value1List = NumToArray(this.value1)

        this.inputAnswerList_1 = []

        this.inputAnswerList_1.push(this.value1List[0] * this.value2)
        this.inputAnswerList_1.push(this.value1List[1] * this.value2)
        this.inputAnswerList_1.push(this.value1List[2] * this.value2)

        this.answer = this.value1 * this.value2
        this.answerArrayList = NumToArray(this.answer)

        if (this.answerArrayList.length > 3) {
            let mergedValue = parseInt(this.answerArrayList.slice(0, -2).join(''));
            this.answerArrayList = [mergedValue, ...this.answerArrayList.slice(-2)];
        }

        //this.inputAnswerList_1 = [this.answerArrayList[0], this.answerArrayList[1], this.answerArrayList[2]]

        this.p1_value1.textContent = this.value1
        this.p1_value2.textContent = this.value2
    }

    SetProblem() {
        this.ProblemList1 = []

        this.problemEmmiter = new EventEmitter()

        this.priorityStandardList_1 = [2]
        this.inputBoxList_1 = this.problem1.querySelectorAll(".p1_1")

        this.inputBoxList_1.forEach((element, index) => {
            element.innerHTML = ""
            element = RemoveListener(element)

            let problemCtrl = new ProblemWriteController(element, this.problemEmmiter)
            problemCtrl.priorityStandardList = this.priorityStandardList_1
            problemCtrl.answer = this.inputAnswerList_1[index]

            if (index == 0) problemCtrl.activeBorderColor = "#54A318"
            else if (index == 1) problemCtrl.activeBorderColor = "#177AF2"
            
            problemCtrl.priorityNum = index

            problemCtrl.Init()

            this.ProblemList1.push(problemCtrl)
        })   
    }

    SetEvent() {
        this.problem1_reset.addEventListener("click", (e) => {
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
        //MainEvent.embed1.querySelector('.number_reset').click()

        this.SetObject()
        this.SetProblem()
    }

}