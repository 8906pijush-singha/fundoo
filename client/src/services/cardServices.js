


function ordinaryCards(cardsData) {
    let ordinaryCards = [];
    for (let i = 0; i < cardsData.length; i++) {
        if (!cardsData[i].isPinned && !cardsData[i].archive && !cardsData[i].isTrashed) {
            ordinaryCards.push(cardsData[i]);
        }
    }
    return ordinaryCards;
}
function reminderNotes(cardsData) {
    let reminderNotes = [];
    for (let i = 0; i < cardsData.length; i++) {
        if (cardsData[i].reminder!=="" && !cardsData[i].isTrashed) {
            reminderNotes.push(cardsData[i]);
        }
    }
    return reminderNotes;
}
function archivedNotes(cardsData) {
    let archivedNotes = [];
    for (let i = 0; i < cardsData.length; i++) {
        if (cardsData[i].archive) {
            archivedNotes.push(cardsData[i]);
        }
    }
    return archivedNotes;
}
function othersArray(cardsData) {
    let othersArray = []

    for (let i = 0; i < cardsData.length; i++) {
        if (!cardsData[i].isPinned && !cardsData[i].archive) {
            othersArray.push(cardsData[i])
        }
    }
    return othersArray

}
function pinArray(cardsData) {
    let pinArray = []

    for (let i = 0; i < cardsData.length; i++) {
        if (cardsData[i].isPinned) {
            pinArray.push(cardsData[i])
        }
    }
    return pinArray

}
function trashArray(cardsData) {
    let trashArray = []

    for (let i = 0; i < cardsData.length; i++) {
        if (cardsData[i].isTrashed) {
            trashArray.push(cardsData[i])
        }
    }
    return trashArray

}

module.exports={
    ordinaryCards,
    pinArray,
    othersArray,
    archivedNotes,
    reminderNotes,
    trashArray
}