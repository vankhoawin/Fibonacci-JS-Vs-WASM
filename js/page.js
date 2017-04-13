var wasmButton = document.getElementById('wasm-button');
var jsButton = document.getElementById('js-button');
var termInput = document.getElementById('term-input');
var resultsTerm = document.getElementById('results-term');
var resultsNumber = document.getElementById('results-number');
var resultsName = document.getElementById('results-name');
var resultsTime = document.getElementById('results-time');
var timeTableButton = document.getElementById('time-table-button');
var timeTable = document.getElementById('time-table');

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

function testTermsArray(terms) {
    var findNthFibonacciTermWASM = createWASMFibonacciFunction();

    return terms.reduce(function (acc, term) {
        acc.push({
            term: term,
            wasm: testAndExecute(term, findNthFibonacciTermWASM).time,
            js: testAndExecute(term, findNthFibonacciTermJS).time
        });
        return acc;
    }, []);
}

function createTimeTable(results) {
    var tableHeader = (
        '<tr>' +
        '    <th width="200">Term</th>' +
        '    <th width="200">WebAssembly</th>' +
        '    <th width="200">JavaScript</th>' +
        '</tr>'
    );
    var resultsHTML = results
        .map(function (result) {
            return (
                '<tr>' +
                '    <td width="200">' + result.term + '</td>' +
                '    <td width="200">' + result.wasm + '</td>' +
                '    <td width="200">' + result.js   + '</td>' +
                '</tr>'
            );
        })
        .reduce(function (acc, prev) {
            return acc + prev;
        }, '');

    timeTable.innerHTML = (tableHeader + resultsHTML);
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

timeTableButton.addEventListener('click', function () {
    var termsToTest = [
        1,
        100,
        10000,
        1000000,
        100000000
    ]

    var results = testTermsArray(termsToTest);
    createTimeTable(results);
});
