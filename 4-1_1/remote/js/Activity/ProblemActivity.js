import { ShowEmbed } from "../Utill/EmbedUtill.js";
import EventEmitter from "../Utill/EventEmitter.js";
import { SwitchController } from "../Utill/SwitchController.js"
import MainEvent from "./MainEvent.js"
import Problem_1 from "./problem/Problem_1.js"
import Problem_2 from "./problem/Problem_2.js"
import Problem_3 from "./problem/Problem_3.js"
import Problem_4 from "./problem/Problem_4.js"
import Problem_5 from "./problem/Problem_5.js"

export default class ProblemActivity {
    constructor() {

        this.embed = document.querySelector("#embed1")
        this.embed2 = document.querySelector("#embed2")

        this.problem_stepList_dom = document.querySelector("#problem_stepList")
        this.problem_stepList = document.querySelectorAll(".problem_step")
        this.problem_contentList = document.querySelectorAll(".problem_content")

        this.problem_1 = new Problem_1()
        this.problem_2 = new Problem_2()
        this.problem_3 = new Problem_3()
        this.problem_4 = new Problem_4()
        this.problem_5 = new Problem_5()

        this.problemIdx = 0;
    }

    Init() {
        this.ProblemEvent()

        this.problem_1.Init()
        this.problem_2.Init()
        this.problem_3.Init()
        this.problem_4.Init()

        this.problem_stepList[0].click()


        //(테스트용) 원하는 페이지 한 번에 이동시키기
        // MainEvent의 this.step = this.Step.PROBLEM 바꾸고 오기
        setTimeout(() => {
            // this.problem_stepList[3].click()
        })
        
    }


    //#region 문제풀이

    ProblemEvent() {
        this.problemStepEmmiter = new EventEmitter()
        this.problem_stepList.forEach((element, index) => {
            let switchCtrl = new SwitchController(element, this.problemStepEmmiter)
            switchCtrl.index = index

            switchCtrl.SelectOneLeftOff = (data) => {
                if (data.isTarget) {
                    this.problem_contentList[data.index].style.display = "flex"
                } else {
                    this.problem_contentList[data.index].style.display = "none"
                }
            }

            element.addEventListener("click", (e) => {
                MainEvent.pageIdx = index
                MainEvent.tabIdx = undefined
                MainEvent.subTabIdx = undefined

                switch(index) {
                    case 0:
                        ShowEmbed(0)
                        this.problem_1.Clear()
                        break
                    case 1:
                        ShowEmbed(0)
                        this.problem_2.Clear()
                        break;
                    case 2:
                        ShowEmbed(0)
                        this.problem_3.Clear()
                        break;
                    case 3:
                        ShowEmbed(1)
                        this.problem_4.Clear()
                        break;
                }


                this.TabClear()
                if (index == 0) {
                    element.style.borderTopRightRadius = "30px"

                    this.problem_stepList[0].style.borderRight = "3px solid #CCD7E1"

                    this.problem_stepList[2].style.borderLeft = "3px solid #CCD7E1"

                    this.problem_stepList[3].style.borderLeft = "3px solid #CCD7E1"
                } 
                else if (index == 1) {
                    this.problem_stepList[1].style.borderTopRightRadius = "30px"
                    this.problem_stepList[1].style.borderTopLeftRadius = "30px"
                    this.problem_stepList[1].style.borderRight = "3px solid #CCD7E1"
                    this.problem_stepList[1].style.borderLeft = "3px solid #CCD7E1"

                    this.problem_stepList[3].style.borderLeft = "3px solid #CCD7E1"
                }
                else if (index == 2) {
                    this.problem_stepList[1].style.borderLeft = "3px solid #CCD7E1"

                    this.problem_stepList[2].style.borderTopRightRadius = "30px"
                    this.problem_stepList[2].style.borderTopLeftRadius = "30px"
                    this.problem_stepList[2].style.borderRight = "3px solid #CCD7E1"
                    this.problem_stepList[2].style.borderLeft = "3px solid #CCD7E1"
                } else if (index == 3) {
                    this.problem_stepList[1].style.borderLeft = "3px solid #CCD7E1"

                    this.problem_stepList[2].style.borderLeft = "3px solid #CCD7E1"

                    this.problem_stepList[3].style.borderTopLeftRadius = "30px"
                    this.problem_stepList[3].style.borderLeft = "3px solid #CCD7E1"
                    this.problem_stepList[3].style.borderTopLeftRight = "30px"
                    this.problem_stepList[3].style.borderRight = "3px solid #CCD7E1"
                }

                element.style.zIndex = "2"
                element.style.borderBottom = "3px dashed #CCD7E1"
                element.style.backgroundColor = "#F9FDFF"
                element.style.color = "#003776"
            })

            switchCtrl.Init()
        })
        
    }
    //#endregion

    TabClear() {
        this.problem_stepList.forEach((element, index) => {
            element.style.zIndex = "1"

            element.style.backgroundColor = "#E2EBF4"
            element.style.borderTopRightRadius = "100px 3px"
            element.style.borderTopLeftRadius = "100px 3px"
            element.style.borderRight = "3px solid transparent"
            element.style.borderLeft = "3px solid transparent"
            element.style.borderTop = "3px solid #CCD7E1"
            element.style.borderBottom = "3px solid #CCD7E1"
            element.style.color = "rgba(0, 55, 118, 0.40)"

            if (index == 0) {
                element.style.borderTopLeftRadius = "30px"
                element.style.borderLeft = "3px solid #CCD7E1"
            }
            
            else if (index == 3) {
                element.style.borderTopRightRadius = "30px"
                element.style.borderRight = "3px solid #CCD7E1"
            }
        })
    }

    Clear() {

    }


}