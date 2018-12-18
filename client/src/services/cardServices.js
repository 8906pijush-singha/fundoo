


function ordinaryCards(cardsData) {
    let ordinaryCards = [];
    for (let i = 0; i < cardsData.length; i++) {
        if (!cardsData[i].note.isPinned && !cardsData[i].note.archive && !cardsData[i].note.isTrashed) {
            ordinaryCards.push(cardsData[i]);
        }
    }
    return ordinaryCards;
}
function reminderNotes(cardsData) {
    let reminderNotes = [];
    for (let i = 0; i < cardsData.length; i++) {
        if (cardsData[i].note.reminder!=="" && !cardsData[i].note.isTrashed) {
            reminderNotes.push(cardsData[i]);
        }
    }
    return reminderNotes;
}
function archivedNotes(cardsData) {
    let archivedNotes = [];
    for (let i = 0; i < cardsData.length; i++) {
        if (cardsData[i].note.archive) {
            archivedNotes.push(cardsData[i]);
        }
    }
    return archivedNotes;
}
function othersArray(cardsData) {
    let othersArray = []

    for (let i = 0; i < cardsData.length; i++) {
        if (!cardsData[i].note.isPinned && !cardsData[i].note.archive) {
            othersArray.push(cardsData[i])
        }
    }
    return othersArray

}
function pinArray(cardsData) {
    let pinArray = []

    for (let i = 0; i < cardsData.length; i++) {
        if (cardsData[i].note.isPinned) {
            pinArray.push(cardsData[i])
        }
    }
    return pinArray

}
function trashArray(cardsData) {
    let trashArray = []

    for (let i = 0; i < cardsData.length; i++) {
        if (cardsData[i].note.isTrashed) {
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