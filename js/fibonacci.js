function findNthFibonacciTermJS(term) {
    if (term < 2) {
        return term;
    }

    return findNthFibonacciTermJS(term - 1) + findNthFibonacciTermJS(term - 2);
}
