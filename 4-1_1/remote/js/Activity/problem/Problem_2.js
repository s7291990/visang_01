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
        this.p1_value3 = document.querySelector("#p1_value3")
        this.p1_value4 = document.querySelector("#p1_value4")
        this.p1_value5 = document.querySelector("#p1_value5")

        this.problem1_reset = document.querySelector("#problem1_reset")
    }

    Init() {
        this.SetEvent()

        
    }

    SetObject() {
        //this.value1 = GetRandomValue(100, 999)
        this.value1 = GetRandomValue(1, 9)
        this.value2 = GetRandomValue(0, 9)
        this.value3 = GetRandomValue(0, 9)
        this.value4 = GetRandomValue(0, 9)
        this.value5 = GetRandomValue(0, 9)


        this.value1List = NumToArray(this.value1)

        this.inputAnswerList_1 = []

        this.inputAnswerList_1.push(this.value1List[0] * 10000)
        this.inputAnswerList_1.push(this.value1List[1] * 1000)
        this.inputAnswerList_1.push(this.value1List[2] * 100)
        this.inputAnswerList_1.push(this.value1List[3] * 10)
        this.inputAnswerList_1.push(this.value1List[4] * 1)

        this.answer = this.value1 * this.value2
        this.answerArrayList = NumToArray(this.answer)

        if (this.answerArrayList.length > 3) {
            let mergedValue = parseInt(this.answerArrayList.slice(0, -2).join(''));
            this.answerArrayList = [mergedValue, ...this.answerArrayList.slice(-2)];
        }

        //this.inputAnswerList_1 = [this.answerArrayList[0], this.answerArrayList[1], this.answerArrayList[2]]

        this.p1_value1.textContent = this.value1
        this.p1_value2.textContent = this.value2
        this.p1_value3.textContent = this.value3
        this.p1_value4.textContent = this.value4
        this.p1_value5.textContent = this.value5
        
    }

    SetProblem() {
        
        this.ProblemList1 = []

        this.problemEmmiter = new EventEmitter()

        this.priorityStandardList_1 = [2]
        this.inputBoxList_1 = this.problem1.querySelectorAll(".problem1_1")
        
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
        this.problem1_reset.addEventListener("click", (e) => {
            this.Clear()
        })

        let _embed1 = embed1.shadowRoot; 
        const leftNumbers = () => {
            const numbers = Array.from({ length: 5 }, (_, i) => 
                _embed1.querySelector(`#p1_value${1 + i} .num`).textContent
            ).join('');
            console.log(numbers);
        };
        const rightNumbers = () => {

            // 오른쪽 숫자 구하기
            const rightNum = Array.from({ length: 5 }, (_, i) => 
                document.querySelector(`#p1_value${1 + i}`).textContent
            ).join('');
            console.log(rightNum);

            // 왼쪽 숫자 구하기
            const leftNum = Array.from({ length: 5 }, (_, i) => 
                _embed1.querySelector(`#total_number_${5 - i} .num`).textContent
            ).join('');
            console.log(leftNum);

            
            // 오른쪽 , 왼쪽 숫자 비교
            if(rightNum === leftNum){
                console.log("정답");
                // 인풋 활성화
                this.ProblemList1.forEach((problem, index) => {
                    switch(index) {
                        case 0:
                            problem.SetAnswerText(this.value1*10000)
                            problem.Activate()
                            break;
                        case 1:
                            problem.SetAnswerText(this.value2*1000)
                            problem.Activate()
                            break;
                        case 2:
                            problem.SetAnswerText(this.value3*100)
                            problem.Activate()
                            break;
                        case 3:
                            problem.SetAnswerText(this.value4*10)
                            problem.Activate()
                            break;
                        case 4:
                            problem.SetAnswerText(this.value5)
                            problem.Activate()
                            break;
                    }
                })
                
            }else{
                if(leftNum.length === 5 ){
                    console.log("오답" + leftNum.length);
                    _embed1.querySelector("#reset_card_popup_btn_ok").click();
                    Array.from({ length: 5 }, (_, i) => 
                        _embed1.querySelector(`#total_number_${5 - i} .num`).textContent = ''
                    )
                }
                
            }
        };

        // 숫자 클릭시 비교
        _embed1.querySelector("#key_1").addEventListener("click", rightNumbers);
        _embed1.querySelector("#key_2").addEventListener("click", rightNumbers);
        _embed1.querySelector("#key_3").addEventListener("click", rightNumbers);
        _embed1.querySelector("#key_4").addEventListener("click", rightNumbers);
        _embed1.querySelector("#key_5").addEventListener("click", rightNumbers);
        _embed1.querySelector("#key_6").addEventListener("click", rightNumbers);
        _embed1.querySelector("#key_7").addEventListener("click", rightNumbers);
        _embed1.querySelector("#key_8").addEventListener("click", rightNumbers);
        _embed1.querySelector("#key_9").addEventListener("click", rightNumbers);
        _embed1.querySelector("#key_0").addEventListener("click", rightNumbers);
        //answer_number_1
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
        //let sec1 = MainEvent.embed1.querySelector("#total_number_5")
        //console.log(sec1);
        let _embed1 = embed1.shadowRoot; 
        var isActive = document.querySelector("#study_activity").classList.contains('active');
        if (isActive) {
            _embed1.querySelector("#reset_card_popup_btn_ok").click();
        }else{
           _embed1.querySelector("#total_number_5 .num").innerText = "6";
           _embed1.querySelector("#total_number_4 .num").innerText = "8";
           _embed1.querySelector("#total_number_3 .num").innerText = "2";
           _embed1.querySelector("#total_number_2 .num").innerText = "6";
           _embed1.querySelector("#total_number_1 .num").innerText = "3";
        }

        

        this.SetObject()
        this.SetProblem()

        // 입력박스 초기화
        this.ProblemList1.forEach((problem, index) => {
            problem.DeActivate(true);
            problem.element.style.boxShadow = ""
            problem.imgDiv.style.opacity = 1
        })
    }

}