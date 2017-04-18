#include <emscripten/emscripten.h>

unsigned long int EMSCRIPTEN_KEEPALIVE findNthFibonacciTerm(unsigned long int term) {
    if (term < 2) {
        return term;
    }

    return findNthFibonacciTerm(term - 1) + findNthFibonacciTerm(term - 2);
}
