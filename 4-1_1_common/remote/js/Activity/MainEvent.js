import { SetActivityArray, SetDeActivityArray } from "../Utill/ActiveController.js";
import { StartCapture } from "../Utill/Capture.js";
import { InitPopup } from "../Utill/PopUp.js";
import ChapterActivity from "./ChapterActivity.js";
import IntroActivity from "./IntroActivity.js";
import ProblemActivity from "./ProblemActivity.js";

export class MainEvent {
    constructor() {
        this.chapter_content = document.querySelector("#chapter_content")
        this.problem_content = document.querySelector("#problem_content")

        this.topArea_type = document.querySelector("#topArea_type")
        this.bottom_nav = document.querySelector("#bottom_nav")

        this.capture = document.querySelector("#capture")

        this.top_container = document.querySelector("#top_container")

        // 챕터 1
        this.chapter1Active5 = false;
        this.chapter1Active4 = false;
        this.chapter1Active3 = false;
        this.chapter1Active2 = false;
        this.chapter1Active1 = false;

        
        this.chapter1Array = [];
        this.chapter1HanglArray = [];

        // 챕터1에서 사용될 활성화 함수
        this.ch1ActiveInput = null;

        // 챕터 2
        this.chapter2Active4 = false;
        this.chapter2Active3 = false;
        this.chapter2Active2 = false;
        this.chapter2Active1 = false;

        this.chapter2Array = [];
        this.chapter2HanglArray = [];

        // 문제 12번 관련 사용 Flag
        this.stopComparing = false;

        if (!MainEvent.instance) {
            MainEvent.instance = this;
        }
        return MainEvent.instance;
    }

    Init() {
        this.metaUrl = import.meta.url
        const url = new URL(this.metaUrl);

        // RootPath 설정 (필요시 변경, 추가)
        this.RootPath = url.origin + new URL(this.metaUrl).pathname.split('/').slice(0, -3).join('/');
        this.ImgPath = this.RootPath + "/img/"

        this.Intro = document.querySelector("#intro_activity")
        this.Study = document.querySelector("#study_activity")

        this.intro = new IntroActivity()
        this.chapter = new ChapterActivity()
        this.problem = new ProblemActivity()
    
        this.Step = {
            INTRO: "intro",
            CHAPTER: "chapter",
            PROBLEM: "problem"
        }

        //현재 페이지 상태 (테스트 및 기능 구현시 초기값 변경 가능)
        this.step = this.Step.INTRO

        //브라우저 기본 드래그 이벤트 사용 불가능하게
        document.body.ondragstart = new Function("return false"); Function("return false");

        /** 페이지 인덱스 */
        this.pageIdx = 0

        /** 탭 인덱스 */
        this.tabIdx = undefined

        /** 서브탭 인덱스 */
        this.subTabIdx = undefined

    }

    Start() {
        this.intro.Init()
        
        this.chapter.Init()
        this.problem.Init()

        this.SetStep()

        InitPopup()

        this.capture.addEventListener("click", (e) => {
            StartCapture()
        })
    }

    SetStep() {
        switch(this.step) {
            case this.Step.INTRO:
                this.Intro_Step()
                break;
            case this.Step.CHAPTER:
                this.Chapter_Step()
                break;
            case this.Step.PROBLEM:
                this.Problem_Step()
                break;
        }
    }

    /** 인트로 화면 표출 */
    Intro_Step() {
        SetActivityArray([this.Intro])
        SetDeActivityArray([this.Study])
    }

    /** 개념학습 화면 표출 */
    Chapter_Step() {
        SetActivityArray([this.Study])
        SetDeActivityArray([this.Intro])

        SetActivityArray([this.chapter_content])
        SetDeActivityArray([this.problem_content])
        this.topArea_type.textContent = "개념 학습"
        this.topArea_type.style.color = "#004807"
        this.top_container.style.background = "#209E2C"
        this.bottom_nav.style.display = "flex"
    }

    /** 문제풀이 화면 표출 */
    Problem_Step() {
        SetActivityArray([this.Study])
        SetDeActivityArray([this.Intro])

        SetActivityArray([this.problem_content])
        SetDeActivityArray([this.chapter_content])
        this.topArea_type.textContent = "문제 풀이"
        this.topArea_type.style.color = "#003776"
        this.top_container.style.background = "#257ADB"
        this.bottom_nav.style.display = "none"
    }

    /** 초기화 */
    Clear() {
        
    }

    SetChapter1Active(unit, state) {
        if(unit === "5"){
            this.chapter1Active5 = state;
        }else if(unit === "4"){
            this.chapter1Active4 = state;
        }else if(unit === "3"){
            this.chapter1Active3 = state;
        }else if(unit === "2"){
            this.chapter1Active2 = state;
        }else if(unit === "1"){
            this.chapter1Active1 = state;
        }
        

        // console.log("chapter1ACtive5: ", this.chapter1Active5)
        // console.log("chapter1Active4: ", this.chapter1Active4)
        // console.log("chapter1Active3: ", this.chapter1Active3)
        // console.log("chapter1Active2: ", this.chapter1Active2)
        // console.log("chapter1Active1: ", this.chapter1Active1)
        this.ch1ActiveInput();
    }

}

// 인스턴스를 생성하고 기본으로 내보냄
const instance = new MainEvent();

export default instance;