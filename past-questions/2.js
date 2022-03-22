/**
 *  Provided with a method signature :
    float temperatureRecord(float temperature,Instant time)
    the ask is to return maximum temperature in last 24 hours, for every call of this method in a sliding window fashion.
    eg : if (x,y) represents the input parameters, for input : [(24,0),(14,8),(21,16),(20,25)] -> the o/p for each of these calls would be [ 24, 24, ,24, 21]
 */

/**
     * 
        My Approach:

        Use deque of arr size 2 where arr[0] = temp, arr[1] = timestamp;
        This deque will store the temperatures in decreasing order.
        Iterate the array. At i^th iteration,
        remove all the elements from the front of the deque where queue.peekFirst()[1] < arr[1] - 24.
        remove all the elements from back where queue.peekLast()[0] < arr[0];
        Add the current element.
        At any iteration the top of the queue will be the maximum temperature in that timeframe.
        Time complexity: O(N)
        Space complexity: O(N)
     */

function findMaxTemperature(arr) {
    let n = arr.length;
    const queue = [];
    const ans = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        while (queue.length && queue[0][1] < arr[i][1] - 24) {
            queue.shift();
        }
        while (queue.length && queue[queue.length - 1][0] < arr[i][0]) {
            queue.pop();
        }
        queue.push(arr[i]);
        ans[i] = queue[0][0];
    }
    return ans;
}

console.log(
    findMaxTemperature([
        [24, 0],
        [14, 8],
        [21, 16],
        [20, 25],
    ])
);

class Deque {
    constructor() {
        this.front = this.back = undefined;
    }
    addFront(value) {
        if (!this.front) this.front = this.back = { value };
        else this.front = this.front.next = { value, prev: this.front };
    }
    removeFront() {
        let value = this.peekFront();
        if (this.front === this.back) this.front = this.back = undefined;
        else (this.front = this.front.prev).next = undefined;
        return value;
    }
    peekFront() {
        return this.front && this.front.value;
    }
    addBack(value) {
        if (!this.front) this.front = this.back = { value };
        else this.back = this.back.prev = { value, next: this.back };
    }
    removeBack() {
        let value = this.peekBack();
        if (this.front === this.back) this.front = this.back = undefined;
        else (this.back = this.back.next).back = undefined;
        return value;
    }
    peekBack() {
        return this.back && this.back.value;
    }
}
