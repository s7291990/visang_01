import MainEvent from "../Activity/MainEvent.js"
import { ChangeCaptureStyle, RollBackCaptureStyle } from "./CaptureCustom.js";
import { EmbedCase } from "./EmbedCase.js";

/** 캡쳐 */
export function StartCapture() {
    let wrap = document.querySelector(".wrap");
    const originalTransform = wrap.style.transform;

    // 캡쳐할 때 일시적으로 변경시킬 CSS -------------------------
    wrap.style.transform = `scale(1)`;
    ChangeCaptureStyle()    
    //--------------------------------------------------

    let titleText = GetStepText()
    document.querySelector("#loading").style.display = "block"

    // 캡쳐
    html2canvas(wrap.querySelector("#study_activity"), {
        useCORS: true,
    }).then(function(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = "middle"

        const imgData = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = imgData;
        link.download = '4학년_1학기_4단원_3~4차시_'+ titleText +'.png';
        link.click();
        document.querySelector("#loading").style.display = "none"
    }).catch(function(error) {
        document.querySelector("#loading").style.display = "none"
    });

    
    // 캡쳐할 때 일시적으로 변경시킨 CSS 복구-------------------
    wrap.style.transform = originalTransform;
    RollBackCaptureStyle()
    //------------------------------------------------   
}


/** 이미지 타이틀 스탭값 */
function GetStepText() {
    let text = ""

    switch (MainEvent.step) {
        case MainEvent.Step.CHAPTER:
            text += "개념학습_"
            break;
        case MainEvent.Step.PROBLEM:
            text += "문제풀이_"
            break;
    }

    //페이지
    text += GetSubStepText(MainEvent.pageIdx + 1)

    //탭
    if (MainEvent.tabIdx != undefined)
        text += "_" + GetSubStepText(MainEvent.tabIdx + 1)

    //서브 탭
    if (MainEvent.subTabIdx != undefined)
        text += "-" + GetSubStepText(MainEvent.subTabIdx + 1)

    return text
}

/** 이미지 타이틀 페이지값 */
function GetSubStepText(subStep = "") {
    let text = ""

    text += subStep

    return text
}

