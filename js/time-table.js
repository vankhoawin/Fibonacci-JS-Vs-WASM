var timeTableButton = document.getElementById('time-table-button');
var timeTableInput = document.getElementById('time-table-input');
var timeTable = document.getElementById('time-table');


function createTermsArray(termsInput) {
    var termsToTest = [];

    for (var i = 1; i <= +termsInput; ++i) {
        termsToTest.push(Math.pow(10, i))
    }

    return termsToTest;
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
        '    <th width="200">JavaScript</th>' +
        '    <th width="200">WebAssembly</th>' +
        '</tr>'
    );
    var resultsHTML = results
        .map(function (result) {
            return (
                '<tr>' +
                '    <td width="200">' + result.term + '</td>' +
                '    <td width="200">' + result.js   + '</td>' +
                '    <td width="200">' + result.wasm + '</td>' +
                '</tr>'
            );
        })
        .reduce(function (acc, prev) {
            return acc + prev;
        }, '');

    timeTable.innerHTML = (tableHeader + resultsHTML);
}

timeTableButton.addEventListener('click', function () {
    var termsToTest = createTermsArray(timeTableInput.value)
    var results = testTermsArray(termsToTest);

    createTimeTable(results);
});
