import MainEvent from "../Activity/MainEvent.js";


export class SwitchController {
    constructor(element, eventEmitter) {
        this.element = element
        this.eventEmitter = eventEmitter;

        this.index = 0;

        /** 이벤트 수행 대상인지 정보 확인하는 객체 */
        this.TargetData = {}

        /** 트리거 이벤트 수행시킬지 구분 */
        this.triggerName = "selectOneLeftOff"


        /** 하나만 선택, 나머지는 비선택 */
        this.SelectOneLeftOff = (data) => {}
    }

    Init() {
        this.element.addEventListener("click", (e) => {
            this.TargetData = {isTarget: true}
            this.TriggerEvent()
            this.TargetData = {}
        });

        //---------------- 트리거 이벤트 ---------------

        this.eventEmitter.on("selectOneLeftOff", (data) => {
            this.TargetData.element = this.element
            this.TargetData.index = this.index
            
            this.SelectOneLeftOff(this.TargetData)
        });

        //---------------------------------------------
    }

    TriggerEvent(data) {
        this.eventEmitter.emit(this.triggerName, data);
    }
}