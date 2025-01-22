import { FillBlankArray, NumToArray } from "../../Utill/ArrayUtill.js"
import EventEmitter from "../../Utill/EventEmitter.js"
import { RemoveListener } from "../../Utill/EventListenerHelper.js"
import { ProblemWriteController } from "../../Utill/ProblemWriteController.js"
import { GetRandomValue } from "../../Utill/RandomUtill.js"
import MainEvent from "../MainEvent.js"

export default class Problem_3 {
    constructor() {
        this.problem3 = document.querySelector("#problem3")

        this.p3_value1 = document.querySelector("#p3_value1")
        this.p3_value2 = document.querySelector("#p3_value2")
        this.p3_value3 = document.querySelector("#p3_value3")
        this.p3_value4 = document.querySelector("#p3_value4")

        this.chapter3_reset = document.querySelector("#problem3_reset")

    }

    Init() {
        this.SetEvent()
    }

    SetObject() {
        this.value1 = GetRandomValue(1, 9)
        this.value2 = GetRandomValue(1, 9)
        this.value3 = GetRandomValue(1, 9)
        this.value4 = GetRandomValue(1, 9)

        this.value1List = NumToArray(this.value1)

        this.inputAnswerList_1 = []

        this.inputAnswerList_1.push(this.value1List[0])
        this.inputAnswerList_1.push(this.value1List[1] * 1000)
        this.inputAnswerList_1.push(this.value1List[2] * 100)
        this.inputAnswerList_1.push(this.value1List[3] * 10)

        

        //this.inputAnswerList_1 = [this.answerArrayList[0], this.answerArrayList[1], this.answerArrayList[2]]

        this.p3_value1.textContent = this.value1
        this.p3_value2.textContent = this.value2
        this.p3_value3.textContent = this.value3
        this.p3_value4.textContent = this.value4
        
    }


    SetProblem() {

        this.ProblemList1 = []

        this.problemEmmiter = new EventEmitter()

        this.priorityStandardList_1 = [2]
        this.inputBoxList_1 = this.problem3.querySelectorAll(".problem3_1")
        
        this.inputBoxList_1.forEach((element, index) => {
            element.innerHTML = ""
            element = RemoveListener(element)

            let problemCtrl = new ProblemWriteController(element, this.problemEmmiter)
            problemCtrl.priorityStandardList = this.priorityStandardList_1
            problemCtrl.answer = this.inputAnswerList_1[index]

            //if (index == 0) problemCtrl.activeBorderColor = "#54A318"
            //else if (index == 1) problemCtrl.activeBorderColor = "#177AF2"
            
            problemCtrl.priorityNum = index

            problemCtrl.Init()

            this.ProblemList1.push(problemCtrl)
        })   
    }

    SetEvent() {
        let _embed2 = embed2.shadowRoot;
        this.chapter3_reset.addEventListener("click", (e) => {
            this.Clear()
        })

        const rightNumbers = () => {
            if(MainEvent.pageIdx === 2 && MainEvent.step === 'problem'){
                // 오른쪽 숫자 구하기
                const rightNum = Array.from({ length: 4 }, (_, i) => 
                    document.querySelector(`#problem3 #p3_value${1 + i}`).textContent
                ).join('');
                console.log(rightNum);
    
                // 왼쪽 숫자 구하기
                const leftNum = Array.from({ length: 4 }, (_, i) => 
                    _embed2.querySelector(`#total_number_${3 - i} .num`).textContent
                ).join('');
                console.log(leftNum);
    
                console.log("Step=="+MainEvent.pageIdx);
    
                
                // 오른쪽 , 왼쪽 숫자 비교
                if(rightNum === leftNum){
                    console.log("정답");
                    // 인풋 활성화
                    this.ProblemList1.forEach((problem, index) => {
                        switch(index) {
                            case 0:
                                problem.SetAnswerText(this.value1*10000000)
                                // kkm_추가_처음일때만 Active
                                if(!problem.isActive) problem.Activate()
                                break;
                            case 1:
                                problem.SetAnswerText(this.value2*1000000)
                                // kkm_추가_처음일때만 Active
                                if(!problem.isActive) problem.Activate()
                                break;
                            case 2:
                                problem.SetAnswerText(this.value3*100000)
                                // kkm_추가_처음일때만 Active
                                if(!problem.isActive) problem.Activate()
                                break;
                            case 3:
                                problem.SetAnswerText(this.value4*10000)
                                // kkm_추가_처음일때만 Active
                                if(!problem.isActive) problem.Activate()
                                break;
                        }
                    })
                    
                    
                }else{
                    if(leftNum.length === 4 ){
                        console.log("오답" + leftNum.length);
                        _embed2.querySelector("#reset_card_popup_btn_ok").click();
                        Array.from({ length: 4 }, (_, i) => 
                            _embed2.querySelector(`#total_number_${3 - i} .num`).textContent = ''
                        )
                    }
                    
                }
            }
        }

        // 숫자 클릭시 비교
        _embed2.querySelector("#key_1").addEventListener("click", rightNumbers);
        _embed2.querySelector("#key_2").addEventListener("click", rightNumbers);
        _embed2.querySelector("#key_3").addEventListener("click", rightNumbers);
        _embed2.querySelector("#key_4").addEventListener("click", rightNumbers);
        _embed2.querySelector("#key_5").addEventListener("click", rightNumbers);
        _embed2.querySelector("#key_6").addEventListener("click", rightNumbers);
        _embed2.querySelector("#key_7").addEventListener("click", rightNumbers);
        _embed2.querySelector("#key_8").addEventListener("click", rightNumbers);
        _embed2.querySelector("#key_9").addEventListener("click", rightNumbers);
        _embed2.querySelector("#key_0").addEventListener("click", rightNumbers);
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
                // kkm_추가_입력 불가능할 때는 연필 마크 제거
                problem.imgDiv.style.opacity = "0";
                problem.Activate()
            }
        })
    }

    Clear() {
        let _embed2 = embed2.shadowRoot;
        //MainEvent.embed1.querySelector('.number_reset').click()
        //let sec1 = MainEvent.embed1.querySelector("#total_number_5")
        //console.log(sec1);
        //let _embed2 = embed1.shadowRoot; 
        var isActive = document.querySelector("#study_activity").classList.contains('active');
        if (isActive) {
            _embed2.querySelector("#reset_card_popup_btn_ok").click();
        }else{
            _embed2.querySelector("#total_number_3 .num").innerText = "5";
            _embed2.querySelector("#total_number_2 .num").innerText = "2";
            _embed2.querySelector("#total_number_1 .num").innerText = "7";
            _embed2.querySelector("#total_number_0 .num").innerText = "8";
        }

        

        this.SetObject()
        this.SetProblem()

        // 입력박스 초기화
        this.ProblemList1.forEach((problem, index) => {
            problem.DeActivate(true);
            problem.element.style.boxShadow = ""
            // kkm_추가_입력 불가능할 때는 연필 마크 제거
            problem.imgDiv.style.opacity = 0;
        })
    }

}