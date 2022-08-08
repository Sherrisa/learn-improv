"use strict";

let favoriteFills = [];

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

      // get and display chord
      showNotes(selectedRoot, selectedChord);
    });
    
    favoriteFills = loadFills();
    console.log("favoriteFills: " + favoriteFills);
    document.getElementById("favoriteFills").innerHTML = favoriteFills;
});

// access data for Chord Speller for Lesson 1
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

// accordion for the major, minor, diminished and augmented chords
$(".accordion").accordion({
  collapsible: true,
  heightStyle: "content",
});

// JQuery & Cycle2 Slideshow
let $slideshow = $(".cycle-slideshow");

$slideshow.click(function () {
  if ($slideshow.is(".cycle-paused")) $slideshow.cycle("resume");
  else $slideshow.cycle("pause");
});

$slideshow.cycle({
  fx: "fadeout",
  speed: "200",
  timeout: "3000",
  pauseOnHover: "true",
  autoHeight: "container",
  slides: "li",
});

// for accessibility there must be a clear way to pause
$("#pauseBtn").click(function () {
  $slideshow.cycle("pause");
});
$("#resumeBtn").click(function () {
  $slideshow.cycle("resume");
});

// on page load and display the favorite fills from localStorage
function loadFills() {
  if (localStorage.getItem("fills")) {
    return localStorage.getItem("fills").split();
  }else{
    return [];
  }
}

// save contents of textarea box to localStorage on click of save button
$("#saveFills").click(function(){
  // get the contents of the textarea input box
  let fillsTextInput = document.querySelector("#favoriteFills");
  let fills = fillsTextInput.value;

  // save contents of textarea to localStorage
  localStorage.setItem("fills", fills.toString());
});

$("#clearFills").click(function(){
  localStorage.clear();
  document.getElementById("favoriteFills").innerHTML = [];
})

