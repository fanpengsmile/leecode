let output;

function backTrack(nums, res) {
    if (res.length === nums.length) {
        output.push(res);
    }
    for (let i = 0 ; i < nums.length; i ++) {
        if (res.contains(nums[i])){
            continue;
        }
        res.push(nums[i]);
        backTrack(nums, res);
        res.pop();
    }
}