/**
 * (基本思想遵循空间碰撞，判断数组之间的关系，根据不同的碰撞情况进行计算)
 * 1.为了保证存取的数组能快速读取，我们存放数组的rangeList需要是有序的，这里按照升序进行存储， 例如 [[3,9], [11,14], [16, 19]]
 * 2.思路分析：
 *      待操作得数组（传入的数组）和已有的二维数组rangeList会有四种情况：
 *      1.传入的数组[x,y],x和y这两个值不属于已有数组的范畴
 *          例如： rangeList为[[3,9], [16, 19]], 加入的item: [11,14]或者[2,22]
 *          add时需要将item加入到例：rangeList，并且按照递增的顺序， [[3,9], [11,14], [16, 19]]
 *          remove时需要将item删除：[11,14]不用操作， [2,22]则需要删除所有的数组
 *      2.传入的数组[x,y],x和y这两个值都属于已有数组的范畴
 *          例如： rangeList: [[3,9],[11,14], [16, 19]], 待操作的item: [8,17]
 *          add时需要将 [3,9], [11,14], [16, 19] 合并成 [3, 19]
 *          remove时需要将 [3,9], [11,14], [16, 19] 合并成 [3, 8], [17, 19]
 *      3.传入的数组[x,y],x属于已有数组的范畴，y不属于
 *          例如： rangeList: [[3,9],[11,14], [16, 19]], 加入的item: [8,15]
 *          add时需要将 [3,9], [11,14], [16, 19] 合并成 [3,15], [16, 19]
 *          remove时需要将 [3,9], [11,14], [16, 19] 合并成 [3, 8], [16, 19]
 *      4.传入的数组[x,y],y属于已有数组的范畴，x不属于
 *          例如： rangeList: [[3,9],[11,14], [16, 19]], 加入的item: [10,17]
 *          add时需要将 [3,9], [11,14], [16, 19] 合并成 [3,15], [10, 19]
 *          remove时需要将 [3,9], [11,14], [16, 19] 合并成 [3,9], [17, 19]
 * 根据四种不同的状态进行rangeList的删除，增加合并操作即可。
 */

 class RangeList {
    rangeList = [];
    validItem(item) {
        if (!Array.isArray(item)) {
            throw new Error('item should be Array!');
        } else {
            if (arguments.length !== 1) {
                throw new Error('The parameter can be only one !');
            }
            if (item.length !== 2 || typeof item[0] !== 'number' || typeof item[1] !== 'number' || item[0] > item[1]) {
                throw new Error('Array item should be Number, and it has length 2, item[0] <= item[1] !');
            } else {
                return true;
            }
        }
    }
    // 计算添加/删除的item处于rangeList的位置
    calcItemIndex(first, second) {
        let firstIndex = -1, secondIndex = -1;
        for (let i = 0; i < this.rangeList.length; i ++) {
            const rangeItem = this.rangeList[i];
            if (first >= rangeItem[0] && first <= rangeItem[1] && second <= rangeItem[1] && second >= rangeItem[0]) {
                return [i, i];
            }
            if (first >= rangeItem[0] && first <= rangeItem[1]) {
                firstIndex = i;
            }
            if (second <= rangeItem[1] && second >= rangeItem[0]) {
                secondIndex = i;
            }
        }
        return [firstIndex, secondIndex];
    }
    // 计算当前值处于rangeList的位置index
    findCurrentIndex(currentItem) {
        let currentIndex = this.rangeList.length;
        for (let i = 0; i < this.rangeList.length; i++) {
            const rangeItem = this.rangeList[i];
            if (currentItem < rangeItem[0]) {
                currentIndex = i;
                return currentIndex;
            }
        }
        return currentIndex;
    }
    add(item) {
        this.validItem(item);
        if (this.rangeList.length === 0) {
            this.rangeList.push(item);
        } else {
            const itemFirst = item[0], itemSecond = item[1];
            const [firstIndex, secondIndex] = this.calcItemIndex(itemFirst, itemSecond);
            // 因为是左闭右开区间，所以像[10,10]这种就可以不用操作
            if (itemFirst === itemSecond) {
                return;
            }
            // firstIndex === -1 && secondIndex === -1时，加入的item完全与已有的数组区分
            // 例：rangeList: [[3,9], [16, 19]], 加入的item: [11,14]或者[2,22]
            // 这时需要将item加入到例：rangeList，并且按照递增的顺序， [[3,9], [11,14], [16, 19]]
            if (firstIndex === -1 && secondIndex === -1) {
                const scurrentIndex = this.findCurrentIndex(itemSecond);
                const fcurrentIndex = this.findCurrentIndex(itemFirst);
                this.rangeList = this.rangeList.slice(0, fcurrentIndex).concat([item]).concat(this.rangeList.slice(scurrentIndex, this.rangeList.length));
            }
            // firstIndex === -1 && secondIndex > -1时，加入的item部分已有的子数组包含
            // 例：rangeList: [[3,9],[11,14], [16, 19]], 加入的item: [10,18]
            // 需要将 [11,14], [16, 19] 合并成 [10, 19]
            if (firstIndex === -1 && secondIndex > -1) {
                const currentIndex = this.findCurrentIndex(itemFirst);
                const newItem = [itemFirst, this.rangeList[secondIndex][1]];
                this.rangeList = this.rangeList.slice(0, currentIndex).concat([newItem]).concat(this.rangeList.slice(secondIndex + 1, this.rangeList.length));
            }
            // firstIndex > -1 && secondIndex === -1时，加入的item部分已有的子数组包含
            // 例：rangeList: [[3,9],[11,14], [16, 19]], 加入的item: [8,15]
            // 需要将 [3,9], [11,14], [16, 19] 合并成 [3, 15], [16, 19]
            if (firstIndex > -1 && secondIndex === -1) {
                const currentIndex = this.findCurrentIndex(itemSecond);
                const newItem = [this.rangeList[firstIndex][0], itemSecond];
                this.rangeList = this.rangeList.slice(0, firstIndex).concat([newItem]).concat(this.rangeList.slice(currentIndex, this.rangeList.length));
            }
            // firstIndex >-1 && firstIndex!==secondIndex时，加入的item包含已有的子数组
            // 例：rangeList: [[3,9],[11,14], [16, 19]], 加入的item: [12,18]
            // 需要将 [11,14], [16, 19] 合并成 [11, 19]
            if (firstIndex >-1 && secondIndex> -1 ) {
                const newItem = [this.rangeList[firstIndex][0], this.rangeList[secondIndex][1]];
                this.rangeList = this.rangeList.slice(0, firstIndex).concat([newItem]).concat(this.rangeList.slice(secondIndex + 1, this.rangeList.length));
            }
        }
        this.print();
    }
    remove(item) {
        this.validItem(item);
        if (this.rangeList.length === 0) {
            return;
        } else {
            const itemFirst = item[0], itemSecond = item[1];
            const [firstIndex, secondIndex] = this.calcItemIndex(itemFirst, itemSecond);
            // 因为是左闭右开区间，所以像[10,10]这种就可以不用操作
            if (itemFirst === itemSecond) {
                return;
            }
            // firstIndex === -1 &&secondIndex === -1时，删除的item完全与已有的数组区分
            // 例：rangeList: [[3,9], [16, 19]], 删除的item: [11,14]或者[2,22]
            // 这时需要将item删除：rangeList，[11,14]不用操作， [2,22]则需要删除所有的数组
            if (firstIndex === -1 &&secondIndex === -1) {
                const scurrentIndex = this.findCurrentIndex(itemSecond);
                const fcurrentIndex = this.findCurrentIndex(itemFirst);
                this.rangeList = this.rangeList.slice(0, fcurrentIndex).concat(this.rangeList.slice(scurrentIndex, this.rangeList.length));
            }
            // firstIndex === -1 && secondIndex > -1时，删除的item部分已有的子数组包含
            // 例：rangeList: [[3,9],[11,14], [16, 19]], 删除的item: [10,18]
            // 结果为[[3,9],[18, 19]]
            if (firstIndex === -1 && secondIndex > -1) {
                const currentIndex = this.findCurrentIndex(itemFirst);
                const newItem = [itemSecond, this.rangeList[secondIndex][1]];
                this.rangeList = this.rangeList.slice(0, currentIndex).concat([newItem]).concat(this.rangeList.slice(secondIndex + 1, this.rangeList.length));
            }
            // firstIndex > -1 && secondIndex === -1时，删除的item部分已有的子数组包含
            // 例：rangeList: [[3,9],[11,14], [16, 19]], 删除的item: [8,15]
            // 需要将 [3,9], [11,14], [16, 19] 合并成 [3, 8], [16, 19]
            if (firstIndex > -1 && secondIndex === -1) {
                const currentIndex = this.findCurrentIndex(itemSecond);
                const newItem = [this.rangeList[firstIndex][0], itemFirst];
                this.rangeList = this.rangeList.slice(0, firstIndex).concat([newItem]).concat(this.rangeList.slice(currentIndex, this.rangeList.length));
            }
            // firstIndex >-1 && secondIndex > -1时，删除的item包含已有的子数组
            // 例：rangeList: [[3,9],[11,14], [16, 19]], 删除的item: [12,18]
            // 需要将 [11,14], [16, 19] 变成 [11,12], [18,19]
            if (firstIndex >-1 && secondIndex > -1) {
                this.rangeList = this.rangeList.slice(0, firstIndex).concat([[this.rangeList[firstIndex][0], itemFirst]])
                .concat([[itemSecond, this.rangeList[secondIndex][1]]]).concat(this.rangeList.slice(secondIndex + 1, this.rangeList.length));
            }
        }
        this.print();
    }
    print() {
        let output = '';
        for (let i = 0; i < this.rangeList.length; i ++) {
            const item = this.rangeList[i];
            output = output + ` [${item[0]}, ${item[1]})`;
        }
        console.log(output);
    }
}