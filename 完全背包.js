//给定不同面额的硬币coins和一个总金额amount，写一个函数计算可以凑出总金额的硬笔组合数。假设每一种面额的硬币有无限个。
function change(amount, coins) {
    let n = coins.length;
    let dp = [];
    for (let i = 0; i <= n; i ++) {
        dp[i] = [];
        for (let j = 0; j <= amount; j ++) {
            if (i === 0) {
                dp[i][j] = 0;
            } if (j === 0) {
                dp[i][j] = 1;
            }
        }
    }

    for (let i = 1; i <= n; i ++) {
        for (let j = 1; j <= amount; j ++) {
            if (j - coins[i - 1] > 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]]
            } else {
                dp[i][j] = dp[i -1][j]
            }
        }
    }
    return dp[n][amount];
}