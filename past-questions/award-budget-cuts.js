function findGrantsCap(grantsArray, newBudget) {
    let l = 0,
        h = Number.MIN_VALUE;
    for (let x of grantsArray) {
        h = Math.max(h, x);
    }

    let mid;
    while (l <= h) {
        mid = (h + l) / 2;
        let sum = check(grantsArray, mid);
        if (sum == newBudget) break;
        if (sum > newBudget) h = mid;
        else l = mid;
    }

    return mid;
}

function check(a, mid) {
    let sum = 0;
    for (let x of a) sum += Math.min(x, mid);

    return sum;
}
