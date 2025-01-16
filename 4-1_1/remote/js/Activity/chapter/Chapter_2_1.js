import EventEmitter from "../../Utill/EventEmitter.js"
import { ProblemClickController } from "../../Utill/ProblemClickController.js"
import { ProblemWriteController } from "../../Utill/ProblemWriteController.js"
import { SwitchController } from "../../Utill/SwitchController.js"
import MainEvent from "../MainEvent.js"

export default class Chapter_2_1 {
    constructor() {
        this.chapter2 = document.querySelector("#chapter2")

        this.chapter2_reset = document.querySelector("#chapter2_reset")

        this.c2_multiText = document.querySelector("#c2_multiText")
    }

    Init() {
        this.ProblemList1 = []
        this.ProblemList2 = []
        this.SetProblem()
        this.SetProblem2()

        this.SetEvent()
    }

    SetProblem() {
        this.problemEmmiter = new EventEmitter()

        /** 우선순위 증가 시키는 인덱스 범위 */
        this.priorityStandardList1 = [0, 1, 2, 3]

        this.inputBoxList_1 = this.chapter2.querySelectorAll(".c2_1")

        this.answerList = ["십만", "백만", "천만", "만"]
        this.answerFontSizeList = [34, 34, 34, 34]

        this.inputBoxList_1.forEach((element, index) => {
            let problemCtrl = new ProblemClickController(element, this.problemEmmiter)
            problemCtrl.priorityStandardList = this.priorityStandardList1
            problemCtrl.priorityNum = index

            problemCtrl.answer = this.answerList[index]
            problemCtrl.answerFontSize = this.answerFontSizeList[index]

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
                        // 버튼 활성화
                        
                        let chapter2 = MainEvent.chapter.chapter_2_1
                        console.log(chapter2);
                        chapter2.ProblemList2.forEach((problem, index) => {
                            
                            switch(index) {
                                case 0:
                                    problem.keyBoardType = "korean"
                                    problem.SetAnswerText("오천이백칠십팔")
                                    problem.Activate()
                                    break;
                                case 1:
                                    problem.SetAnswerText("50000000")
                                    problem.Activate()
                                    break;
                                case 2:
                                    problem.SetAnswerText("2000000")
                                    problem.Activate()
                                    break;
                                case 3:
                                    problem.SetAnswerText("700000")
                                    problem.Activate()
                                    break;
                                case 4:
                                    problem.SetAnswerText("380000")
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

        this.inputBoxList_2 = this.chapter2.querySelectorAll(".c2_2")

        console.log(this.inputBoxList_2);
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
        this.chapter2_reset.addEventListener("click", (e) => {
            this.Reset()
        })
        const chapterPrevBtn = document.querySelector('#chapterPrev02')
        if (chapterPrevBtn) {
            chapterPrevBtn.addEventListener('click', () => {
                this.ChangeChapterView("chapter1View03")
            })
        }
        const chapterNextBtn = document.querySelector('#chapterNext02')
        if (chapterNextBtn) {
            chapterNextBtn.addEventListener('click', () => {
                this.ChangeChapterView("chapter1View04");
            })
        }
    }

    Reset() {
        //console.log(this.c2_multiText)
        //this.c2_multiText.textContent = ""

        this.ProblemList1.forEach((problem, index) => {
            problem.Clear()

            if (index <= this.priorityStandardList1[0]) {
                problem.Activate()
            }
        })

        this.ProblemList2.forEach((problem, index) => {            
            problem.answerDiv.textContent = ""
            
            // 입력박스 초기화
            let chapter2 = MainEvent.chapter.chapter_2_1
            chapter2.ProblemList2.forEach((problem, index) => {
                problem.DeActivate(true);
                problem.element.style.boxShadow = ""
                problem.imgDiv.style.opacity = 1
            })
            
            // 탭 첫번째로 이동
            this.ChangeChapterView("chapter1View03")
            //problem.isActive = false;
            //problem.DeActivate()
            // 버튼 활성화
            
        })

        let _embed2 = embed2.shadowRoot; 
        _embed2.querySelector("#reset_btn").click();
        _embed2.querySelector("#total_number_3 .num").innerText = "5";
        _embed2.querySelector("#total_number_2 .num").innerText = "2";
        _embed2.querySelector("#total_number_1 .num").innerText = "7";
        _embed2.querySelector("#total_number_0 .num").innerText = "8";
    }

    Clear() {
        this.Reset()
    }

    ChangeChapterView(id) {
        document.querySelectorAll('.chapterView2').forEach(view => {
            view.classList.remove('on');
        });
        
        // chapter1View02에 'on' 클래스 추가
        document.getElementById(id).classList.add('on');
    }


}