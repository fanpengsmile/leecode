//输入一棵以root为根节点的二叉树和该二叉树的两个节点p,q，计算着两个节点的最近公共祖先。
function lowestCommonAncestor(root, p, q) {
    if(root === null) {
        return null;
    }
    if (root === p || root === q) {
        return root;
    }

    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);

    if (left === null && right === null) {
        return null;
    }
    if (left !== null && right !== null) {
        return root;
    }
    return right === null ? left : right;
}