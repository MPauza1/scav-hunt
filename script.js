function getQueryParam(param) {
  let searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
}

function createConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#0d00ff", "#00adff", "#f88379", "#000000", "#ff0000"],
  });
}

const stages = {
  1: {
    secret: "Mantas",
    hint: "Kyra knows where You must peek, in her favorite hide and seek. Look where she pu<strong>r</strong>rs and plays, for the next clue in this maze.",
  },
  2: {
    secret: "Kyra",
    hint: "Under the moon, Luna roams, near her second favorite <strong>d</strong>omes. Search where she naps after play, there Your next clue will lay.",
  },
  3: {
    secret: "Luna",
    hint: "Kaunas holds memories dear, find the next hint very near. Something or someone dear to You that reminds You of Kaunas has <strong>t</strong>he next clue!",
  },
  4: {
    secret: "Kaunas",
    hint: "With B<strong>M</strong>W, we travel far, look where we park or beneath the car star. Your next clue hides with speed and grace, inside or near our mobile space.",
  },
  5: {
    secret: "BMW",
    hint: "Bob lights up our night and day, near his glow is where You'll play. Find the cl<strong>u</strong>e in his bright embrace, and You'll surely win this race.",
  },
  6: {
    secret: "Bob",
    hint: "Ve<strong>n</strong>om thrives in the shadows, sleek and unseen, search where darkness reigns, for Your clue to gleam. Near the place where night's secrets are kept, there Your next hint has silently crept.",
  },
  7: {
    secret: "Venom",
    hint: "Gr<strong>o</strong>ot guards the end, with heart so true, near something green, Your prize awaits You. Find him standing with arms wide spread, where plants or his figure lay their head.",
  },
  8: {
    secret: "Groot",
    hint: "Congratulations on reaching the final stage! To continue, think of a European country with vibrant cities, <strong>d</strong>iverse cultures, and a rich history. It's known for its love of sausages, castles, and beautiful landscapes. Guess the name of this country to unlock the next part of your adventure. Also, the last QR is somewhere in Mantas' pockets. Try asking him nicely, maybe he will give it to You. :)",
  },
  9: {
    secret: "Germany",
    hint: "In the heart of Europe, nestled between vibrant cities, you'll find this German gem. Known for its rich history, diverse culture, and love of sausages, it's a place where black, red, and gold fly high. Discover it amidst valleys, forests, and hidden paths, where nature and history blend into a tapestry of secrets and stories untold. And don't forget to visit its renowned zoo, home to a fascinating array of wildlife from around the world. This city is a treasure waiting to be uncovered on your adventure! Hint: In all the stages of the game there was one letter that was different from the others.. Did You catch them? If not, scan the QR's again and search for them. The letters combine to the destination of our journey. But it won't be that easy. Good that You have such a smart guy like Mantas beside You. Don't be afraid to ask for his help. :)",
  },
};

const stageTextTemplates = {
  1: "Good job on Your first hunt, Auguste!",
  2: "Do You think You have what it takes?",
  3: "You wont find this one",
  4: "That's 4 already. Keep it coming!",
  5: "Just a little bit further..",
  6: "Just quit already..",
  7: "If You don't want Your present, You can quit. :)",
  8: "Congratulations! You did it. One last push..",
  9: "I didn't think You would get here. Good job! :)"
};

function handleScavengerHuntStage() {
  let id = getQueryParam("id");

  if (!id) {
    // If no 'id' parameter is present in the URL, display default text.
    document.getElementById("secretWordInput").style.display = "block";
    let submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
      console.log(submitBtn.innerHTML);
      submitBtn.innerHTML = "Begin Adventure";
    }
  } else if (stages.hasOwnProperty(id)) {
    // If 'id' parameter matches a stage, display the corresponding template text.
    const template = stageTextTemplates[id] || ""; // Use the template or an empty string if not found
    document.getElementById("header_inspire").innerHTML = template;
    document.getElementById("p-subheader").innerHTML =
      "Enter the secret word to read the next hint!";
    document.getElementById("hintText").innerHTML =
      "Enter the secret word for the next hint.";
    document.getElementById("submitBtn").innerHTML = "Submit Secret Word";
    let submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
      submitBtn.innerHTML = "Submit Secret Word";
    }
  } else {
    // If 'id' parameter doesn't match any stage, display an error message.
    document.getElementById("header_inspire").innerHTML =
      "Hmm, this doesn't seem right. Are You sure You're at the right stage?";
    document.getElementById("secretWordInput").style.display = "none";
    document.getElementById("submitBtn").style.display = "none";
  }
}

function checkSecretWord() {
  let inputWord = document.getElementById("secretWordInput").value.trim();

  if (!getQueryParam("id") && inputWord.toLowerCase() === "marley") {
    createConfetti();
    document.getElementById("hintText").innerHTML =
      "Here's Your first hint: Where mornings start with a brew, find Mantas waiting with Your clue. Near the spot where coffee rests, Your journey begins on this quest.";
    document.getElementById("hintSection").style.display = "block";
  } else {
    let id = getQueryParam("id");
    if (
      id &&
      stages[id] &&
      stages[id].secret.toLowerCase() === inputWord.toLowerCase()
    ) {
      createConfetti();
      document.getElementById("hintSection").classList.add("show-hint");
      document.getElementById("hintText").innerHTML = stages[id].hint;
    } else {
      alert("Sorry, that's not the right word. Try again!");
    }
  }
}

window.onload = function () {
  handleScavengerHuntStage();
};
