export async function SetTabIndex(root) {
    root.querySelectorAll("*").forEach(element => {
        element.setAttribute('tabindex', '-1');
        element.setAttribute("aria-hidden", "true")
    });

    setTimeout(() => {
        root.querySelectorAll("*").forEach(element => {
            element.setAttribute('tabindex', '-1');
            element.setAttribute("aria-hidden", "")
        });


        SetAriaLabel(root.querySelector("#full_screen_btn"), "전체화면 버튼")
        SetTabAttribute(root.querySelector("#full_screen_btn"), () => {})
    
        SetAriaLabel(root.querySelector("#reset_btn"), "새로고침 버튼")
        SetTabAttribute(root.querySelector("#reset_btn"), () => {})

        SetAriaLabel(root.querySelector("#reset_card_btn"), "초기화 버튼")
        SetTabAttribute(root.querySelector("#reset_card_btn"), () => {})

        SetAriaLabel(root.querySelector("#reset_card_popup_text"), "새로운 수를 입력할 수 있어요.")
        SetTabAttribute(root.querySelector("#reset_card_popup_text"), () => {})

        SetAriaLabel(root.querySelector("#reset_card_popup_btn_cancel"), "취소 버튼")
        SetTabAttribute(root.querySelector("#reset_card_popup_btn_cancel"), () => {})

        SetAriaLabel(root.querySelector("#reset_card_popup_btn_ok"), "확인 버튼")
        SetTabAttribute(root.querySelector("#reset_card_popup_btn_ok"), () => {})

        SetAriaLabel(root.querySelector("#total_number_3"), "오천만")
        SetTabAttribute(root.querySelector("#total_number_3"), () => {})

        SetAriaLabel(root.querySelector("#total_number_2"), "이백만")
        SetTabAttribute(root.querySelector("#total_number_2"), () => {})

        SetAriaLabel(root.querySelector("#total_number_1"), "칠십만")
        SetTabAttribute(root.querySelector("#total_number_1"), () => {})

        SetAriaLabel(root.querySelector("#total_number_0"), "팔만")
        SetTabAttribute(root.querySelector("#total_number_0"), () => {})

        SetAriaLabel(root.querySelector("#expand_btn"), "다음 버튼")
        SetTabAttribute(root.querySelector("#expand_btn"), () => {})

        SetAriaLabel(root.querySelector("#expanded_number_4_0"), "천만 자리 입력 박스")
        SetTabAttribute(root.querySelector("#expanded_number_4_0"), () => {})

        SetAriaLabel(root.querySelector("#answer_number_container").children[0], "천만 자리 정답 박스")
        SetTabAttribute(root.querySelector("#answer_number_container").children[0], () => {})

        SetAriaLabel(root.querySelector("#expanded_number_3_0"), "백만 자리 입력 박스")
        SetTabAttribute(root.querySelector("#expanded_number_3_0"), () => {})

        SetAriaLabel(root.querySelector("#answer_number_container").children[1], "백만 자리 정답 박스")
        SetTabAttribute(root.querySelector("#answer_number_container").children[1], () => {})

        SetAriaLabel(root.querySelector("#expanded_number_2_0"), "십만 자리 입력 박스")
        SetTabAttribute(root.querySelector("#expanded_number_2_0"), () => {})

        SetAriaLabel(root.querySelector("#answer_number_container").children[2], "십만 자리 정답 박스")
        SetTabAttribute(root.querySelector("#answer_number_container").children[2], () => {})

        SetAriaLabel(root.querySelector("#expanded_number_1_0"), "일만 자리 입력 박스")
        SetTabAttribute(root.querySelector("#expanded_number_1_0"), () => {})

        SetAriaLabel(root.querySelector("#answer_number_container").children[3], "일만 자리 정답 박스")
        SetTabAttribute(root.querySelector("#answer_number_container").children[3], () => {})
        
        // SetAriaLabel(root.querySelector(".drag6"), "여섯번째 꽃")
        // SetTabAttribute(root.querySelector(".drag6"), () => { }) 

        // SetAriaLabel(root.querySelector(".num1"), "세")
        // SetTabAttribute(root.querySelector(".num1"), () => { }) 

        // SetAriaLabel(root.querySelector(".text1"), "송이씩 꽂기")
        // SetTabAttribute(root.querySelector(".text1"), () => { }) 

        // SetAriaLabel(root.querySelector(".text2"), "꽃병은")
        // SetTabAttribute(root.querySelector(".text2"), () => { }) 

        // SetAriaLabel(root.querySelector(".num2"), "영")
        // SetTabAttribute(root.querySelector(".num2"), () => { }) 

        // SetAriaLabel(root.querySelector(".text3"), "개 필요합니다.")
        // SetTabAttribute(root.querySelector(".text3"), () => { }) 

        // SetAriaLabel(root.querySelector(".ukp__js_content_029"), "빈칸 02")
        // SetTabAttribute(root.querySelector(".ukp__js_content_029"), () => { }) 

        // SetAriaLabel(root.querySelector(".ukp__js_content_003"), "남은 을/를 똑같이 곳으로 나누기")
        // SetTabAttribute(root.querySelector(".ukp__js_content_003"), () => {})

        // SetAriaLabel(root.querySelector(".ukp__js_content_026"), "빈칸 03")
        // SetTabAttribute(root.querySelector(".ukp__js_content_026"), () => { }) 

        // SetAriaLabel(root.querySelector(".ukp__js_content_031"), "빈칸 04")
        // SetTabAttribute(root.querySelector(".ukp__js_content_031"), () => { }) 

        // SetAriaLabel(root.querySelector(".ukp__js_content_001"), "새로고침 버튼")
        // SetTabAttribute(root.querySelector(".ukp__js_content_001"), () => {})

            let keyboardBtnList = root.querySelectorAll('.key')
            console.log(keyboardBtnList)
            let keyboardBLabel = ["일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "영"]
    
            keyboardBtnList.forEach((element, index) => {
                SetAriaLabel(element, keyboardBLabel[index])
                SetTabAttribute(element, () => {})
            })

            root.querySelector('[tabindex="1"]').focus();

    }, 100)
}


let tabIdx = 1
/** 탭 부여 */
function SetTabAttribute(element, callBack = null) {
    element.setAttribute("tabindex", tabIdx)
    tabIdx++

    if (!callBack) return

    element.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            element.click()
            callBack()
        }
    });
}

/** 탭 텍스트 부여 */
export function SetAriaLabel(element, text) {
    element.setAttribute("aria-label", text)
}