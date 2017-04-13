function findNthFibonacciTermJS(term) {
    var first = 0;
    var second = 1;
    var next;
    var i;

    if (term == 0) {
        return first;
    }

    for (i = 2; i <= term; ++i) {
        next = first + second;
        first = second;
        second = next;
    }

    return second;
}
