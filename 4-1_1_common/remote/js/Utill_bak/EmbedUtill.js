export function ShowEmbed(idx = -1) {
    let embedList = document.querySelectorAll(".embed")

    embedList.forEach((element, index) => {
        element.style.display = index == idx ? "block" : "none"
    })

    
    window.dispatchEvent(new Event('resize'));
}