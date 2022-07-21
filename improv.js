window.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#showNotesBtn")
    .addEventListener("click", function () {
      // Get values from drop-downs
      const rootDropdown = document.querySelector("#rootSelection");
      const selectedRoot =
        rootDropdown.options[rootDropdown.selectedIndex].value;
      const chordDropdown = document.querySelector("#chordSelection");
      const selectedChord =
        chordDropdown.options[chordDropdown.selectedIndex].value;

      // Get and display chord
      showNotes(selectedRoot, selectedChord);
    });
});

function showNotes(root, name) {
  // create variable named data per the rapidApi docs
  const data = null;

  // put personal key in a variable to use later in the setRequestHeader code
  const rapidApiKey = "e504979048msh8d90776cca6d94cp135557jsn88a032c4c69f";

  // define endpoint
  const endpoint = `https://piano-chords.p.rapidapi.com/chords/${root}/${name}`;

  // create a new XMLHttpRequest object to communicate with the web server using Ajax
  const xhr = new XMLHttpRequest();

  //  from the rapidApi docs; necessary because an API key is used with this request
  xhr.withCredentials = true;

  // listen for the ready state change
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
      console.log(this.status);

      // convert the response from the API to a JSON object
      let response = JSON.parse(this.responseText);
      console.log(response.error);

      let html = "";
      html += "<p></p>";
      if (!response.error) {
        html += `${response.name} = `;
        for (let c = 0; c < response.notes.length; c++) {
          html += `${response.notes[c]} `;
        }
      } else {
        let errorMsg = JSON.parse(this.responseText);
        html += `${errorMsg.error[0]}`;
      }
      document.getElementById("showNotes").innerHTML = html;
    }
  });

  // initialize server connection whe XMLHttpRequest object's open() method is called
  xhr.open("GET", endpoint);

  // from the rapidApi docs
  xhr.setRequestHeader("X-RapidAPI-Key", rapidApiKey);
  xhr.setRequestHeader("X-RapidAPI-Host", "piano-chords.p.rapidapi.com/v2");

  // send HTTP request
  xhr.send(data);
}
