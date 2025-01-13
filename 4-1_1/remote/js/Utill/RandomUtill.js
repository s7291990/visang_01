/** 최대값 최소값 내의 랜덤한 수 가져오기 
 * @example GetRandomValue(1, 100) => 1에서 100사이의 수중 랜덤으로 하나 나온다
 * */
export function GetRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}