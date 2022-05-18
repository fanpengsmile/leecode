//给定一个非负数组，每个nums[i]代表当前的钱数，你可以在去当前的钱数，但是相邻的两个不能被同时取出，计算最多能取多少？
//[2,1,7,9,3,1]  应该取2  9  1  = 12

function maxCount(nums) {
    let n = nums.length, dp = [];
    for (let i = 0; i <= n + 2; i ++) {
        dp[i] = 0;
    }

    for (let i = n - 1; i >= 0; i --) {
        dp[i] = Math.max(dp[i+1], nums[i] + dp[i+2]);
    }

    return dp[0];
}