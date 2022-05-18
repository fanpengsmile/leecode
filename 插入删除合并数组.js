/**
 * 解题思路：
 * 1.首先我需要一个变量来存储我们要操作的数组Array<Array<number>>,所以我定义了变量rangeList
 * 2.之后我们需要对输入的变量进行校验，防止出错，所以我定义了方法 function validItem
 * 3.思路分析：
 *   第一步，让rangelist中所有的数组，从打到小的顺序排列（按照所有数组的第一个数字排序），方便之后进行遍历
 *   已有数组： [[x1,x2], [y1,y2], [z1,z2]]
 *   3.1--------------------------
 *   使用add方法操作时： 插入数组[k1,k2],这时，k1有两种情况，包含在[x1,x2], [y1,y2], [z1,z2]区间之间，或者不在已有数组区间之内，
 *   同理k2也有两种情况，和k1一样，所有最后的情况是有2*2 = 4种，即：
 *      （1）k1k2都在区间之内，这时如果插入，就可以将k1k2所在的两个区间直接首位合并成一个大区间，并将两个区间之内的数组删除
 *      （2）k1k2都在区间之外，这时如果插入，就可以将[k1,k2]直接插入，并将[k1,k2]区间之内的数组删除
 *      （3）k1在区间之内，k2在区间之外，这时如果插入，就可以将k1所在区间的数组的第0项作为新数组的第0项，
 *          将k2作为新数组的第1项，然后插入到新数组，并将[ranglist[k1index][0],k2]区间之内的数组删除
 *      （4）k1在区间之外，k2在区间之内，这时如果插入，这时如果插入，就可以将k2所在区间的数组的第0项作为新数组的第1项，
 *          将k1作为新数组的第0项，然后插入到新数组，并将[k1, ranglist[k2index][1]]区间之内的数组删除
 *   这样就做完了add的操作，具体思路如下 function add
 *   3.2--------------------------
 *   使用remove方法操作时，思路和add方法类似： 删除数组[k1,k2],这时，k1有两种情况，包含在[x1,x2], [y1,y2], [z1,z2]区间之间，或者不在已有数组区间之内，
 *   同理k2也有两种情况，和k1一样，所有最后的情况是有2*2 = 4种，即：
 *      （1）k1k2都在区间之内，这时如果删除，需要将k1所在数组变为[rangelist[k1index][0],k1],
 *          需要将k2所在数组变为[k2, rangelist[k2index][1]],并将两个区间之内的数组删除
 *      （2）k1k2都在区间之外，这时如果删除，就可以将k1index和k2index之间的数组删除即可
 *      （3）k1在区间之内，k2在区间之外，这时如果删除，需要将k1所在数组变为[rangelist[k1index][0],k1],
 *          将k1index和k2index之间的数组删除即可
 *      （4）k1在区间之外，k2在区间之内，这时如果删除，需要将k2所在数组变为[k2, rangelist[k2index][1]]，
 *          将k1index和k2index之间的数组删除即可
 *   这样就做完了remove的操作，具体思路如下 function remove
 *   3.3--------------------------
 *   print 方法直接遍历打印即可
 * 
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
    calcItemRangeIndex(item) {
        let firstItem = item[0], secondItem = item[1];
        let firstContainIndex = -1, secondContainIndex = -1;
        let firstinRange = false, firstOutRange = false,
            secondInRange = false;
        // 判断插入数组的第一项和第二项 分别在哪里（是否在区间内，或区间外，对应题解的4中情况，并拿到相对应的 index）
        for (let i = 0; i < this.rangeList.length; i++) {
            // 插入数组的第0项在区间内
            if ((firstItem >= this.rangeList[i][0] && firstItem <= this.rangeList[i][1])) {
                firstContainIndex = i;
                firstinRange = true;
            }
            // 插入数组的第0项在区间外
            if ((firstItem < this.rangeList[i][0])) {
                if (firstOutRange === false && firstinRange === false) {
                    firstContainIndex = i;
                    firstOutRange = true;
                }
            }
            // 插入数组的第1项在区间内
            if ((secondItem >= this.rangeList[i][0] && secondItem <= this.rangeList[i][1])) {
                secondContainIndex = i;
                secondInRange = true;
            }
            // 插入数组的第1项在区间外
            if ((secondItem > this.rangeList[i][1])) {
                secondContainIndex = i;
                secondInRange = false;
            }
        }
        return {
            firstContainIndex, secondContainIndex,
            firstinRange, firstOutRange,
            secondInRange
        }
    }
    add(addItem) {
        // 校验输入数据
        if (this.validItem(addItem)) {
            // 获取输入数据的额第一项和第二项
            let firstItem = addItem[0], secondItem = addItem[1];
            // r如果rangelist为空，直接插入即可
            if (this.rangeList.length === 0) {
                this.rangeList.push(addItem);
            } else {
                let {
                    firstContainIndex, secondContainIndex,
                    firstinRange, firstOutRange,
                    secondInRange
                } = this.calcItemRangeIndex(addItem);
                let newItem;
                // 根据不同的情况，构建新的插入数组（对应题解add4种情况时，构建新的插入数组）
                // k1k2都在区间之内，这时如果插入，就可以将k1k2所在的两个区间直接首位合并成一个大区间
                if (firstinRange && secondInRange) {
                    newItem = [this.rangeList[firstContainIndex][0], this.rangeList[secondContainIndex][1]];
                } else if (firstinRange && !secondInRange) {
                    // k1在区间之内，k2在区间之外，这时如果插入，就可以将k1所在区间的数组的第0项作为新数组的第0项，
                    // 将k2作为新数组的第1项，然后插入到新数组，并将[ranglist[k1index][0],k2]
                    newItem = [this.rangeList[firstContainIndex][0], secondItem];
                } else if (!firstinRange && secondInRange) {
                    // k1在区间之外，k2在区间之内，这时如果插入，这时如果插入，就可以将k2所在区间的数组的第0项作为新数组的第1项，
                    // 将k1作为新数组的第0项，然后插入到新数组，并将[k1, ranglist[k2index][1]]
                    newItem = [firstItem, this.rangeList[secondContainIndex][1]];
                } else {
                    // k1k2都在区间之外，这时如果插入，就可以将[k1,k2]直接插入
                    newItem = [firstItem, secondItem];
                }
                // 根据不同情况，删除区间范围内包含的数组，即完成了合并
                if (firstContainIndex >= 0 && secondContainIndex >= 0) {
                    let res = [];
                    for (let i = 0; i < this.rangeList.length; i++) {
                        if (i < firstContainIndex) {
                            res.push(this.rangeList[i]);
                        }
                    }
                    res.push(newItem);
                    for (let i = secondContainIndex + 1; i < this.rangeList.length; i++) {
                        res.push(this.rangeList[i]);
                    }
                    this.rangeList = res;
                } else if (firstContainIndex === -1 && secondContainIndex >= 0) {
                    // 插入的数据不能合并，并且首项很大，为了保持顺序，直接放在最后
                    this.rangeList.push(addItem);
                } else if (firstContainIndex >= 0 && secondContainIndex === -1) {
                    // 插入的数据不能合并，并且首项很小，为了保持顺序，直接放在最前面
                    this.rangeList.unshift(addItem);
                }
            }
        }
    }
    remove(removeItem) {
        // 校验输入数据
        if (this.validItem(removeItem)) {
            // 获取输入数据的额第一项和第二项
            let firstItem = removeItem[0], secondItem = removeItem[1];
            // 如果插入数组两项相同，相当于不包含数字，直接返回，不作操作
            if (firstItem === secondItem) {
                return;
            }
            if (this.rangeList.length > 0) {
                let {
                    firstContainIndex, secondContainIndex,
                    firstinRange, firstOutRange,
                    secondInRange
                } = this.calcItemRangeIndex(removeItem);
                // k1k2都在区间之内，这时如果删除，需要将k1所在数组变为[rangelist[k1index][0],k1],
                // 需要将k2所在数组变为[k2, rangelist[k2index][1]]
                if (firstContainIndex >= 0 && secondContainIndex >= 0) {
                    if (firstinRange && secondInRange) {
                        const arrItem = [...this.rangeList];
                        let firstItemSame = true;
                        // 如果在同一个数组区间内
                        if (firstContainIndex === secondContainIndex) {
                            // 插入的数组第一项刚好和所在数组第一项相同的情况时不做操作
                            if (this.rangeList[firstContainIndex][0] !== firstItem) {
                                firstItemSame = false;
                                this.rangeList[firstContainIndex] = [arrItem[firstContainIndex][0], firstItem];
                            }
                            // 插入的数组第二项刚好和所在数组第二项相同的情况时不做操作
                            if (secondItem !== this.rangeList[secondContainIndex][1]) {
                                let res = [];
                                // 将新数组插入（因为在同一个数组内，所以数组会被差分成两个区间）
                                for (let i = 0; i < this.rangeList.length; i++) {
                                    res.push(this.rangeList[i]);
                                    if (i === secondContainIndex) {
                                        if (firstItemSame) {
                                            res.pop();
                                        }
                                        res.push([secondItem, arrItem[secondContainIndex][1]]);
                                    }
                                }
                                this.rangeList = res;
                            }
                            // 不在同一区间内
                        } else {
                            // 插入的数组第一项刚好和所在数组第一项相同的情况时不做操作
                            if (this.rangeList[firstContainIndex][0] !== firstItem) {
                                this.rangeList[firstContainIndex] = [arrItem[firstContainIndex][0], firstItem];
                            }
                            // 插入的数组第二项刚好和所在数组第二项相同的情况时不做操作
                            if (secondItem !== this.rangeList[secondContainIndex][1]) {
                                this.rangeList[secondContainIndex] = [secondItem, arrItem[secondContainIndex][1]];
                            }
                            let res = [];
                            // 将k1index k2index之间的数组删除
                            for (let i = 0; i < this.rangeList.length; i++) {
                                if (i > firstContainIndex && i < secondContainIndex) {
                                    continue;
                                }
                                res.push(this.rangeList[i]);
                            }
                            this.rangeList = res;
                        }
                        // k1在区间之外，k2在区间之内，这时如果删除，需要将k2所在数组变为[k2, rangelist[k2index][1]]
                    } else if (!firstinRange && secondInRange) {
                        this.rangeList[secondContainIndex] = [secondItem, this.rangeList[secondContainIndex][1]];
                        for (let i = this.rangeList.length - 1; i >= 0; i--) {
                            if (i >= firstContainIndex && i < secondContainIndex) {
                                this.rangeList.splice(i, 1);
                            }
                        }
                        // k1在区间之内，k2在区间之外，这时如果删除，需要将k1所在数组变为[rangelist[k1index][0],k1],
                    } else if (firstinRange && !secondInRange) {
                        this.rangeList[firstContainIndex] = [this.rangeList[firstContainIndex][0], firstItem];
                        for (let i = this.rangeList.length - 1; i >= 0; i--) {
                            if (i > firstContainIndex && i <= secondContainIndex) {
                                this.rangeList.splice(i, 1);
                            }
                        }
                        //k1k2都在区间之外，这时如果删除，就可以将k1index和k2index之间的数组删除即可
                    } else {
                        for (let i = this.rangeList.length - 1; i >= 0; i--) {
                            if (i >= firstContainIndex && i <= secondContainIndex) {
                                this.rangeList.splice(i, 1);
                            }
                        }
                    }
                    // 特殊情况 例如[[7,12]] 删除 [22,34]的情况，不作处理
                } else if (firstContainIndex === -1 && secondContainIndex >= 0) {
                    return;
                    // 特殊情况例如 [[7,12]] 删除 [2,4]的情况，不作处理
                } else if (firstContainIndex >= 0 && secondContainIndex === -1) {
                    return;
                }
            }
        }
    }
    print() {
        this.rangeList.forEach(item => {
            console.log(item);
        })
    }
}