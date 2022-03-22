/**
 * Found this problem to which, I could not find any simple solution. But thinking about the question found this very simple solution, hence sharing.

Problem Statement
Given a number and intervals, find all intervals having that number effectively. Imagine the method is being called thousands of times.
Example Input
Intervals -> [{1, 10}, {8, 12}, {3, 5}, {15,20}]
Queries -> [5, 10, 18]
For query 1 -> 5 lies inside {1, 10} and {3, 5}, hence answer to this query is 2.
Similarly for query 2 -> 10 lies inside {1, 10} and {8, 12}, hence answer to this query is 2.
And for query 3 -> 18 lies inside {15, 20} only, hence answer to this query is 1.

Existing Solution
Most of the time I was thinking about, how to count which of the interval contain the required number. Turns out this is quite computation heavy. We can use prefix-sum method which fails when the intervals are large. Using Interval tree is quite complex as well.
 */

function solution(v, queries) {
    let n = v.length,
        q = queries.length;
    const st = [],
        en = [];
    const res = [];
    for (let i = 0; i < n; ++i) {
        st.push(v[i][0]);
        en.push(v[i][1]);
    }
    st.sort((a, b) => a - b);
    en.sort((a, b) => a - b);

    for (let i = 0; i < q; ++i) {
        let cur = queries[i];
        let before = lowerBound(en, cur) - en[0]; // lower_bound(en.begin(), en.end(), cur) - en.begin();
        let after = st[st.length - 1] - upperBound(st, cur); //st.end() - upper_bound(st.begin(), st.end(), cur);
        let qres = n - before - after;
        res.push(qres);
    }
    return res;
}

let lowerBound = (A, T) => {
    let N = A.length,
        i = 0,
        j = N - 1;
    while (i < j) {
        let k = Math.floor((i + j) / 2);
        if (A[k] < T) i = k + 1;
        else j = k;
    }
    return A[i] == T ? i : -1;
};

let upperBound = (A, T) => {
    let N = A.length,
        i = 0,
        j = N - 1;
    while (i < j) {
        let k = Math.floor((i + j + 1) / 2);
        if (A[k] <= T) i = k;
        else j = k - 1;
    }
    return A[j] == T ? j + 1 : -1;
};

console.log(
    solution(
        [
            [0, 8],
            [3, 19],
            [4, 6],
        ],
        [1, 3, 5, 7, 9]
    )
);
