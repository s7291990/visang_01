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

        SetAriaLabel(root.querySelector("#total_number_container"), "6만8천2백6십3")
        SetTabAttribute(root.querySelector("#total_number_container"), () => {
            root.querySelector("#total_number_container").click();
        })

        SetAriaLabel(root.querySelector("#visibility_5"), "만 자릿수 박스 확인 버튼")
        SetTabAttribute(root.querySelector("#visibility_5"), () => { })

        SetAriaLabel(root.querySelector("#visibility_4"), "천 자릿수 박스 확인 버튼")
        SetTabAttribute(root.querySelector("#visibility_4"), () => { }) 

        SetAriaLabel(root.querySelector("#visibility_3"), "백 자릿수 박스 확인 버튼")
        SetTabAttribute(root.querySelector("#visibility_3"), () => { }) 

        SetAriaLabel(root.querySelector("#visibility_2"), "십 자릿수 박스 확인 버튼")
        SetTabAttribute(root.querySelector("#visibility_2"), () => { }) 

        SetAriaLabel(root.querySelector("#visibility_1"), "일 자릿수 박스 확인 버튼")
        SetTabAttribute(root.querySelector("#visibility_1"), () => { }) 

        SetAriaLabel(root.querySelector("#answer_number_5"), "만 자릿수 입력 박스")
        SetTabAttribute(root.querySelector("#answer_number_5"), () => { }) 

        SetAriaLabel(root.querySelector("#string_number_5"), "만 자릿수 확인 박스")
        SetTabAttribute(root.querySelector("#string_number_5"), () => { }) 

        SetAriaLabel(root.querySelector("#answer_number_4"), "천 자릿수 입력 박스")
        SetTabAttribute(root.querySelector("#answer_number_4"), () => { }) 

        SetAriaLabel(root.querySelector("#string_number_4"), "천 자릿수 확인 박스")
        SetTabAttribute(root.querySelector("#string_number_4"), () => { }) 

        SetAriaLabel(root.querySelector("#answer_number_3"), "백 자릿수 입력 박스")
        SetTabAttribute(root.querySelector("#answer_number_3"), () => { }) 

        SetAriaLabel(root.querySelector("#string_number_3"), "백 자릿수 확인 박스")
        SetTabAttribute(root.querySelector("#string_number_3"), () => { }) 

        SetAriaLabel(root.querySelector("#answer_number_2"), "십 자릿수 입력 박스")
        SetTabAttribute(root.querySelector("#answer_number_2"), () => { }) 

        SetAriaLabel(root.querySelector("#string_number_2"), "십 자릿수 확인 박스")
        SetTabAttribute(root.querySelector("#string_number_2"), () => { }) 

        SetAriaLabel(root.querySelector("#answer_number_1"), "일 자릿수 입력 박스")
        SetTabAttribute(root.querySelector("#answer_number_1"), () => { }) 

        SetAriaLabel(root.querySelector("#string_number_1"), "일 자릿수 확인 박스")
        SetTabAttribute(root.querySelector("#string_number_1"), () => { }) 
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