
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

        MainEvent.ch1ActiveInput = this.chapter1ActiveInput.bind(this);
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

        this.unitConfig = {
            unit5: {
                color: "#C483D0",
                answers: ["60000", "육만"],
                indices: [0, 5]
            },
            unit4: {
                color: "#FFA32E",
                answers: ["8000", "팔천"],
                indices: [1, 6]
            },
            unit3: {
                color: "#C2DC0D",
                answers: ["200", "이백"],
                indices: [2, 7]
            },
            unit2: {
                color: "#56BFF2",
                answers: ["60", "육십"],
                indices: [3, 8]
            },
            unit1: {
                color: "#FA7B9F",
                answers: ["3", "삼"],
                indices: [4, 9]
            }
        };
        

        this.inputBoxList_1.forEach((element, index) => {
            let problemCtrl = new ProblemClickController(element, this.problemEmmiter_1)
            problemCtrl.priorityStandardList = this.priorityStandardList_1
            problemCtrl.priorityNum = index

            problemCtrl.answer = this.answerList[index]
            problemCtrl.answerFontSize = this.answerFontSizeList[index]

            problemCtrl.Init()

            this.ProblemList1.push(problemCtrl)

            let _embed1 = embed1.shadowRoot;
            _embed1.querySelector("#key_1").addEventListener("click", this.chapter1ActiveInput);
            _embed1.querySelector("#key_2").addEventListener("click", this.chapter1ActiveInput);
            _embed1.querySelector("#key_3").addEventListener("click", this.chapter1ActiveInput);
            _embed1.querySelector("#key_4").addEventListener("click", this.chapter1ActiveInput);
            _embed1.querySelector("#key_5").addEventListener("click", this.chapter1ActiveInput);
            _embed1.querySelector("#key_6").addEventListener("click", this.chapter1ActiveInput);
            _embed1.querySelector("#key_7").addEventListener("click", this.chapter1ActiveInput);
            _embed1.querySelector("#key_8").addEventListener("click", this.chapter1ActiveInput);
            _embed1.querySelector("#key_9").addEventListener("click", this.chapter1ActiveInput);
            _embed1.querySelector("#key_0").addEventListener("click", this.chapter1ActiveInput);
            
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

    chapter1ActiveInput = () => {
        let chapter1 = MainEvent.chapter.chapter_1_1
        let unit5 = MainEvent.chapter1Active5
        let unit4 = MainEvent.chapter1Active4
        let unit3 = MainEvent.chapter1Active3
        let unit2 = MainEvent.chapter1Active2
        let unit1 = MainEvent.chapter1Active1
        console.log("여기까지 와?")
        chapter1.ProblemList2.forEach((problem, index) => {
            Object.entries(this.unitConfig).forEach(([unit, config]) => {
                if (eval(unit)) {  // unit5, unit4 등의 변수 평가
                    if (config.indices.includes(index) && !problem.isComplete) {
                        const isKorean = index >= 5;  // 5 이상의 인덱스는 한글 답안
                        
                        problem.activeBorderColor = config.color;
                        if (isKorean) {
                            problem.keyBoardType = "korean";
                            problem.answerDiv.style.fontFamily = "Malgun";
                            problem.answerDiv.style.fontWeight = "bold";
                        }
                        problem.SetAnswerText(config.answers[isKorean ? 1 : 0]);

                        // kkm 추가_처음일때만 적용
                        if(!problem.isActive) problem.Activate();
                    }
                }
            });
            
        });
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

            // kkm 추가_fontSize 적용
            problemCtrl.answerFontSize = 34;

            // kkm 추가_연필 사이즈 지정_x: width, y: height
            problemCtrl.imgSize = {x: 34, y: 34};

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
                imgNextElement.src = './img/common/ico-next.png'; 
                imgPrevElement.src = './img/common/ico-prev-disabled.png'; 

            })
        }

        if (chapterNextBtn) {
            chapterNextBtn.addEventListener('click', () => {
                this.ChangeChapterView("chapter1View02");
                imgNextElement.src = './img/common/ico-next-disabled.png'; 
                imgPrevElement.src = './img/common/ico-prev.png'; 
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
            // console.log(chapter1.ProblemList2);
            chapter1.ProblemList2.forEach((problem, index) => {
                problem.DeActivate(true);
                problem.element.style.boxShadow = ""
                //problem.imgDiv.style.opacity = 1
                problem.isComplete = false;
                problem.isActive = false;
                problem.answerDiv.style.color = "#000000";
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
        imgNextElement.src = './img/common/ico-next.png'; 
        imgPrevElement.src = './img/common/ico-prev-disabled.png'; 

        // 초기화
        MainEvent.chapter1Active5 = false;
        MainEvent.chapter1Active4 = false;
        MainEvent.chapter1Active3 = false;
        MainEvent.chapter1Active2 = false;
        MainEvent.chapter1Active1 = false;

        MainEvent.chapter1Array = [];
        MainEvent.chapter1HanglArray = [];

        chapter1_confirm1.disabled = true;
        chapter1_confirm2.disabled = true;

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