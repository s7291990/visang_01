import MainEvent from "../Activity/MainEvent.js";
import { RemoveListener } from "./EventListenerHelper.js";

/** 팝업 이벤트 생성 */
export function InitPopup() {
    let popup = document.querySelector("#popup")
    let popup_close = document.querySelector("#popup_close")
    popup_close = RemoveListener(popup_close)

    popup_close.addEventListener("click", () => {
        popup.style.display = "none"
    })
}


/** 팝업 배경 변경 */
export function ChangeDimImg() {

}


/** 팝업 텍스트 변경 */
export function ChangePopupText() {
    
}