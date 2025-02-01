import MainEvent from "../Activity/MainEvent.js"

export function EmbedCase() {}

EmbedCase.chapter = () => {
    return (MainEvent.step == MainEvent.Step.CHAPTER)
}

EmbedCase.chapter_1 = () => {
    return (MainEvent.step == MainEvent.Step.CHAPTER && MainEvent.pageIdx == 0);
}

EmbedCase.chapter_2 = () => {
    return (MainEvent.step == MainEvent.Step.CHAPTER && MainEvent.pageIdx == 1);
}

EmbedCase.chapter_2_1 = () => {
    return (MainEvent.step == MainEvent.Step.CHAPTER && MainEvent.pageIdx == 1 && MainEvent.tabIdx == 0);
}

EmbedCase.chapter_2_2 = () => {
    return (MainEvent.step == MainEvent.Step.CHAPTER && MainEvent.pageIdx == 1 && MainEvent.tabIdx == 1);
}




EmbedCase.problem = () => {
    return (MainEvent.step == MainEvent.Step.PROBLEM)
}

EmbedCase.problem_1 = () => {
    return (MainEvent.step == MainEvent.Step.PROBLEM && MainEvent.pageIdx == 0);
}

EmbedCase.problem_2 = () => {
    return (MainEvent.step == MainEvent.Step.PROBLEM && MainEvent.pageIdx == 1);
}

EmbedCase.problem_3 = () => {
    return (MainEvent.step == MainEvent.Step.PROBLEM && MainEvent.pageIdx == 2);
}

EmbedCase.problem_4 = () => {
    return (MainEvent.step == MainEvent.Step.PROBLEM && MainEvent.pageIdx == 3);
}