document.addEventListener("DOMContentLoaded", () => {
    const setupBtn = document.getElementById("startBtn");
    const playerCount = document.getElementById("playerCount");

    setupBtn.addEventListener("click", () => {
        console.log("works");

        const player = Number(playerCount.value);

        if (!Number.isInteger(player) || player <= 0) {
            alert("Enter a whole number greater than 0");
            return;
        }

        localStorage.setItem("Player Count", player)
        window.location.href = "game.html"
    });
});
