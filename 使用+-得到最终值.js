let result = 0;

function findNum(nums, target, index, isMerge, preNum, arr) {
    if (nums.length === index && result === target) {
        let res = arr.map(item => {
            if (item < 0) {
                return -item; 
            }
            return item;
        });
        if (res.join('') === '12345678910') {
            console.log(arr)
        }

        return;
    }
    for (let i = index; i < nums.length; i ++) {
        let item = nums[i];
        if (isMerge) {
            item = Number(preNum + '' + nums[i]);
        }
        result = result + item;
        arr.push(item);
        findNum(nums, target, i + 1, false, preNum, arr);
        arr.pop();
        result = result - item;

        arr.push(-item);
        result = result - item;
        findNum(nums, target, i + 1, false, preNum, arr);
        arr.pop();
        result = result + item;

        findNum(nums, target, i + 1, true, item, arr);
    }
}