function coinChange(coins, mount) {
    let dp =[];
    for (let i = 0; i <= mount; i ++) {
        dp[i] = mount;
    }
    dp[0] = 0;
    for (let i = 1; i <= mount; i ++) {
        for (let j = 0; i < coins.length; j ++) {
            if (dp[i] - coins[j] < 0) {
                continue;
            }
            dp[i] = Math.min(dp[i], 1 + dp[i - 1]);
        }
    }
    return dp[mount] === mount ? -1 : dp[mount];
}