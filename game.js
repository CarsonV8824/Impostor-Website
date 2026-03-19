document.addEventListener("DOMContentLoaded", () => {

    // hide the vote button and dropdown untill everyone has seen their words
    const VotePlayer = document.getElementById("voteForPlayer");
    const VoteBtn = document.getElementById("voteBtn");
    VotePlayer.style.display = "none";
    VoteBtn.style.display = "none";

    const playerCount = Number(localStorage.getItem("Player Count"))
    console.log(playerCount)
    let categories = []
    let randomcategory
    let agentWord
    let impostorWord
    let impostorIndex
    let gameList = [];

    let gameIterate = 0;

    let show = 0;

    function pickRandomCategory(data) {
        const random = data.categories[Math.floor(Math.random() * data.categories.length)]
        console.log("Random category:", random)
        return random;
    }

    function initializeGame(categoriesData) {
        randomcategory = pickRandomCategory(categoriesData)
        
        let categoryName = randomcategory.name;
        let categoryItems = randomcategory.words;

        agentWord = categoryItems[Math.floor(Math.random() * categoryItems.length)]
        impostorWord = categoryItems[Math.floor(Math.random() * categoryItems.length)]

        while (agentWord === impostorWord) {
            impostorWord = categoryItems[Math.floor(Math.random() * categoryItems.length)]
        }
        console.log(categoryName)
        console.log(agentWord)
        console.log(impostorWord)
        
        impostorIndex = Math.floor(Math.random() * (playerCount-1))
        for (let i=0; i<playerCount; i++){
            if (i === impostorIndex){
                gameList.push(impostorWord)
                continue;
            } else {
                gameList.push(agentWord)
            }
        }
        console.log(gameList)
    }

    fetch("categories.json")
        .then(response => response.json())
        .then(data => {
            categories = data
            console.log("Now it's loaded:", categories)
            initializeGame(categories)
            const infoText = document.getElementById("infoText")
            const turnBtn = document.getElementById("turnBtn")

            //  TODO: Implement game logic
            turnBtn.addEventListener("click", () => {
                show += 1
                if (gameIterate >= playerCount) {
                    infoText.textContent = "All players have seen their words. Click the button to start the discussion!"
                    turnBtn.style.display = "none"
                    VoteBtn.style.display = "block";
                    VotePlayer.style.display = "block";
                    for (let i=1; i<=playerCount; i++) {
                        const option = document.createElement("option");
                        option.value = i;
                        option.textContent = `Player ${i}`;
                        VotePlayer.appendChild(option);
                    }
                    VoteBtn.addEventListener("click", () => {
                        const selectedPlayer = VotePlayer.value;
                        if (selectedPlayer.replace("Player ", "") == impostorIndex + 1) {
                            infoText.textContent = `You voted for Player ${selectedPlayer}. They were the IMPOSTOR! You win!`
                        } else {                            
                            infoText.textContent = `You voted for Player ${selectedPlayer}. They were NOT the IMPOSTOR! You lose! The IMPOSTOR was Player ${impostorIndex + 1}.`
                        }
                        VoteBtn.style.display = "none";
                        VotePlayer.style.display = "none";
                    })
                    return;
                }
                if (show % 2 === 1) {
                    if (gameIterate === impostorIndex) {
                        infoText.textContent = `Player ${Math.ceil(show/2)}, you are the IMPOSTOR! Your word is: ${gameList[gameIterate]}`
                    } else {
                        infoText.textContent = `Player ${Math.ceil(show/2)}, your word is: ${gameList[gameIterate]}`
                    }
                    gameIterate += 1
                } else {
                    infoText.textContent = "Pass the device to the next player and click the button when ready."
                }
                return;
            })

        })
        .catch(error => console.error("Failed to load JSON file:", error))
    
});