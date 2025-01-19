
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
        this.chapter1_confirm1 = document.querySelector("#chapter1_confirm1")
        this.chapter1_confirm1_close = document.querySelector("#chapter1_confirm1_close")

        this.chapter1_confirm2 = document.querySelector("#chapter1_confirm2")
        this.chapter1_confirm2_close = document.querySelector("#chapter1_confirm2_close")

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

            const chapter1ActiveInput = () => {
                let chapter1 = MainEvent.chapter.chapter_1_1
                let unit5 = MainEvent.chapter1Active5
                let unit4 = MainEvent.chapter1Active4
                let unit3 = MainEvent.chapter1Active3
                let unit2 = MainEvent.chapter1Active2
                let unit1 = MainEvent.chapter1Active1
                chapter1.ProblemList2.forEach((problem, index) => {
                    if(unit5){
                        if (index === 0) { // case 3에 해당하는 조건
                            problem.activeBorderColor = "#C483D0"
                            problem.SetAnswerText("60000")
                            problem.Activate()
                        }else if (index === 5) { // case 3에 해당하는 조건
                            problem.activeBorderColor = "#C483D0"
                            problem.keyBoardType = "korean"
                            problem.answerDiv.style.fontFamily = "Malgun"
                            problem.answerDiv.style.fontWeight = "bold"
                            problem.SetAnswerText("육만")
                            problem.Activate()
                        }
                    }
                    if(unit4){
                        if (index === 1) { // case 3에 해당하는 조건
                            problem.activeBorderColor = "#FFA32E"
                            problem.SetAnswerText("8000")
                            problem.Activate()
                        }else if (index === 6) { // case 3에 해당하는 조건
                            problem.activeBorderColor = "#FFA32E"
                            problem.keyBoardType = "korean"
                            problem.answerDiv.style.fontFamily = "Malgun"
                            problem.answerDiv.style.fontWeight = "bold"
                            problem.SetAnswerText("팔천")
                            problem.Activate()
                        }
                    }
                    if(unit3){
                        if (index === 2) { // case 3에 해당하는 조건
                            problem.activeBorderColor = "#C2DC0D"
                            problem.SetAnswerText("200")
                            problem.Activate()
                        }else if (index === 7) { // case 3에 해당하는 조건
                            problem.activeBorderColor = "#C2DC0D"
                            problem.keyBoardType = "korean"
                            problem.answerDiv.style.fontFamily = "Malgun"
                            problem.answerDiv.style.fontWeight = "bold"
                            problem.SetAnswerText("이백")
                            problem.Activate()
                        }
                    }
                    if(unit2){
                        if (index === 3) { // case 3에 해당하는 조건
                            problem.activeBorderColor = "#56BFF2"
                            problem.SetAnswerText("60")
                            problem.Activate()
                        }else if (index === 8) { // case 3에 해당하는 조건
                            problem.activeBorderColor = "#56BFF2"
                            problem.keyBoardType = "korean"
                            problem.answerDiv.style.fontFamily = "Malgun"
                            problem.answerDiv.style.fontWeight = "bold"
                            problem.SetAnswerText("육십")
                            problem.Activate()
                        }
                    }
                    if(unit1){
                        if (index === 4) { // case 3에 해당하는 조건
                            problem.activeBorderColor = "#FA7B9F"
                            problem.SetAnswerText("3")
                            problem.Activate()
                        }else if (index === 9) { // case 3에 해당하는 조건
                            problem.activeBorderColor = "#FA7B9F"
                            problem.keyBoardType = "korean"
                            problem.answerDiv.style.fontFamily = "Malgun"
                            problem.answerDiv.style.fontWeight = "bold"
                            problem.SetAnswerText("삼")
                            problem.Activate()
                        }
                    }
                    
                });
            }
            let _embed1 = embed1.shadowRoot;
            _embed1.querySelector("#key_1").addEventListener("click", chapter1ActiveInput);
            _embed1.querySelector("#key_2").addEventListener("click", chapter1ActiveInput);
            _embed1.querySelector("#key_3").addEventListener("click", chapter1ActiveInput);
            _embed1.querySelector("#key_4").addEventListener("click", chapter1ActiveInput);
            _embed1.querySelector("#key_5").addEventListener("click", chapter1ActiveInput);
            _embed1.querySelector("#key_6").addEventListener("click", chapter1ActiveInput);
            _embed1.querySelector("#key_7").addEventListener("click", chapter1ActiveInput);
            _embed1.querySelector("#key_8").addEventListener("click", chapter1ActiveInput);
            _embed1.querySelector("#key_9").addEventListener("click", chapter1ActiveInput);
            _embed1.querySelector("#key_0").addEventListener("click", chapter1ActiveInput);
            
            //클릭 이벤트
            element.addEventListener("click", (e) => {
                switch(index) {
                    case 0:
                        break;
                    case 1:
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
        const imgPrevElement = chapterPrevBtn.querySelector('img');
        const chapterNextBtn = document.querySelector('#chapterNext')
        const imgNextElement = chapterNextBtn.querySelector('img');
        if (chapterPrevBtn) {
            chapterPrevBtn.addEventListener('click', () => {
                this.ChangeChapterView("chapter1View01")
                imgNextElement.src = './img/common/ico-next.svg'; 
                imgPrevElement.src = './img/common/ico-prev-disabled.svg'; 

            })
        }

        if (chapterNextBtn) {
            chapterNextBtn.addEventListener('click', () => {
                this.ChangeChapterView("chapter1View02");
                imgNextElement.src = './img/common/ico-next-disabled.svg'; 
                imgPrevElement.src = './img/common/ico-prev.svg'; 
            })
        }

        // 확인하기
        this.chapter1_confirm1.addEventListener("click", (e) => {
            const chapter1Confirm01 = document.querySelector('#chapter1-confirm01')
            chapter1Confirm01.classList.add('on');
        })
        // 확인하기 닫기
        this.chapter1_confirm1_close.addEventListener("click", (e) => {
            const chapter1Confirm01 = document.querySelector('#chapter1-confirm01')
            chapter1Confirm01.classList.remove('on');
        })

        // 확인하기
        this.chapter1_confirm2.addEventListener("click", (e) => {
            const chapter1Confirm02 = document.querySelector('#chapter1-confirm02')
            chapter1Confirm02.classList.add('on');
        })
        // 확인하기 닫기
        this.chapter1_confirm2_close.addEventListener("click", (e) => {
            const chapter1Confirm02 = document.querySelector('#chapter1-confirm02')
            chapter1Confirm02.classList.remove('on');
        })
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
            
            // 입력박스 초기화
            let chapter1 = MainEvent.chapter.chapter_1_1
            console.log(chapter1.ProblemList2);
            chapter1.ProblemList2.forEach((problem, index) => {
                problem.DeActivate(true);
                problem.element.style.boxShadow = ""
                problem.imgDiv.style.opacity = 1
                problem.isComplete = false;
            })
            
            // 탭 첫번째로 이동
            this.ChangeChapterView("chapter1View01")
            //problem.isActive = false;
            //problem.DeActivate()
            // 버튼 활성화
            
        })
        let _embed1 = embed1.shadowRoot; 
        _embed1.querySelector("#reset_btn").click();

        const chapterPrevBtn = document.querySelector('#chapterPrev')
        const imgPrevElement = chapterPrevBtn.querySelector('img');
        const chapterNextBtn = document.querySelector('#chapterNext')
        const imgNextElement = chapterNextBtn.querySelector('img');
        imgNextElement.src = './img/common/ico-next.svg'; 
        imgPrevElement.src = './img/common/ico-prev-disabled.svg'; 

        // 초기화
        MainEvent.chapter1Active5 = false;
        MainEvent.chapter1Active4 = false;
        MainEvent.chapter1Active3 = false;
        MainEvent.chapter1Active2 = false;
        MainEvent.chapter1Active1 = false;

        MainEvent.chapter1Array = [];
        MainEvent.chapter1HanglArray = [];

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