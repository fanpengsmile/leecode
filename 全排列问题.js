let output = [];

function quanpailie(nums, pailie) {
    if (pailie.length === nums.length) {
        output.push([...pailie]);
        return;
    }
    for (let i = 0; i < nums.length; i ++) {
        if (pailie.indexOf(nums[i]) > -1) {
            continue;
        }
        pailie.push(nums[i]);
        quanpailie(nums, pailie);
        pailie.pop();
    }
}