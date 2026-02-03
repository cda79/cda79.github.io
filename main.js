const form = document.getElementById("form");
const log = document.getElementById("log");

function logSubmit(event) {
  log.textContent = `Please allow up to 3 business days for a response.`;
  event.preventDefault();
}

form.addEventListener("submit", logSubmit);

function submissionAlert() {
  alert("The form was submitted. Thank you.");
}