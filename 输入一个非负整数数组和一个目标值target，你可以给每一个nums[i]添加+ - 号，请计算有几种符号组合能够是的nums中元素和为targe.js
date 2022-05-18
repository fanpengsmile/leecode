//输入一个非负整数数组和一个目标值target，你可以给每一个nums[i]添加+ - 号，请计算有几种符号组合能够是的nums中元素和为target、
//回溯算法

let result = 0;
function findTargetNums(nums, target) {
    if (nums.length === 0) {
        return 0;
    }
    backTrack(nums, 0 , target)
}

function backTrack(nums, i, target) {
    if (i === nums.length && target === 0) {
        result += 1;
    }

    //添加-号
    target += nums[i];
    backTrack(nums, i + 1, target);
    target -= nums[i];

    //添加+号
    target -= nums[i];
    ackTrack(nums, i + 1, target);
    target += nums[i];
}

//动态规划
function findTargetNums1(nums, target) {
    let sums = 0
    for (let i = 0; i < nums.length; i ++) {
        sums+=nums[i];
    }
    target = (sums + target) / 2;
    let dp = [], n = nums.length;
    for (let i = 0; i <= n; i ++) {
        dp[i] = [];
        for (let j = 0; j <= target; j ++) {
            if (i === 0) {
                dp[i][j] = 0;
            }
            if (j === 0) {
                dp[i][j] = 1;
            }
        }
    }
    for (let i = 1; i <= n; i ++) {
        for (let j = 1; j <= target; j ++) {
            if (j - nums[i - 1] < 0) {
                dp[i][j] = dp[i-1][j];
            } else {
                dp[i][j] = dp[i-1][j] + dp[i-1][j-nums[i-1]]
            }
        }
    }
    return dp[n][target];
}