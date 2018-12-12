
export async function filterNotes(cards) {
    console.log("cards", cards);

    let pinnedCards = [];
    let trashedCrads = [];
    let archivedCards = [];
    let reminderCards = [];
    let normalCards = [];
    await forLoop();
    function forLoop() {
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].reminder !== "") {
                reminderCards.push(cards[i])
            }
            if (cards[i].isPinned) {
                pinnedCards.push(cards[i])
            }
            else if (cards[i].isTrashed) {
                trashedCrads.push(cards[i])
            }
            else if (cards[i].archive) {
                archivedCards.push(cards[i])
            } else {
                normalCards.push(cards[i])
            }
        }
    }
    await stringify();
    function stringify() {
        localStorage.setItem("pinnedCards", JSON.stringify(pinnedCards));
        localStorage.setItem("trashedCrads", JSON.stringify(trashedCrads));
        localStorage.setItem("archivedCards", JSON.stringify(archivedCards));
        localStorage.setItem("reminderCards", JSON.stringify(reminderCards));
        localStorage.setItem("normalCards", JSON.stringify(normalCards));
    }
    JSON.parse(localStorage.getItem("pinnedCards")).map(()=>{
        console.log("hi");
    });
    

}