// function generates one random value [0-9]
var valGenerator = function () {
    return Math.floor(Math.random()*10);
}

// function generates 1 cards
var cardGenerator = function (owner) {
    return {
        top_val: valGenerator(),
        right_val: valGenerator(),
        bottom_val: valGenerator(),
        left_val: valGenerator(),
        owner: owner
    }
}
// function generates 5 cards
var fiveCardsGenerator = function (owner) {
    var cards = [];
    for (var i = 0; i < 5; i++) {
        cards.push(cardGenerator(owner));
    }
    return cards;
}
export { cardGenerator, fiveCardsGenerator };