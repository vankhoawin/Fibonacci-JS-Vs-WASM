var timeTableIncrement = document.getElementById('time-table-increment');
var timeTableMultiplier = document.getElementById('time-table-multiplier');
var timeTableRuns = document.getElementById('time-table-runs');
var timeTableButton = document.getElementById('time-table-button');
var timeTable = document.getElementById('time-table');


function createTermsArray(terms, multiplier) {
    var termsToTest = [];

    for (var i = 1; i <= terms; ++i) {
        termsToTest.push(i * multiplier);
    }

    return termsToTest;
}

function testTermsArray(terms) {
    return terms.reduce(function (acc, term) {
        acc.push({
            term: term,
            wasm: testAndExecute(term, findNthFibonacciTermWASM).time,
            js: testAndExecute(term, findNthFibonacciTermJS).time
        });
        return acc;
    }, []);
}

function runTimeTableTests(increments, multiplier, runs) {
    var termsToTest = createTermsArray(increments, multiplier);
    var runResults = [];
    var testResults = [];

    for (var i = 0; i < runs; ++i) {
        var runResult = testTermsArray(termsToTest);

        runResults.push(runResult);
    }

    for (var i = 0; i < increments; ++i) {
        var wasmRunResult = 0;
        var jsRunResult = 0;

        for (var j = 0; j < runs; ++j) {
            wasmRunResult += runResults[j][i].wasm;
            jsRunResult += runResults[j][i].js;
        }

        testResults.push({
            term: termsToTest[i],
            wasm: wasmRunResult / runs,
            js: jsRunResult / runs
        });
    }

    return testResults;
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
    var results = runTimeTableTests(
        timeTableIncrement.value,
        timeTableMultiplier.value,
        timeTableRuns.value
    );

    createTimeTable(results);
});
