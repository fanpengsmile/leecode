//线性排列问题
//有一个数组，从0开始，你可以随意去一个值，但是相邻的值不能同时取用，使得取到的值和最大

function maxSums(nums) {
    return dp(0, 0, nums);
}

function dp(amount, start, nums) {
    if (start >= nums.length) {
        return 0;
    }
    let res = Math.max(
        dp(amount, start + 1, nums),
        dp(amount + nums[start], start + 2, nums)
    );
    return res;
}