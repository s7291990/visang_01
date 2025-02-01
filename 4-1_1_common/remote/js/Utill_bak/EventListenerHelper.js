export function RemoveListener(target) {
    const cloneElement = target.cloneNode(true);
    target.parentNode.replaceChild(cloneElement, target);

    return cloneElement
}