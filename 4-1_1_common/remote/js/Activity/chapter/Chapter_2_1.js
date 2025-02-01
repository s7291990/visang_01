import { EmbedCase } from "../../Utill/EmbedCase.js"
import EventEmitter from "../../Utill/EventEmitter.js"
import { ProblemClickController } from "../../Utill/ProblemClickController.js"
import { ProblemWriteController } from "../../Utill/ProblemWriteController.js"
import { SwitchController } from "../../Utill/SwitchController.js"
import MainEvent from "../MainEvent.js"

export default class Chapter_2_1 {
    constructor() {
        this.chapter2 = document.querySelector("#chapter2")

        this.chapter2_reset = document.querySelector("#chapter2_reset")

        this.chapter2_confirm1 = document.querySelector("#chapter2_confirm1")
        this.chapter2_confirm1_close = document.querySelector("#chapter2_confirm1_close")

        this.chapter2_confirm2 = document.querySelector("#chapter2_confirm2")
        this.chapter2_confirm2_close = document.querySelector("#chapter2_confirm2_close")

        this.c2_multiText = document.querySelector("#c2_multiText")
        this.isEmbeddedChapter02 = false;
    }

    Init() {
        this.ProblemList1 = []
        this.ProblemList2 = []
        this.SetProblem()
        this.SetProblem2()

        this.SetEvent()
    }

    SetProblem() {
        let _embed2 = embed2.shadowRoot;
        this.problemEmmiter = new EventEmitter()

        /** 우선순위 증가 시키는 인덱스 범위 */
        this.priorityStandardList1 = [0, 1, 2, 3]

        this.inputBoxList_1 = this.chapter2.querySelectorAll(".c2_1")

        this.answerList = ["십만", "백만", "천만", "만"]
        this.answerFontSizeList = [34, 34, 34, 34]

        const isEmbeddedChapter02 = () => {
            if (EmbedCase.chapter_2()) {
                const numElements = _embed2.querySelectorAll('.answer_number .num');
                const allHaveText = Array.from(numElements[3]).every(element => 
                    element.textContent.trim() !== ''
                );
                console.log(allHaveText);
                
                if(allHaveText){
                    //
                }
                this.isEmbeddedComplete = allHaveText;
                console.log(this.isEmbeddedComplete);
                return allHaveText;
            }
            return false;
        }

        const answerNumbers = _embed2.querySelectorAll(".answer_number");
        if (answerNumbers[3]) { // 4번째 요소가 존재하는지 확인
            answerNumbers[3].addEventListener("click", isEmbeddedChapter02);
        }

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

            element.style.borderRadius = "20px"

            
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
                                    problem.answerDiv.style.fontFamily = "Malgunbd"
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
                                    problem.SetAnswerText("80000")
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
            //2025.01.22 khy 수정 시작
            if (index == 0) {
                problemCtrl.keyBoardType = "korean";
                problemCtrl.defaultFontFamily = "Malgunbd"
            }
            //2025.01.22 khy 수정 끝
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

            document.body.addEventListener("click", (e) => {
                //element.focus();
                this.BtnActive(problemCtrl);
            })

            // input 이벤트 수정
            problemCtrl.answerDiv.addEventListener('input', (event) => {
                //element.focus();
                this.BtnActive(problemCtrl);
            });
        })   
    }

    
    SetEvent() {
        this.chapter2_reset.addEventListener("click", (e) => {
            this.Reset()
        })

        const chapterPrevBtn = document.querySelector('#chapterPrev02')
        const imgPrevElement = chapterPrevBtn.querySelector('img');
        const chapterNextBtn = document.querySelector('#chapterNext02')
        const imgNextElement = chapterNextBtn.querySelector('img');
        if (chapterPrevBtn) {
            chapterPrevBtn.addEventListener('click', () => {
                this.ChangeChapterView("chapter1View03")
                imgNextElement.src = './img/common/ico-next.png'; 
                imgPrevElement.src = './img/common/ico-prev-disabled.png'; 

            })
        }

        if (chapterNextBtn) {
            chapterNextBtn.addEventListener('click', () => {
                this.ChangeChapterView("chapter1View04");
                imgNextElement.src = './img/common/ico-next-disabled.png'; 
                imgPrevElement.src = './img/common/ico-prev.png'; 
            })
        }

        // 확인하기
        this.chapter2_confirm1.addEventListener("click", (e) => {
            const chapter2Confirm01 = document.querySelector('#chapter2-confirm01')
            chapter2Confirm01.classList.add('on');
        })
        // 확인하기 닫기
        this.chapter2_confirm1_close.addEventListener("click", (e) => {
            const chapter2Confirm01 = document.querySelector('#chapter2-confirm01')
            chapter2Confirm01.classList.remove('on');
        })

        // 확인하기
        this.chapter2_confirm2.addEventListener("click", (e) => {
            const chapter2Confirm02 = document.querySelector('#chapter2-confirm02')
            chapter2Confirm02.classList.add('on');
        })
        // 확인하기 닫기
        this.chapter2_confirm2_close.addEventListener("click", (e) => {
            const chapter2Confirm02 = document.querySelector('#chapter2-confirm02')
            chapter2Confirm02.classList.remove('on');
        })

        let _embed2 = embed2.shadowRoot; 
        let answerBtn = _embed2.querySelectorAll(".answer_number");
        answerBtn.forEach(button => {
            button.addEventListener('click', function() {
              const unitValue = button.getAttribute('data-unit');
              // 마지막 클릭시
              if(unitValue === "1" && MainEvent.step === "chapter"){
                
              }
            });
        });


    }

    Reset() {
        this.isEmbeddedChapter02 = false;
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
                //problem.imgDiv.style.opacity = 1
                problem.isComplee = false;
                problem.isComplete = false;
                problem.isActive = false;
                problem.answerDiv.style.color = "#000000";
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


        _embed2.querySelector("#reset_btn").click();

        const chapterPrevBtn = document.querySelector('#chapterPrev02')
        const imgPrevElement = chapterPrevBtn.querySelector('img');
        const chapterNextBtn = document.querySelector('#chapterNext02')
        const imgNextElement = chapterNextBtn.querySelector('img');
        imgNextElement.src = './img/common/ico-next.png'; 
        imgPrevElement.src = './img/common/ico-prev-disabled.png'; 

        // 초기화
        MainEvent.chapter2Active4 = false;
        MainEvent.chapter2Active3 = false;
        MainEvent.chapter2Active2 = false;
        MainEvent.chapter2Active1 = false;

        MainEvent.chapter2Array = [];
        MainEvent.chapter2HanglArray = [];

        chapter2_confirm1.disabled = true;
        chapter2_confirm2.disabled = true;
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

    BtnActive(problemCtrl) {
        if (problemCtrl.answerDiv.textContent.length >= problemCtrl.answerMaxLength) {
            const selection = window.getSelection();
            const range = document.createRange();

            problemCtrl.answerDiv.textContent = problemCtrl.answerDiv.textContent.substring(0, problemCtrl.answerMaxLength);

            range.selectNodeContents(problemCtrl.answerDiv);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
 

        if (problemCtrl.answerDiv.textContent.length == "") {
            problemCtrl.answerDiv.style.lineHeight = problemCtrl.answerDivHeight + "px"
        } else {
            problemCtrl.answerDiv.style.lineHeight = problemCtrl.answerDivLineHeight + "px"
        } 
    
        //키보드 타입이 숫자일때
        if (problemCtrl.keyBoardType == "number") {
            if (problemCtrl.answerDiv.textContent.length == problemCtrl.answerMaxLength) {
                //problemCtrl.CheckAnswer()
                
                // 확인 버튼 활성화
                //this.chapter1Array 
                let init = new Date().getTime(); 
                const randomNumbers = Math.floor(Math.random()) + init;
                
                if(problemCtrl.element.classList[1] === "c2_2" && problemCtrl.answerDiv.textContent.trim() !== ""){
                    // 현재 입력박스의 인덱스 찾기
                    const currentIndex = this.ProblemList2.indexOf(problemCtrl);
                    
                    // 해당 인덱스의 값이 있다면 삭제
                    if (MainEvent.chapter2Array[currentIndex] !== undefined) {
                        delete MainEvent.chapter2Array[currentIndex];
                    }
                    
                    // 새로운 값 추가
                    MainEvent.chapter2Array[currentIndex] = randomNumbers;
                    
                    // undefined를 제거하고 실제 값만 계산하기 위해 필터링
                    const validEntriesCount = Object.values(MainEvent.chapter2Array).filter(x => x !== undefined).length;
                    
                    if(validEntriesCount === 4){
                        const chapter2_confirm2 = document.querySelector("#chapter2_confirm2");
                        chapter2_confirm2.disabled = false;
                    } else {
                        const chapter2_confirm2 = document.querySelector("#chapter2_confirm2");
                        chapter2_confirm2.disabled = true;
                    }
                } else if(problemCtrl.element.classList[1] === "c2_2") {
                    // 입력값이 비어있을 경우 해당 인덱스의 값 삭제
                    const currentIndex = this.ProblemList2.indexOf(problemCtrl);
                    if (MainEvent.chapter2Array[currentIndex] !== undefined) {
                        delete MainEvent.chapter2Array[currentIndex];
                    }
                }

                if(problemCtrl.element.classList[1] === "c2_2" && problemCtrl.answerDiv.textContent.trim() !== ""){
                    // 현재 입력박스의 인덱스 찾기
                    const currentIndex = this.ProblemList2.indexOf(problemCtrl);
                    
                    // 이미 해당 인덱스의 값이 배열에 있는지 확인
                    const existingIndex = MainEvent.chapter2Array.findIndex((_, idx) => 
                        idx === currentIndex
                    );
                    
                    // 해당 인덱스에 값이 없고, 배열의 길이가 5 미만일 때만 추가
                    if (existingIndex === -1 && MainEvent.chapter2Array.length < 5) {
                        MainEvent.chapter2Array[currentIndex] = randomNumbers;
                    }
                }

                 

                console.log(MainEvent.chapter2Array);

            }
                
        }
        //키보드 타입이 한글일때
        else if (problemCtrl.keyBoardType == "korean") {
            if (problemCtrl.answerDiv.textContent.length > problemCtrl.answerMaxLength) {
                return
            }
            if (problemCtrl.answerDiv.textContent.length === problemCtrl.answerMaxLength) {
                problemCtrl.inputHangulCnt++
                

                // 확인 버튼 활성화
                let init = new Date().getTime(); 
                const randomNumbers = Math.floor(Math.random()) + init;
                 
                if(problemCtrl.element.classList[1] === "c2_2" && problemCtrl.answerDiv.textContent.trim() !== ""){
                    // 현재 입력박스의 인덱스 찾기
                    const currentIndex = this.ProblemList2.indexOf(problemCtrl);
                    
                    // 해당 인덱스의 값이 있다면 삭제
                    if (MainEvent.chapter2HanglArray[currentIndex] !== undefined) {
                        delete MainEvent.chapter2HanglArray[currentIndex];
                    }
                    
                    // 새로운 값 추가
                    MainEvent.chapter2HanglArray[currentIndex] = randomNumbers;
                    
                    // undefined를 제거하고 실제 값만 계산하기 위해 필터링
                    const validEntriesCount = Object.values(MainEvent.chapter2HanglArray).filter(x => x !== undefined).length;
                    
                    if(validEntriesCount === 1){
                        const chapter2_confirm1 = document.querySelector("#chapter2_confirm1");
                        chapter2_confirm1.disabled = false;
                    } else {
                        const chapter2_confirm1 = document.querySelector("#chapter2_confirm1");
                        chapter2_confirm1.disabled = true;
                    }
                } else if(problemCtrl.element.classList[1] === "c2_2") {
                    // 입력값이 비어있을 경우 해당 인덱스의 값 삭제
                    const currentIndex = this.ProblemList2.indexOf(problemCtrl);
                    if (MainEvent.chapter2HanglArray[currentIndex] !== undefined) {
                        delete MainEvent.chapter2HanglArray[currentIndex];
                    }
                }

                if(problemCtrl.element.classList[1] === "c2_2" && problemCtrl.answerDiv.textContent.trim() !== ""){
                    // 현재 입력박스의 인덱스 찾기
                    const currentIndex = this.ProblemList2.indexOf(problemCtrl);
                    
                    // 이미 해당 인덱스의 값이 배열에 있는지 확인
                    const existingIndex = MainEvent.chapter2HanglArray.findIndex((_, idx) => 
                        idx === currentIndex
                    );
                    
                    // 해당 인덱스에 값이 없고, 배열의 길이가 5 미만일 때만 추가
                    if (existingIndex === -1 && MainEvent.chapter2HanglArray.length < 5) {
                        MainEvent.chapter2HanglArray[currentIndex] = randomNumbers;
                    }
                }
                 

                if(MainEvent.chapter2HanglArray.length === 1){
                    const chapter2_confirm1 = document.querySelector("#chapter2_confirm1");
                    chapter2_confirm1.disabled  = false;
                }

                
            } 
        }  
    }


}