// make sure the browser loads our fixture finder from data-source.js
import { findNextFixtureBetween } from "./data-source.js";

// grab the form and the result area from the HTML
const form = document.getElementById("query-form");
const result = document.getElementById("result");

// when someone submits the form (clicks "Find next match")
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from refreshing

  // get the team names from the inputs
  const teamA = document.getElementById("teamA").value.trim();
  const teamB = document.getElementById("teamB").value.trim();

  // show a little message while we look
  result.classList.remove("hidden");
  result.textContent = "Looking...";

  // call our helper function from data-source.js
  const fixture = findNextFixtureBetween(teamA, teamB);

  // if we don't find anything
  if (!fixture) {
    result.textContent = `No upcoming fixture found between "${teamA}" and "${teamB}".`;
    return;
  }

  // show the fixture nicely
  const date = new Date(fixture.date).toLocaleString();

  result.innerHTML = `
    <h2>Next Fixture</h2>
    <p><strong>${fixture.home}</strong> vs <strong>${fixture.away}</strong></p>
    <p>Date: ${date}</p>
    <p>Venue: ${fixture.venue}</p>
  `;
});



