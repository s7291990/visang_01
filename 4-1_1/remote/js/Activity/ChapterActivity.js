import { ShowEmbed } from "../Utill/EmbedUtill.js"
import EventEmitter from "../Utill/EventEmitter.js"
import { SwitchController } from "../Utill/SwitchController.js"
import Chapter_1_1 from "./chapter/Chapter_1_1.js"
import Chapter_2_1 from "./chapter/Chapter_2_1.js"
//import Chapter_2_2 from "./chapter/Chapter_2_2.js"
import Chapter_3_1 from "./chapter/Chapter_3_1.js"
import MainEvent from "./MainEvent.js"

export default class ChapterActivity {
    constructor() {
        this.homeBtn = document.querySelector("#homeBtn")

        this.chapterBtnList = document.querySelectorAll(".chapterBtn")
        this.chapterList = document.querySelectorAll(".chapter")

        this.embed = document.querySelector("#embed1")
        this.embed2 = document.querySelector("#embed2")

        this.chaper2_subBtnList = document.querySelectorAll(".chaper2_subBtn")
        this.chaper2_subList = document.querySelectorAll(".chaper2_sub")

        this.chapter_content = document.querySelector("#chapter_content")

        this.problemBtn = document.querySelector("#problemBtn")

        this.leftBottom = document.querySelector("#leftBottom")

        this.chapter_1_1 = new Chapter_1_1()
        this.chapter_2_1 = new Chapter_2_1()
        //this.chapter_2_2 = new Chapter_2_2()
        this.chapter_3_1 = new Chapter_3_1()

        this.isTabUse = false
    }

    Init() {
        this.SetEvent()

        this.SetChapterEvent()
        this.TabEvent()

        this.chapter_1_1.Init()
        this.chapter_2_1.Init()
        //this.chapter_2_2.Init()
        this.chapter_3_1.Init()

        this.embed2.style.display = "none"
        

        //(테스트용) 원하는 페이지 한 번에 이동시키기
        // MainEvent의 this.step = this.Step.CHAPTER 바꾸고 오기
        setTimeout(() => {
            // this.chapterBtnList[1].click()
        })
        
        
    }

    //#region 챕터
    SetChapterEvent() {
        this.chapterEmmiter = new EventEmitter()
        this.chapterBtnList.forEach((element, index) => {
            let switchCtrl = new SwitchController(element, this.chapterEmmiter)
            switchCtrl.index = index

            switchCtrl.SelectOneLeftOff = (data) => {
                if (data.isTarget) {
                    data.element.style.backgroundColor = "#209E2C"
                    data.element.style.color = "#ffffff"

                    this.chapterList[data.index].style.display = "block"

                    //정리차시일 경우 UI 수정, 그 이외 복구
                    if (data.index == 2) {
                        this.chapter_content.style.border = "none"
                        this.chapter_content.style.background = "#ffffff"
                        this.problemBtn.style.visibility = "visible"

                        this.leftBottom.style.zIndex = 2
                        this.leftBottom.style.position = "absolute"
                        this.leftBottom.style.width = "1220px"
                        this.leftBottom.style.top = "927px"
                    } else {
                        this.chapter_content.style.border = "3px solid rgba(204, 225, 205, 1)"
                        this.chapter_content.style.backgroundColor = "##FAFFF9"
                        this.problemBtn.style.visibility = "hidden"

                        this.leftBottom.style.zIndex = ""
                        this.leftBottom.style.position = ""
                        this.leftBottom.style.width = ""
                        this.leftBottom.style.top = ""
                    }
                } else {
                    data.element.style.backgroundColor = "#cfcfcf"
                    data.element.style.color = "#6a6a6a"

                    this.chapterList[data.index].style.display = "none"   
                }
        
            }

            element.addEventListener("click", (e) => {
                MainEvent.pageIdx = index
                MainEvent.tabIdx = undefined
                MainEvent.subTabIdx = undefined
                
                //탭 사용 여부
                MainEvent.isTab = false

                this.chapter_content.style.backgroundColor = "rgb(250, 255, 249)"

                switch(index) {
                    case 0:
                        ShowEmbed(0)
                        this.chapter_1_1.Clear()
                        break
                    case 1:  
                        ShowEmbed(1)
                        this.isTabUse = false
                        this.chapter_content.style.backgroundColor = "rgba(226, 244, 227, 1)"

                        this.TabClear()
                        this.chaper2_subBtnList[1].style.borderLeft = "3px solid rgb(204, 225, 205)"
                        this.chapter_2_1.Clear()
                        break;
                    case 2:
                        this.chapter_3_1.Clear()
                        break;
                }
                
            })

            switchCtrl.Init()
        })
    }
    //#endregion


    //#region 탭
    TabEvent() {

        this.subChapterEmmiter = new EventEmitter()
        this.chaper2_subBtnList.forEach((element, index) => {
            let switchCtrl = new SwitchController(element, this.subChapterEmmiter)
            switchCtrl.index = index

            switchCtrl.SelectOneLeftOff = (data) => {
                if (this.isTabUse == false) return

                if (data.isTarget) {
                    this.chaper2_subList[data.index].style.display = "flex"
                } else {
                    this.chaper2_subList[data.index].style.display = "none"
                }
            }

            element.addEventListener("click", (e) => {
                if (this.isTabUse == false) return

                MainEvent.tabIdx = index
                
                //탭 사용 여부
                MainEvent.isTab = true

                switch(index) {
                    case 0:                        
                        this.chapter_2_1.Reset()
                        break
                    case 1:
                        this.chapter_2_2.Reset(this.chapter_2_2.isActive)
                        break;
                }

                this.TabClear()
                if (index == 0) {
                    element.style.borderTopRightRadius = "27px"
                    element.style.borderRight = "3px solid rgba(204, 225, 205, 1)"
                } else if (index == 1) {
                    element.style.borderTopLeftRadius = "27px"    
                    element.style.borderLeft = "3px solid rgba(204, 225, 205, 1)"
                }

                this.chapter_content.style.backgroundColor = "rgba(250, 255, 249, 1)"

                element.style.color = "#005B09"
                element.style.backgroundColor = "rgba(250, 255, 249, 1)"
                element.style.borderBottom = "3px dashed rgba(204, 225, 205, 1)";
            })

            switchCtrl.Init()
        })
    }

    TabClear() {
        this.chaper2_subBtnList.forEach((element, index) => {
            element.style.zIndex = "1"

            element.style.borderTopRightRadius = "100px 3px"
            element.style.borderTopLeftRadius = "100px 3px"
            element.style.borderRight = "3px solid transparent"
            element.style.borderLeft = "3px solid transparent"
            element.style.borderTop = "3px solid rgba(204, 225, 205, 1)"
            element.style.borderBottom = "3px solid rgba(204, 225, 205, 1)"
            element.style.color = "rgba(0, 91, 9, 0.4)"
            element.style.backgroundColor = "rgba(226, 244, 227, 1)"

            if (index == 0) {
                element.style.borderTopLeftRadius = "30px"
                element.style.borderLeft = "3px solid rgba(204, 225, 205, 1)"
            }
            
            else if (index == 1) {
                element.style.borderTopRightRadius = "30px"
                element.style.borderRight = "3px solid rgba(204, 225, 205, 1)"
            }
        })
    }
    //#endregion

    //#region 기타 이동 제어
    SetEvent() {
        this.homeBtn.addEventListener("click", (e) => {
            MainEvent.step = MainEvent.Step.INTRO
            MainEvent.SetStep()
        })

        this.problemBtn.addEventListener("click", (e) => {
            MainEvent.step = MainEvent.Step.PROBLEM
            MainEvent.SetStep()

            setTimeout(() => {
                this.chapterBtnList[0].click()
                MainEvent.problem.problem_stepList[0].click()
            })
        })
    }
    //#endregion

    Clear() {

    }


}