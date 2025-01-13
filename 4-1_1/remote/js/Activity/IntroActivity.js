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
            MainEvent.chapter.chapterBtnList[0].click()
        })

        this.step2Btn.addEventListener("click", (e) => {
            MainEvent.step = MainEvent.Step.PROBLEM
            MainEvent.SetStep()
            MainEvent.chapter.chapterBtnList[0].click()
            MainEvent.problem.problem_stepList[0].click()
        })
    }

    Clear() {

    }


}