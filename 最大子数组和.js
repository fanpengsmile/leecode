function maxSubArr(nums) {
    let dp = [];
    dp[0] = nums[0];
    for (let i = 1; i < nums.length; i ++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    }
    let res = -Number.MAX_VALUE;
    for (let i = 0; i < dp.length; i ++) {
        res= Math.max(res, dp[i]);
    }
    return res;
}