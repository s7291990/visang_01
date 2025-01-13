
import EventEmitter from "../../Utill/EventEmitter.js"
import { RemoveListener } from "../../Utill/EventListenerHelper.js"
import { ProblemClickController } from "../../Utill/ProblemClickController.js"
import { ProblemWriteController } from "../../Utill/ProblemWriteController.js"
import { SwitchController } from "../../Utill/SwitchController.js"
import MainEvent from "../MainEvent.js"

export default class Chapter_1_1 {
    constructor() {
        this.chapter1 = document.querySelector("#chapter1")

        this.c1_embVal_1 = document.querySelector("#c1_embVal_1")
        this.c1_embVal_2 = document.querySelector("#c1_embVal_2")

        this.chapter1_reset = document.querySelector("#chapter1_reset")

        this.popup = document.querySelector("#popup")
    }

    Init() {
        this.ProblemList1 = []
        this.ProblemList2 = []

        this.SetProblem()
        this.SetProblem2()

        this.SetEvent()

    }

    SetProblem() {
        this.problemEmmiter_1 = new EventEmitter()

        /** 우선순위 증가 시키는 인덱스 범위 */
        this.priorityStandardList_1 = [0, 1]

        this.inputBoxList_1 = this.chapter1.querySelectorAll(".c1_1")

        this.answerList = ["다섯자리 수", "만의 자리"]
        this.answerFontSizeList = [34, 34]

        this.inputBoxList_1.forEach((element, index) => {
            let problemCtrl = new ProblemClickController(element, this.problemEmmiter_1)
            problemCtrl.priorityStandardList = this.priorityStandardList_1
            problemCtrl.priorityNum = index

            problemCtrl.answer = this.answerList[index]
            problemCtrl.answerFontSize = this.answerFontSizeList[index]

            problemCtrl.Init()

            this.ProblemList1.push(problemCtrl)

            //클릭 이벤트
            element.addEventListener("click", (e) => {
                switch(index) {
                    case 0:
                        break;
                    case 1:
                        // 버튼 활성화
                        let chapter1 = MainEvent.chapter.chapter_1_1
                        chapter1.ProblemList2.forEach((problem, index) => {
                            switch(index) {
                                case 0:
                                    problem.SetAnswerText("60000")
                                    problem.Activate()
                                    break;
                                case 1:
                                    problem.SetAnswerText("8000")
                                    problem.Activate()
                                    break;
                                case 2:
                                    problem.SetAnswerText("200")
                                    problem.Activate()
                                    break;
                                case 3:
                                    problem.SetAnswerText("60")
                                    problem.Activate()
                                    break;
                                case 4:
                                    problem.SetAnswerText("3")
                                    problem.Activate()
                                    break;
                                case 5:
                                    problem.keyBoardType = "korean"
                                    problem.SetAnswerText("육만")
                                    problem.Activate()
                                    break;
                                case 6:
                                    problem.keyBoardType = "korean"
                                    problem.SetAnswerText("팔천")
                                    problem.Activate()
                                    break;
                                case 7:
                                    problem.keyBoardType = "korean"
                                    problem.SetAnswerText("이백")
                                    problem.Activate()
                                    break;
                                case 8:
                                    problem.keyBoardType = "korean"
                                    problem.SetAnswerText("육십")
                                    problem.Activate()
                                    break;
                                case 9:
                                    problem.keyBoardType = "korean"
                                    problem.SetAnswerText("삼")
                                    problem.Activate()
                                    break;
                            }
                        })
                        break;
                    default:
                        break;
                }
            })
        })   
    }

    SetProblem2() {
        this.problemEmmiter_2 = new EventEmitter()

        /** 우선순위 증가 시키는 인덱스 범위 */
        this.priorityStandardList_2 = [0]

        this.inputBoxList_2 = this.chapter1.querySelectorAll(".c1_2")

        this.inputBoxList_2.forEach((element, index) => {
            let problemCtrl = new ProblemWriteController(element, this.problemEmmiter_2)
            problemCtrl.priorityStandardList = this.priorityStandardList_2
            problemCtrl.priorityNum = index

            problemCtrl.isUseAnswer = false

            problemCtrl.Init()

            element.children[1].addEventListener("click", (e) => {
                e.preventDefault()

                console.log(element, index)
                // if (index == 0) {
                //     let calResult = MainEvent.embed1.querySelector('.btn_off3');

                //     if (calResult.classList.contains('number') == false) {
                //         calResult.click()
                //         element.click()
                //     }

                // }
            })

            this.ProblemList2.push(problemCtrl)
        })   
    }

    SetEvent() {
        this.chapter1_reset.addEventListener("click", (e) => {
            this.Reset()
        })
        const chapterPrevBtn = document.querySelector('#chapterPrev')
        if (chapterPrevBtn) {
            chapterPrevBtn.addEventListener('click', () => {
                this.ChangeChapterView("chapter1View01")
            })
        }
        const chapterNextBtn = document.querySelector('#chapterNext')
        if (chapterNextBtn) {
            chapterNextBtn.addEventListener('click', () => {
                this.ChangeChapterView("chapter1View02");
            })
        }
    }

    Reset() {
        this.ProblemList1.forEach((problem, index) => {
            problem.Clear()

            if (index <= this.priorityStandardList_1[0]) {
                problem.Activate()
            }
        })

        this.ProblemList2.forEach((problem, index) => {            
            problem.answerDiv.textContent = ""
            
            if (problem.isActive) {
                problem.imgDiv.style.opacity = 1
            }
            
        })

        // let calResult = MainEvent.embed1.querySelector('.btn_off3');

        // if (calResult.classList.contains('number') == false) {
        //     calResult.click()
        // }
    }

    Clear() {
        this.Reset()

        //MainEvent.embed1.querySelector('.number_reset').click()
    }
    ChangeChapterView(id) {
        document.querySelectorAll('.chapterView1').forEach(view => {
            view.classList.remove('on');
        });
        
        // chapter1View02에 'on' 클래스 추가
        document.getElementById(id).classList.add('on');
    }


}