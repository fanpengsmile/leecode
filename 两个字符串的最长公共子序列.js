function longLCS(str1, str2) {
    let dp = [];
    for (let i = 0; i < str1.length; i ++) {
        dp[i] = [];
        for (let i = 0; i < str2.length; i ++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 0;
            }
        }
    }
    for (let i = 1; i < str1.length; i ++) {
        for (let j = 1; j < str2.length; j ++) {
            if (str1[i] === str2[j]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][ j-1], dp[i-1][j-1]);
            }
        }
    }
    return dp[str1.length][str2.length];
}