import MainActivity from "./Activity/MainActivity.js";

var metaUrl = import.meta.url;
var scale = 0;
var shadow = null

function autoScale() {
    const findWidth = shadow.querySelector('#viewWrap');
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
    const wrap = shadow.querySelector(".wrap");
    wrap.style.transform = "scale(" + calculatedScale + "%)";
    scale = calculatedScale;
}


window.addEventListener("script-loaded", async function (e) {

    //======기본세팅========
    if (shadow) return;
    const u = new URL(metaUrl);
    const param = u.searchParams.get('embed-unique');

    if (param && param !== e.detail.unique) return;

    shadow = e.detail.root;

    window.addEventListener('resize', function () {//autoscale
        autoScale();
    });

    autoScale();
    shadow.querySelector("#contentsWrap").style.visibility = "visible"

    //======기본세팅 끝========

    let mainActivity = new MainActivity()

    mainActivity.shadow = shadow
    mainActivity.metaUrl = metaUrl
    mainActivity.scale = scale
    
    mainActivity.Init()
    mainActivity.Start()


});
