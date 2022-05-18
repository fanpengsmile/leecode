//接雨水问题
function maxRain(arr) {
    let left = 0, right = arr.length - 1, leftMax = arr[left], rightMax = arr[right];
    let rainSum = 0;
    while(left < right) {
        if (leftMax < rightMax) {
            left ++;
            if (arr[left] > leftMax) {
                leftMax = arr[left];
            } else {
                rainSum += leftMax - arr[left];
            }
        } else {
            right --;
            if (arr[right]>rightMax) {
                rightMax = arr[right];
            } else {
                rainSum += rightMax - arr[right];
            }
        }
    }
    return rainSum;
}