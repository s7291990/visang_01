import MainEvent from "./MainEvent.js"

export default class IntroActivity {
    constructor() {
        this.step1Btn = document.querySelector("#step1Btn")
        this.step2Btn = document.querySelector("#step2Btn")
    }

    Init() {
        this.SetBtnEvent()
    }

    SetBtnEvent() {
        this.step1Btn.addEventListener("click", (e) => {
            MainEvent.step = MainEvent.Step.CHAPTER
            MainEvent.SetStep()
            MainEvent.chapter.chapterBtnList[0].click();
        
            let _embed1 = embed1.shadowRoot; 
            _embed1.querySelector("#reset_btn").click();
            _embed1.querySelector("#total_number_5 .num").innerText = "6";
            _embed1.querySelector("#total_number_4 .num").innerText = "8";
            _embed1.querySelector("#total_number_3 .num").innerText = "2";
            _embed1.querySelector("#total_number_2 .num").innerText = "6";
            _embed1.querySelector("#total_number_1 .num").innerText = "3";
        })

        this.step2Btn.addEventListener("click", (e) => {
            MainEvent.step = MainEvent.Step.PROBLEM
            MainEvent.SetStep()
            MainEvent.chapter.chapterBtnList[0].click()
            MainEvent.problem.problem_stepList[0].click();
            let _embed1 = embed1.shadowRoot; 
            _embed1.querySelector("#reset_card_popup_btn_ok").click();
        })
    }

    Clear() {

    }


}