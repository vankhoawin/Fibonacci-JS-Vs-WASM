#include <emscripten/emscripten.h>

unsigned long int EMSCRIPTEN_KEEPALIVE findNthFibonacciTerm(unsigned long int term) {
    unsigned long int first = 0;
    unsigned long int second = 1;
    unsigned long int next;
    unsigned long int i;

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
