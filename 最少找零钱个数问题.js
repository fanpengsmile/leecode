function amount(coins, nums) {
    let dp = [];
    for (let i = 0; i < nums + 1; i ++) {
        dp[i] = nums + 1;
    }
    dp[0] = 0;
    for (let i = 0; i < nums + 1; i ++) {
        for (let j = 0; j < coins.length; j ++) {
            if (i - coins[j] < 0) {
                continue;
            }
            dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
        }
    }
    return dp[nums] === nums + 1 ? -1 : dp[nums];
}