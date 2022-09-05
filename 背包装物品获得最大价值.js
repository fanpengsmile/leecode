//背包装物品获得最大jiazhi
function maxPackageValue(wight, len, nums, values) {
    let dp = [];
    for (let i = 0; i < len; i ++) {
        dp[i] = [];
        for (let j = 0; j <= wight; j ++) {
            if (j === 0) {
                dp[i][j] = 0;
            }
        }
    }
    for (let i = 0; i < nums.length; i ++) {
        for (let w = 1; w <= wight; w ++) {
            if (w - nums[i] < 0) {
                dp[i][w] = dp[i -1][w];
            } else {
                dp[i][w] = Math.max(
                    dp[i - 1][w - nums[i]] + values[i],
                    dp[i -1][w]
                );
            }
        }
    }
    return dp[len][wight];
}

console.log(11)