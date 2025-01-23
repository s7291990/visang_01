import { FillBlankArray, NumToArray } from "../../Utill/ArrayUtill.js"
import EventEmitter from "../../Utill/EventEmitter.js"
import { RemoveListener } from "../../Utill/EventListenerHelper.js"
import { ProblemWriteController } from "../../Utill/ProblemWriteController.js"
import { GetRandomValue } from "../../Utill/RandomUtill.js"
import MainEvent from "../MainEvent.js"

export default class Problem_4 {
    constructor() {
        this.problem4 = document.querySelector("#problem4")

        this.p4_value1 = document.querySelector("#p4_value1")
        this.p4_value2 = document.querySelector("#p4_value2")
        this.p4_value3 = document.querySelector("#p4_value3")
        this.p4_value4 = document.querySelector("#p4_value4")

        this.chapter4_reset = document.querySelector("#problem4_reset")
        this.isEmbeddedComplete04 = false;
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

        this.p4_value1.textContent = this.value1
        this.p4_value2.textContent = this.value2
        this.p4_value3.textContent = this.value3
        this.p4_value4.textContent = this.value4
        
    }


    SetProblem() {

        this.ProblemList1 = []

        this.problemEmmiter = new EventEmitter()

        this.priorityStandardList_1 = [2]
        this.inputBoxList_1 = this.problem4.querySelectorAll(".problem4_1")
        
        this.inputBoxList_1.forEach((element, index) => {
            element.innerHTML = ""
            element = RemoveListener(element)

            let problemCtrl = new ProblemWriteController(element, this.problemEmmiter)
            problemCtrl.priorityStandardList = this.priorityStandardList_1
            problemCtrl.answer = this.inputAnswerList_1[index]

            //if (index == 0) problemCtrl.activeBorderColor = "#54A318"
            //else if (index == 1) problemCtrl.activeBorderColor = "#177AF2"
            
            problemCtrl.priorityNum = index
            //2025.01.22 khy 수정 시작
            if (index == 0) {
                problemCtrl.keyBoardType = "korean";
            }
            //2025.01.22 khy 수정 끝

            problemCtrl.Init()

            this.ProblemList1.push(problemCtrl)
        })   
    }

    SetEvent() {
        let _embed2 = embed2.shadowRoot;
        this.chapter4_reset.addEventListener("click", (e) => {
            this.Clear()
        })

        const isEmbeddedComplete04 = () => {
            const numElements = _embed2.querySelectorAll('.answer_number .num');
            const allHaveText = Array.from(numElements[3]).every(element => 
                element.textContent.trim() !== ''
            );
            
            if(allHaveText){
                // 오른쪽 숫자 구하기
                const rightNum = Array.from({ length: 4 }, (_, i) => 
                    document.querySelector(`#problem4 #p4_value${1 + i}`).textContent
                ).join('');
                console.log(rightNum);
                let rightNumber = this.NumberTokrean(rightNum);
                    console.log(rightNumber);
                    // 인풋 활성화
                    this.ProblemList1.forEach((problem, index) => {
                        switch(index) {
                            case 0:
                                problem.keyBoardType = "korean"
                                problem.answerDiv.style.fontFamily = "Malgun"
                                problem.answerDiv.style.fontWeight = "bold"
                                problem.SetAnswerText(rightNumber)
                                // kkm_추가_처음일때만 Active
                                if(!problem.isActive) problem.Activate()
                                break;
                        }
                    })
            }
            this.isEmbeddedComplete = allHaveText;
            console.log(this.isEmbeddedComplete);
            return allHaveText;
        }

        const rightNumbers = () => {
            if(MainEvent.pageIdx === 3 && MainEvent.step === 'problem'){
                // 오른쪽 숫자 구하기
                const rightNum = Array.from({ length: 4 }, (_, i) => 
                    document.querySelector(`#problem4 #p4_value${1 + i}`).textContent
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
        
        const answerNumbers = _embed2.querySelectorAll(".answer_number");
        if (answerNumbers[3]) { // 4번째 요소가 존재하는지 확인
            answerNumbers[3].addEventListener("click", isEmbeddedComplete04);
        }
    }

    Reset() {
        this.isEmbeddedComplete04 = false;
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
        this.isEmbeddedComplete04 = false;
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
    NumberTokrean(num){
        const units = ["", "만", "억", "조", "경"];
        const digits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
        const positions = ["", "십", "백", "천"];
        
        if (num === 0) return "영";
      
        let result = "";
        let unitIndex = 0;
      
        while (num > 0) {
          let part = num % 10000; // 4자리씩 끊기
          num = Math.floor(num / 10000);
      
          if (part > 0) {
            let partStr = "";
            let positionIndex = 0;
      
            while (part > 0) {
              const digit = part % 10;
              if (digit > 0) {
                partStr = digits[digit] + positions[positionIndex] + partStr;
              }
              part = Math.floor(part / 10);
              positionIndex++;
            }
      
            result = partStr + units[unitIndex] + result;
          }
      
          unitIndex++;
        }
      
        return result;
    }

}