import anime from "../Library/anime.js"

/**
 * 자주 쓰는 애니메이션 통합
 */
export const AnimationHelper = {

    /** 버튼 클릭시 일시적으로 작아졌다 커지기 */
    "BtnClick": (element, onComplete = null) => {
        return anime({
            targets: element,
            scale: [1, 0.9, 1],
            duration: 200, // 애니메이션 지속 시간 (밀리초)
            easing: 'linear', // 애니메이션 효과
            complete: () => {
                if (onComplete) {
                    onComplete();
                }
            }
        });
    },

    /** 오답시 좌우로 빠르게 왔다갔다 */
    "Wrong": (element, onComplete = null) => {
        return anime({
            targets: element,
            opacity: [0, 1, 0, 1],
            duration: 1800,
            easing: 'linear',
            complete: () => {
                if (onComplete) {
                    onComplete();
                }
            }
        });
    },

    "Opacity": (element, startVal = 0, endVal = 1, duration = 1000, onComplete) => {
        return anime({
            targets: element,
            opacity: [startVal, endVal],
            duration: duration,
            easing: 'linear',
            complete: () => {
                if (onComplete) {
                    onComplete();
                }
            }
        });
    },

    "DropDown": (element, val1, val2, onComplete) => {
        return anime({
            targets: element,
            scale: [val1, val2], 
            duration: 300,
            easing: 'linear',
            complete: () => {
                if (onComplete) {
                    onComplete();
                }
            }
        });
    },

    "TopMove": async (element, value, duration, onComplete) => {
        duration = duration * 1000

        return anime({
            targets: element,
            top: value + 'px',
            duration: duration,
            easing: 'easeInOutQuad',
            complete: () => {
                if (onComplete) {
                    onComplete();
                }
            }
        });
    },
}