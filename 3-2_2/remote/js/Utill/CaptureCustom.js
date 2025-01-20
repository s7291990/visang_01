import MainEvent from "../Activity/MainEvent.js";
import { EmbedCase } from "./EmbedCase.js";

/** 캡쳐 시작시 스타일 변경 */
export function ChangeCaptureStyle() {
    //공통
    DocBoxShadow.Change()

    //임베디드2가 사용될 경우
    if (EmbedCase.chapter_2() || EmbedCase.problem_4()) {
        Embed2Input.Change()
        Embed2Svg.Change()
        Embed2DotImg.Change()
    }
}

/** 캡쳐 종료시 스타일 복구 */
export function RollBackCaptureStyle() {
    //공통
    DocBoxShadow.RollBack()

    //임베디드2가 사용될 경우
    if (EmbedCase.chapter_2() || EmbedCase.problem_4()) {
        Embed2Input.RollBack()
        Embed2Svg.RollBack()
        Embed2DotImg.RollBack()
    }
}






//#region ==============
//#endregion







//#region 공통 box-shadow
let DocBoxShadow = {}
let boxShadowStyleStorage = new Map();
DocBoxShadow.Change = () => {
    Array.from(document.querySelectorAll("*")).forEach((e) => {
        const computedStyle = window.getComputedStyle(e);
    
        const boxShadow = computedStyle.boxShadow;
        //boxShadow를 가진 요소
        if (boxShadow) {
            boxShadowStyleStorage.set(e, boxShadow);
            e.style.boxShadow = "none";
        }
    });
} 

DocBoxShadow.RollBack = () => {
    boxShadowStyleStorage.forEach((boxShadow, element) => {
        element.style.boxShadow = boxShadow;
    });

    boxShadowStyleStorage = new Map();
} 
//#endregion



//#region ==============
//#endregion








//#region 임베디드2 input

let Embed2Input = {}

let Embed2InputElementStorage = []
let Embed2TempDivElementStorage = []
Embed2Input.Change = () => { 
    let embed2 = MainEvent.embed2

    if (!embed2) return;

    Array.from(embed2.querySelectorAll("input")).forEach((e) => {
        const computedStyle = window.getComputedStyle(e);

        const tempDiv = document.createElement('div');

        for (let style of computedStyle) {
            tempDiv.style[style] = computedStyle.getPropertyValue(style);
        }
        tempDiv.textContent = e.value;
        tempDiv.style.display = "flex"
        tempDiv.style.justifyContent = "center"
        tempDiv.style.alignItems = "center"

        e.parentNode.insertBefore(tempDiv, e.nextSibling);
        
        Embed2InputElementStorage.push({el: e, display: computedStyle.display})
        e.style.display = "none"

        Embed2TempDivElementStorage.push(tempDiv)
    })
}

Embed2Input.RollBack = () => { 
    Embed2InputElementStorage.forEach((element, index) => {
        element.el.style.display = element.display
    })

    Embed2TempDivElementStorage.forEach((element, index) => {
        element.remove()
    })

    Embed2InputElementStorage = []
    Embed2TempDivElementStorage = []
}
//#endregion


//#region 임베디드2 SVG
let Embed2Svg = {}
let Embed2SvgElement = []
let Embed2SvgParent = []

Embed2Svg.Change = () => {
    let embed2 = MainEvent.embed2

    if (!embed2) return;

    Array.from(embed2.querySelectorAll(".triangle")).forEach((e, index) => {
        let span = document.createElement("span")

        let grandParent = e.parentNode.parentNode
        let parent = e.parentNode

        if (!parent.classList.contains('hid')) {
            console.log(e)
            Embed2SvgElement.push(e)
            Embed2SvgParent.push(parent)

            span.appendChild(e)

            grandParent.insertBefore(span, e.parentNode.nextSibling)

            span.style.position = "absolute"

            //큰 화살표
            if (index % 2 == 0) {
                parent.style.zIndex = "1"
                embed2.querySelectorAll(".number_wrap").forEach((element, index) => { element.style.zIndex = "2"})

                //초록
                if (index == 0) {
                    span.style.top = "789px"
                    span.style.left = "495px"
                    span.style.transform = "rotate(328deg)"
                } 
                //파랑
                else if (index == 2) {
                    span.style.top = "786px"
                    span.style.left = "749px"
                } 
                //빨강
                else if (index == 4) {
                    span.style.top = "793px"
                    span.style.left = "999px"
                    span.style.transform = "rotate(32deg)"
                }

            } 
            //작은 화살표
            else {
                parent.style.zIndex = "0"

                //초록
                if (index == 1) 
                    span.style.top = "760px"
                //파랑
                else if (index == 3) 
                    span.style.top = "649px"
                //빨강
                else if (index == 5) 
                    span.style.top = "538px"


                span.style.left = "1561px"

                if (EmbedCase.problem_4()) {
                    let allSum = MainEvent.problem.problem_4.value1 * MainEvent.problem.problem_4.value2
                    if (allSum >= 1000) {
                        span.style.left = "1461px"
                    }
                }
            }
        }
    })
}

Embed2Svg.RollBack = () => {
    Embed2SvgElement.forEach((element, index) => {
        let span = element.parentNode
        Embed2SvgParent[index].appendChild(element)
        span.remove()
    })

    Embed2SvgElement = []
    Embed2SvgParent = []
}
//#endregion


//#region 임베디드2 점선 이미지
let Embed2DotImg = {}

Embed2DotImg.Change = () => {
    let embed2 = MainEvent.embed2

    if (!embed2) return;
    let calc = embed2.querySelector(".vertical_calc")

    const children = Array.from(calc.children);

    children.forEach((element, index) => {
        element.style.position = "absolute"
        element.style.zIndex = '10';

        if (index == 0) {
            element.style.zIndex = '0';
            element.style.height = "663px"
        }

        if (index == 2) element.style.top = "208px"
        else if (index == 3) element.style.top = "214px"
        else if (index == 4) element.style.top = "543px"
        else if (index == 5) element.style.top = "549px"
    });
}

Embed2DotImg.RollBack = () => {
    let embed2 = MainEvent.embed2
    let calc = embed2.querySelector(".vertical_calc")

    const children = Array.from(calc.children);

    children.forEach((element, index) => {
        element.style.zIndex = ""
        element.style.height = ""
        element.style.position = ""
        element.style.top = ""
    })
}
//#endregion




//#region ==============
//#endregion