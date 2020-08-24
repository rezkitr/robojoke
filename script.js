const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// disable/enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// say joke
function tellJoke(joke) {
  VoiceRSS.speech({
    key: config.apiKey,
    src: joke,
    hl: "en-us",
    v: "Mike",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// fetch joke API
async function getJokes() {
  let joke = "";

  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    toggleButton();
    tellJoke(joke);
  } catch (error) {
    console.log("Sorry, error : ", error);
  }
}

// button event
button.addEventListener("click", getJokes);

audioElement.addEventListener("ended", toggleButton);
