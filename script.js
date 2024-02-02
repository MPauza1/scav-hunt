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
    "1": { secret: "Mantas", hint: "Kyra knows where You must peek, in her favorite hide and seek. Look where she pu**r**rs and plays, for the next cl**u**e in this maze." },
    "2": { secret: "Kyra", hint: "Under the moon, Luna roams, near her second favorite domes. Search where she naps after play, there Your next clue w**i**ll lay." },
    "3": { secret: "Luna", hint: "Kaunas holds memories dear, find the next h**i**nt very near. Something or someone dear to You that reminds You of Kaunas has the next clue!" },
    "4": { secret: "Kaunas", hint: "With B**M**W, we travel far, look where we park or beneath the car star. Your next cl**u**e hides with speed and grace, inside or near our mobile space." },
    "5": { secret: "BMW", hint: "Bo**b** lights up our night and day, near his glow is where You'll play. Find the cl**u**e in his bright embrace, and You'll surely win this race." },
    "6": { secret: "Bob", hint: "Ve**n**om thrives in the shadows, sleek and unseen, search where darkness reigns, for Your clue to gleam. Near the place where night's secrets are kept, there Your next h**i**nt has silently crept." },
    "7": { secret: "Venom", hint: "Gr**o**ot guards the end, with heart so true, near something green, Your prize awaits You. Find him standing with arms wide spread, where plants or his figure lay their head." },
    "8": { secret: "Groot", hint: "Congratulations on reaching the final stage! To continue, think of a European country with vibrant cities, diverse cultures, and a rich history. It's known for its love of sausages, castles, and beautiful landscapes. Guess the name of this c**o**untry to unlock the next part of your adventure. Also, the last QR is somewhere in Mantas' pockets. Try asking him nicely, maybe he will give it to You. :)" },
    "9": { secret: "Germany", hint: "You're on the right track! To complete your adventure, you'll need to guess the city in Germany where your journey ends. Enter the city's name to reveal the final destination." }
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


document.onkeydown=function(e){
    if(window.e.keyCode=='13'){
        checkSecretWord();
    }
}


window.onload = function() {
    handleScavengerHuntStage();
};





