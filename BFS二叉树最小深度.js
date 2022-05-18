function minDepth(node) {
    if (!node) {
        return 0;
    }
    let q = [];
    q.push(node);
    let depth = 1;
    while(q.length !== 0) {
        let size = q.length;
        for (let i = 0 ; i < size; i ++) {
            let newNode = q[0];
            if (!newNode.left && !newNode.right) {
                return depth;
            }
            if (newNode.right) {
                q.push(newNode.right);
            }
            if (newNode.left) {
                q.push(newNode.left);
            }
            q.shift();
        }
        depth++;
    }
    return depth;
}