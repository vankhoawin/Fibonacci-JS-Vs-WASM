var wasmButton = document.getElementById('wasm-button');
var jsButton = document.getElementById('js-button');
var termInput = document.getElementById('term-input');
var resultsTerm = document.getElementById('results-term');
var resultsNumber = document.getElementById('results-number');
var resultsName = document.getElementById('results-name');
var resultsTime = document.getElementById('results-time');


function createWASMFibonacciFunction() {
    return Module.cwrap(
        'findNthFibonacciTerm', // WebAssembly function name
        'number',               // return type
        ['number']              // argument types
    );
}

function testAndExecute(term, fnToTest) {
    var time = performance.now();
    var result = fnToTest(term);
    time = performance.now() - time;

    return {
        time: time,
        result: result
    };
}

function startFibonacci(term, fnToTest, name) {
    var results = testAndExecute(term, fnToTest);

    resultsTerm.innerText = term;
    resultsNumber.innerText = results.result;
    resultsName.innerText = name;
    resultsTime.innerText = results.time;
}

wasmButton.addEventListener('click', function () {
    var findNthFibonacciTermWASM = createWASMFibonacciFunction();

    startFibonacci(
        termInput.value,
        findNthFibonacciTermWASM,
        'WebAssembly'
    );
});

jsButton.addEventListener('click', function () {
    startFibonacci(
        termInput.value,
        findNthFibonacciTermJS, 
        'JavaScript'
    );
});
