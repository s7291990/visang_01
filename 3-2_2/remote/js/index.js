import MainEvent from "./Activity/MainEvent.js";
import { StartCapture } from "./Utill/Capture.js";


function autoScale() {
    const findWidth = document.querySelector("#container");
    const width = findWidth.offsetWidth;
    const height = findWidth.offsetHeight;
    const givenWidth = 1920; // 너비
    const givenHeight = 1020; // 높이
    const targetWidth = width;
    const targetHeight = height;
    // 스케일 계산
    const calculatedScaleWidth = (targetWidth / givenWidth) * 100;
    const calculatedScaleHeight = (targetHeight / givenHeight) * 100;
    // 더 작은 값을 기준으로 스케일 적용
    const calculatedScale = Math.min(calculatedScaleWidth, calculatedScaleHeight);
    const wrap = document.querySelector(".wrap");
    wrap.style.transform = "scale(" + calculatedScale + "%)";

    MainEvent.leftScale = 1 - (calculatedScale/100)
}


let loadedComponents = 0
let totalComponents = document.querySelectorAll(".embed").length

// origin 컴포넌트 호출 후 메인 수행
window.addEventListener('component-loaded', () => {
    loadedComponents++;

    if (loadedComponents === totalComponents) {
        window.addEventListener('resize', function () {//autoscale
            autoScale();
        });

        autoScale();
        
        MainEvent.Init();
        MainEvent.Start();
        
        //데이터 로딩 후 화면 표출
        document.querySelector("#container").style.visibility = "visible"
        document.querySelector("#study_activity").style.visibility = "visible"
    }
});