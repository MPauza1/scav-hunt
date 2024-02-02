function getQueryParam(param) {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

function createConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0d00ff', '#00adff', '#f88379', '#000000', '#ff0000']
    });
}

const stages = {
    "1": { secret: "Mantas", hint: "Kyra knows where You must peek, in her favorite hide and seek. Look where she pu<strong>r</strong>rs and plays, for the next clue in this maze." },
    "2": { secret: "Kyra", hint: "Under the moon, Luna roams, near her second favorite <strong>d</strong>omes. Search where she naps after play, there Your next clue will lay." },
    "3": { secret: "Luna", hint: "Kaunas holds memories dear, find the next hint very near. Something or someone dear to You that reminds You of Kaunas has <strong>t</strong>he next clue!" },
    "4": { secret: "Kaunas", hint: "With B<strong>M</strong>W, we travel far, look where we park or beneath the car star. Your next cl**u**e hides with speed and grace, inside or near our mobile space." },
    "5": { secret: "BMW", hint: "Bob lights up our night and day, near his glow is where You'll play. Find the cl<strong>u</strong>e in his bright embrace, and You'll surely win this race." },
    "6": { secret: "Bob", hint: "Ve<strong>n</strong>om thrives in the shadows, sleek and unseen, search where darkness reigns, for Your clue to gleam. Near the place where night's secrets are kept, there Your next h**i**nt has silently crept." },
    "7": { secret: "Venom", hint: "Gr<strong>o</strong>ot guards the end, with heart so true, near something green, Your prize awaits You. Find him standing with arms wide spread, where plants or his figure lay their head." },
    "8": { secret: "Groot", hint: "Congratulations on reaching the final stage! To continue, think of a European country with vibrant cities, <strong>d</strong>iverse cultures, and a rich history. It's known for its love of sausages, castles, and beautiful landscapes. Guess the name of this country to unlock the next part of your adventure. Also, the last QR is somewhere in Mantas' pockets. Try asking him nicely, maybe he will give it to You. :)" },
    "9": {
        secret: "Germany",
        hint: "You're on the right track! To complete your adventure, you'll need to guess the city in Germany where your journey ends. Enter the city's name to reveal the final destination.",
        hangman: {
            word: "DORTMUND",
            guessedLetters: [],
            maxAttempts: 6,
            attempts: 0,
        },
    },
};

const stageTextTemplates = {
    "1": "Good job on Your first hunt, Auguste!",
    "2": "Do You think You have what it takes?",
    "3": "You wont find this one",
    "4": "That's 4 already. Keep it coming!",
    "5": "Just a little bit further..",
    "6": "Just quit already..",
    "7": "If You don't want Your present, You can quit. :)",
    "8": "Congratulations! You did it. One last push.."
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
        document.getElementById("p-subheader").innerHTML = "Enter the secret word to read the next hint!";
        document.getElementById("hintText").innerHTML = "Enter the secret word for the next hint.";
        document.getElementById("submitBtn").innerHTML = "Submit Secret Word";
        let submitBtn = document.getElementById("submitBtn");
        if (submitBtn) {
            submitBtn.innerHTML = "Submit Secret Word";
        }
    } else {
        // If 'id' parameter doesn't match any stage, display an error message.
        document.getElementById("header_inspire").innerHTML = "Hmm, this doesn't seem right. Are You sure You're at the right stage?";
        document.getElementById("secretWordInput").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
    }
}

function checkSecretWord() {
    let inputWord = document.getElementById("secretWordInput").value.trim();

    if (!getQueryParam("id") && inputWord.toLowerCase() === "marley") {
        createConfetti();
        document.getElementById("hintText").innerHTML = "Here's Your first hint: Where mornings start with a brew, find Mantas waiting with Your clue. Near the spot where coffee rests, Your journey begins on this quest.";
        document.getElementById("hintSection").style.display = "block";
    } else {
        let id = getQueryParam("id");
        if (id && stages[id] && stages[id].secret.toLowerCase() === inputWord.toLowerCase()) {
            createConfetti();
            document.getElementById("hintSection").classList.add("show-hint");
            document.getElementById("hintText").innerHTML = stages[id].hint;
        } else {
            alert("Sorry, that's not the right word. Try again!");
        }
    }
}


window.onload = function() {
    handleScavengerHuntStage();
};

function handleHangmanFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const stage = stages["9"];
    const hangman = stage.hangman;

    // Get the input value (guessed letter or word)
    const input = document.getElementById("hangmanInput").value.trim().toUpperCase();

    if (input.length === 1 && /^[A-Z]$/.test(input)) {
        // If the input is a single uppercase letter, check if it matches any letter in the word
        if (stage.secret.includes(input)) {
            hangman.guessedLetters.push(input); // Add the guessed letter to the array
        } else {
            hangman.attempts++; // Increment the attempts if the guessed letter is not in the word
        }
    } else if (input === stage.secret) {
        // If the input is the entire word "DORTMUND," the game is won
        stage.wordGuessed = true;
    }

    // Display the hangman game
    displayHangman();

    // Clear the input field
    document.getElementById("hangmanInput").value = "";
}

// Add an event listener for form submission in ID=9
const hangmanForm = document.getElementById("hangmanForm");
if (hangmanForm) {
    hangmanForm.addEventListener("submit", handleHangmanFormSubmission);
}

// Function to display the hangman game
function displayHangman() {
    const stage = stages["9"];
    const hangman = stage.hangman;
    const word = stage.secret;

    // Check if the player has guessed the entire word
    if (word === "DORTMUND" && hangman.guessedLetters.length === 7) {
        stage.wordGuessed = true;
    }

    // Display the hangman form in stage 9
    if (getQueryParam("id") === "9" && !stage.wordGuessed) {
        document.getElementById("hangmanForm").style.display = "block";
    } else {
        document.getElementById("hangmanForm").style.display = "none";
    }

    // Display the hangman game only if the word is guessed
    if (stage.wordGuessed) {
        console.log("Congratulations! You've guessed the word.");
        // You can add logic here to proceed to the next stage or display a success message.
    }
}

// ... (remaining code)


