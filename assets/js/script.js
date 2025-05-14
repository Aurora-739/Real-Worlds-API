const API_KEY = "w6jfYXB6czG1SaxoflCpyA1-5hc";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e)); // e is a reference to the event.

async function getStatus(e) { //waits fro promise to come true
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let modalHeading = "API Key Status";
    let contentModal = `<div>Your key is valid until</div>`;
    contentModal += `<div class="key-status">${data.expiry}</div>`; // makes it so that the expiry is the only thing that shows up in the console

    document.getElementById("resultsModalTitle").innerText = modalHeading;
    document.getElementById("results-content").innerHTML = contentModal;

    resultsModal.show(); // shows the alert modal that drops down.
}