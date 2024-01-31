function getQueryParam(param) {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

function createConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#bb0000', '#ffffff', '#ff9900', '#00ff00', '#0000ff', '#ff00ff']
    });
}

const stages = {
    "1": { secret: "Mantas", hint: "Kyra knows where you must peek, in her favorite hide and seek. Look where she purrs and plays, for the next clue in this maze." },
    "2": { secret: "Kyra", hint: "Under the moon, Luna roams, near her second favorite domes. Search where she naps after play, there your next clue will lay." },
    "3": { secret: "Luna", hint: "Kaunas holds memories dear, find the next hint very near. Something or someone dear to You that reminds you of Kaunas has the next clue!" },
    "4": { secret: "Kaunas", hint: "With BMW, we travel far, look where we park or beneath the car star. Your next clue hides with speed and grace, inside or near our mobile space." },
    "5": { secret: "BMW", hint: "Bob lights up our night and day, near his glow is where you'll play. Find the clue in his bright embrace, and you'll surely win this race." },
    "6": { secret: "Bob", hint: "Venom thrives in the shadows, sleek and unseen, search where darkness reigns, for your clue to gleam. Near the place where night's secrets are kept, there your next hint has silently crept." },
    "7": { secret: "Venom", hint: "Groot guards the end, with heart so true, near something green, your prize awaits you. Find him standing with arms wide spread, where plants or his figure lay their head." },
    "8": { secret: "Groot", hint: "Final Hint! This is the last clue: Set your sights on a land where black, red, and gold fly high, in the heart of Europe, under a wide sky. Between the Rhine's flow and the Harz's stand, lies our city, vibrant and grand. Not far from where the Ruhr river bends, amidst valleys and forests, our journey extends. A place where nature and history blend, and hidden paths to green oases wend. In this city, secrets and stories untold, in a country of castles, rivers, and gold. With a map in hand, look where these clues unfold, to find our destination, brave and bold. Now, whisper your guess into my ear, let's see if our next adventure starts here." },
};

function handleScavengerHuntStage() {
    let id = getQueryParam("id");
    
    if (!id) {
        document.getElementById("hintText").innerHTML = "Enter the first secret code to begin your adventure.";
        document.getElementById("secretWordInput").style.display = "block";
        let submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.innerHTML = "Begin Adventure";
    }
    } else if (stages.hasOwnProperty(id)) {
        document.getElementById("hintText").innerHTML = "Enter the secret word for the next hint.";
        document.getElementById("submitBtn").innerHTML = "Submit Secret Word";
        let submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.innerHTML = "Submit Secret Word";
    }
    } else {
        document.getElementById("hintText").innerHTML = "Hmm, this doesn't seem right. Are you sure you're at the right stage?";
        document.getElementById("secretWordInput").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
    }
}

function checkSecretWord() {
    let inputWord = document.getElementById("secretWordInput").value.trim();

    if (!getQueryParam("id") && inputWord.toLowerCase() === "marley") {
        createConfetti();
        document.getElementById("hintText").innerHTML = "Here's your first hint: Where mornings start with a brew, find Mantas waiting with your clue. Near the spot where coffee rests, your journey begins on this quest.";
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





