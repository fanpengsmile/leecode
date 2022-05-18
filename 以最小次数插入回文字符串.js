//以最小次数插入回文字符串
function minInsertHuiwen(str) {
    let len = str.length;
    let dp = [];
    for (let i = 0; i < len; i ++) {
        dp[i] = [];
        for (let j = 0; j < len; j ++) {
            if (i===j) {
                dp[i][j] = 0
            }
        }
    }
    for (let i = len - 2; i >= 0; i --) {
        for (let j = i + 1; j < len; j ++) {
            if (str[i] === str[j]) {
                dp[i][j] = dp[i+1][j-1];
            } else {
                dp[i][j] = Math.min(
                    dp[i + 1][j],
                    dp[i][j - 1]
                ) + 1
            }
        }
    }
    return dp[0][len - 1];
}