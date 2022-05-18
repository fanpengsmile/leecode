function longChildArr(nums) {
    let arr = nums.sort((a,b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        } else {
            return b[1] - a[1];
        }
    });
    let sigleArr = arr.map(item => {
        return item[1]
    });
    return lastChildArr(sigleArr);
}

//最长递增子序列
function lastChildArr(nums) {
    let dp = [];
    nums.forEach(item, index => {
        dp[index] = 1;
    });
    for (let i = 1; i < nums.length - 1; i ++) {
        for (let j = 0; j < i; j ++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    let res = 0;
    for (let i = 0; i < dp.length; i ++) {
        res = Math.max(res, dp[i]);
    }
    return res;
}