document.addEventListener("DOMContentLoaded", () => {
    const playerCount = Number(localStorage.getItem("Player Count"))
    console.log(playerCount)
    let categories = []
    let randomcategory

    let gameList = [];

    function pickRandomCategory(data) {
        const random = data.categories[Math.floor(Math.random() * data.categories.length)]
        console.log("Random category:", random)
        return random;
    }

    fetch("categories.json")
        .then(response => response.json())
        .then(data => {
            categories = data
            console.log("Now it's loaded:", categories)

            // use categories here
            randomcategory = pickRandomCategory(categories)
            
            let categoryName = randomcategory.name;
            let categoryItems = randomcategory.words;

            let agentWord = categoryItems[Math.floor(Math.random() * categoryItems.length)]
            let impostorWord = categoryItems[Math.floor(Math.random() * categoryItems.length)]

            while (agentWord === impostorWord) {
                impostorWord = categoryItems[Math.floor(Math.random() * categoryItems.length)]
            }
            console.log(categoryName)
            console.log(agentWord)
            console.log(impostorWord)
            let impostorIndex = Math.floor(Math.random() * (playerCount-1))
            for (let i=0; i<playerCount; i++){
                if (i === impostorIndex){
                    gameList.push(impostorWord)
                    continue;
                } else {
                    gameList.push(agentWord)
                }
            }
            console.log(gameList)
        })
        .catch(error => console.error("Failed to load JSON file:", error))
    
});