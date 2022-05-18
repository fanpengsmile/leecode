//树形  线性排列

//         4
//       /   \
//      3     7
//     / \   / \
//    5   4 6   4
//不取相连接的连个节点，取得和最大    上图为  5 4 6
function maxSum(root) {
    if (!root) {
        return 0;
    }
    let doIt = root.value + 
        (root.left ? maxSum(root.left.left) + maxSum(root.left.right) : 0) +
        (root.right ? maxSum(root.right.left) + maxSum(root.right.right) : 0);
    let notDoIt = maxSum(root.left) + maxSum(root.right);

    return Math.max(doIt, notDoIt);
}