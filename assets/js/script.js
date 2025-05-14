const API_KEY = "w6jfYXB6czG1SaxoflCpyA1-5hc";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));
// practice url: https://mattrudge.net/assets/js/menu.js

document.getElementById("status").addEventListener("click", e => getStatus(e)); // e is a reference to the event.
document.getElementById("submit").addEventListener("click", e => postForm(e));

function processOptions(form) {
    let optArray = [];

    for (let entry of form.entries()) {
        if (entry[0] === "options"){
            optArray.push(entry[1]);
        }
    };
    form.delete("options");

    form.append("options", optArray.join());
    return form;
};

async function postForm(e) {
    const form = processOptions(new FormData(document.getElementById("checksform")));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });

    const data = await response.json()

    if (response.ok) {
        displayErrors(data); //calls function (line 28)
    } else {
        throw new Error(data.error);
    }
};

function displayErrors(data) {
    let modalHeading = `JSHint Results for ${data.file}`;

    if (data.total_errors === 0) {
        results = `<div class="no_errors>No errors reported</div>`
    } else {
        results = `<div>Total Errors: <span class="error_counts">${data.total_errors}</span></div>`
        for (let error of data.error_list) { //content for error.
            results += `<div>At line <span class="line">${error.line}</span>,`;
            results += `column <span class="column">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }
    document.getElementById("resultsModalTitle").innerText = modalHeading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show(); // shows the alert modal that drops down.
}

async function getStatus(e) { //waits fro promise to come true
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
};

function displayStatus(data) {
    let modalHeading = "API Key Status";
    let contentModal = `<div>Your key is valid until</div>`;
    contentModal += `<div class="key-status">${data.expiry}</div>`; // makes it so that the expiry is the only thing that shows up in the console

    document.getElementById("resultsModalTitle").innerText = modalHeading;
    document.getElementById("results-content").innerHTML = contentModal;

    resultsModal.show(); // shows the alert modal that drops down.
}