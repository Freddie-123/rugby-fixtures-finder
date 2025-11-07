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

