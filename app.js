// Hook up to your form elements (change IDs if your HTML uses different ones)
const teamAInput = document.getElementById('teamA'); // text input for team A
const teamBInput = document.getElementById('teamB'); // text input for team B
const findButton = document.getElementById('findBtn'); // button
const resultDiv = document.getElementById('result'); // where we'll show the answer

if (findButton) {
  findButton.addEventListener('click', (e) => {
    e.preventDefault();
    const teamA = teamAInput?.value || "";
    const teamB = teamBInput?.value || "";
    resultDiv.innerText = "Looking...";
    const fixture = findNextFixtureBetween(teamA, teamB);
    if (!fixture) {
      resultDiv.innerText = `No upcoming fixture found between "${teamA}" and "${teamB}".`;
      return;
    }
    // format date nicely
    const d = new Date(fixture.date);
    const dateStr = d.toLocaleString(); // shows local date/time
    resultDiv.innerHTML = `
      <strong>Next fixture:</strong><br>
      ${fixture.home} vs ${fixture.away}<br>
      Date/time: ${dateStr}<br>
      Venue: ${fixture.venue || "Unknown"}<br>
    `;
  });
}
// ---- connect the button to our fixture finder ----

// change these IDs if your HTML uses different ones
const teamAInput = document.getElementById("teamA");
const teamBInput = document.getElementById("teamB");
const findButton = document.getElementById("findBtn");
const resultDiv = document.getElementById("result");

if (findButton) {
  findButton.addEventListener("click", (event) => {
    event.preventDefault(); // stops the form from reloading the page

    const teamA = teamAInput.value.trim();
    const teamB = teamBInput.value.trim();

    resultDiv.innerText = "Looking...";

    const fixture = findNextFixtureBetween(teamA, teamB);

    if (!fixture) {
      resultDiv.innerText = `No upcoming fixture found between "${teamA}" and "${teamB}".`;
      return;
    }

    const date = new Date(fixture.date).toLocaleString();

    resultDiv.innerHTML = `
      <strong>Next fixture:</strong><br>
      ${fixture.home} vs ${fixture.away}<br>
      Date/time: ${date}<br>
      Venue: ${fixture.venue}
    `;
  });
}import { findNextFixtureBetween } from "./data-source.js"; // only if you're using modules
// if not using modules, just skip that line — the function is already global

// grab the form and result section
const form = document.getElementById("query-form");
const result = document.getElementById("result");

// when the form is submitted
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from refreshing

  const teamA = document.getElementById("teamA").value.trim();
  const teamB = document.getElementById("teamB").value.trim();

  // start with a little message
  result.classList.remove("hidden");
  result.textContent = "Looking...";

  // use your helper function
  const fixture = findNextFixtureBetween(teamA, teamB);

  // if not found
  if (!fixture) {
    result.textContent = `No upcoming fixture found between "${teamA}" and "${teamB}".`;
    return;
  }

  // format and show the result
  const date = new Date(fixture.date).toLocaleString();
  result.innerHTML = `
    <h2>Next Fixture</h2>
    <p><strong>${fixture.home}</strong> vs <strong>${fixture.away}</strong></p>
    <p>Date: ${date}</p>
    <p>Venue: ${fixture.venue}</p>
  `;
});


