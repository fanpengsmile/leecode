//输入一个数组，返回一个等长的数组，对应索引存储着下一个更大的元素，如果没有-1
//【2，1，2，4，3】 ==》 【4，2，4，-1，-1】
function nextGreaterElement(nums) {
    let outPut = [], s= [];
    for (let i = nums.length - 1; i >= 0; i --) {
        while(s.length !== 0 && s[s.length - 1] <= nums[i]) {
            s.pop(0);
        }
        outPut[i] = s.length === 0 ? -1 : s[s.length - 1];
        s.push(nums[i]);
    }
    return outPut;
}