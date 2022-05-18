//两个字符串通过删除，替换和增加变成相同的字符串需要最少的改动次数
function minDistance(str1, str2) {
    let dp = [], m = str1.length, n = str2.length;
    for (let i = 0; i <= m; i ++) {
        dp[i] = [];
        for (let j = 0; j <= n; j ++) {
            if (i === 0 && j ===0 ) {
                dp[i][j] = 0;
            }
        }
    }
    for (let i = 1; i <= m; i ++) {
        for (let j = 1; j <= n; j ++) {
            if (str1[m] === str2[n]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = Math.min(
                    dp[i-1][j] + 1,
                    dp[i][j-1] + 1,
                    dp[i-1][j-1] + 1
                );
            }
        }
    }
    return dp[m][n]
}