// Function to get URL parameters
function getQueryParam(param) {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

function createConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#bb0000', '#ffffff', '#ff9900', '#00ff00', '#0000ff', '#ff00ff'] // Customize these colors
    });
}

// Mapping of IDs to their corresponding secret words and hints
const stages = {
    "1": { secret: "secretWord1", hint: "Hint for ID 1: [Insert clue here]" },
    "2": { secret: "secretWord2", hint: "Hint for ID 2: [Insert clue here]" },
    "3": { secret: "secretWord3", hint: "Hint for ID 3: [Insert clue here]" },
    "4": { secret: "secretWord4", hint: "Hint for ID 4: [Insert clue here]" },
    "5": { secret: "secretWord5", hint: "Hint for ID 5: [Insert clue here]" },
    "6": { secret: "secretWord6", hint: "Hint for ID 6: [Insert clue here]" },
    "7": { secret: "secretWord7", hint: "Hint for ID 7: [Insert clue here]" },
    "8": { secret: "secretWord8", hint: "Final Hint! This is the last clue: [Insert final clue here]" },
};

function handleScavengerHuntStage() {
    var id = getQueryParam("id");
    
    // If no ID is present, it's the initial stage
    if (!id) {
        document.getElementById("hintText").innerHTML = "Enter the first secret code to begin your adventure.";
        // Show the input field and button to submit the initial secret word
        document.getElementById("secretWordInput").style.display = "block";
        document.getElementById("submitBtn").style.display = "block";
    } else if (stages.hasOwnProperty(id)) {
        // If a valid ID is provided, prepare for the next secret word
        document.getElementById("hintText").innerHTML = "Enter the secret word for the next hint.";
    } else {
        // Handle invalid ID
        document.getElementById("hintText").innerHTML = "Hmm, this doesn't seem right. Are you sure you're at the right stage?";
        // Hide the input field and button until a valid ID is entered
        document.getElementById("secretWordInput").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
    }
}

function checkSecretWord() {
    var inputWord = document.getElementById("secretWordInput").value.trim();

    // Check the initial secret word if no ID is present
    if (!getQueryParam("id") && inputWord.toLowerCase() === "marley") {
        // Correct initial secret word
        createConfetti();
        // Display the first hint
        document.getElementById("hintText").innerHTML = "Here's your first hint: [Insert the actual first hint here]";
        // Now show the hint section
        document.getElementById("hintSection").style.display = "block";
    } else {
        // Handle other secret words based on the ID
        var id = getQueryParam("id");
        if (id && stages[id] && stages[id].secret.toLowerCase() === inputWord.toLowerCase()) {
            // Correct secret word for given ID
            createConfetti();
            // Show the hint for the current stage
            document.getElementById("hintText").innerHTML = stages[id].hint;
        } else {
            // Incorrect secret word
            alert("Sorry, that's not the right word. Try again!");
        }
    }
}



window.onload = function() {
    handleScavengerHuntStage();
};





