//数组里面的值是否刚好可以被装进两个背包，并且两个背包和相等

function canPartition(nums) {
    let dp = [], len = nums.length;
    for (let i = 0; i <= len; i ++) {
        dp[i] = [];
    }
    for (let i = 0; i <= len; i ++) {
        dp[i][0] = true;
    }
    let sums = 0;
    nums.forEach(item => {
        sums+= item;
    });
    for (let i = 1; i <= len; i ++) {
        for (let j = 1; j < sums/2; j ++) {
            if (j - nums[i] < 0) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i-1]]
            }
        }
    }
    return dp[len][sums/2];
}