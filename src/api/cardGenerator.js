var valGenerator = function () {
    return Math.floor(Math.random()*10);
}
var cardGenerator = function () {
    return {
        top_val: valGenerator(),
        right_val: valGenerator(),
        bottom_val: valGenerator(),
        left_val: valGenerator()

    }
}
export { cardGenerator };