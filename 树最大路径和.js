let min = Number.MIN_SAFE_INTEGER;

function oneSideMax(node) {
    if (!node) {
        return 0;
    }
    let left = Math.max(0, oneSideMax(node.left));
    let right = Math.max(0, oneSideMax(node.right));
    min = max(min, left + right + node.value);
    return Math.max(right, left) + node.value;
}