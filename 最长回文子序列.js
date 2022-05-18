//字符串中最长回文子序列  asfgjsa ==> asa

function longChildHuiwen(str) {
    let revertStr = '';
    for (let i = str.length - 1; i >= 0; i--) {
        revertStr = revertStr + str[i];
    }
    let dp = [], len = str.length;
    for (let i = 0; i <= len; i++) {
        dp[i] = [];
        for (let j = 0; j <= len; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 0;
            }
        }
    }
    for (let i = 1; i <= len; i++) {
        for (let j = 1; j <= len; j++) {
            if (str[i] === revertStr[j]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(
                    dp[i - 1][j],
                    dp[i][j - 1],
                    dp[i - 1][j - 1]
                );
            }
        }
    }
    return dp[len][len];
}
