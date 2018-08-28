console.log("connected...");

var game = getTargetAndCrystals();

console.log("Target number:", game.targetNumber);
console.log("crystalNumbers:", game.crystalNumbers);

//set up game essential varaibles, using JQuery way instead of javascript//
var totalScore = 0;
var wins = 0;
var loss = 0;
var winSpan = $("#wins");
var lossSpan = $("#loses");
var totalSpan = $("#totalScore");
var targetSpan = $("#targetNumber");
var crystals = $("img");
//select each crystal, shows its value attribute base obn crystal index, this update the crystal value and totalScore in the console.log section//
crystals.each(function(index) {
    $(this).attr("value", game.crystalNumbers[index]);
});
//create random generated number, given the game rule of max and min requirement//
function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//assign value for each crystal from 1 to 12, and generate target number from 19 to 120 base on the game rule//
function getTargetAndCrystals() {
    var targetNumber = getRandomNumber(120, 19);
    var crystalNumbers = [
        getRandomNumber(12, 1),
        getRandomNumber(12, 1),
        getRandomNumber(12, 1),
        getRandomNumber(12, 1),
    ];
//this section return the previously generated random crystal value and targeted game number//
    return {
        targetNumber: targetNumber, 
        crystalNumbers: crystalNumbers
    };
}
//connect the wins/loss/totalScore/gameTargetNumber of the HTML file//
winSpan.html(wins);
lossSpan.html(loss);
totalSpan.html(totalScore);
targetSpan.html(game.targetNumber);
//change the HTML class of all the crystal into a .crystal so that it will select 4 crystal to make the rule apply to all of the crystals
$(".crystal").on("click", function(){
    
    crystalValue = parseInt($(this).attr("value"));
    totalScore += crystalValue;
//set up the condition of wins or loss that if total score equal to the targetNumber:wins otherwise: loss//

    if(totalScore === game.targetNumber) {
        wins++;
        alert("You Win!");
        //this step reset crystal value and the target score//
        game = getTargetAndCrystals();
        totalScore = 0;
        targetSpan.html(game.targetNumber);
//if random guess socre goes above the target number that alert loss and reset the targetNumber and total score//
    } else if (totalScore >= game.targetNumber) {
        loss++
        alert ("You lose!!!");
        game = getTargetAndCrystals();
        totalScore = 0;
        targetSpan.html(game.targetNumber);
    }
//this update the winspan, losespan, and totalScoreSpan//
    winSpan.html(wins);
    lossSpan.html(loss);
    totalSpan.html(totalScore);

    console.log("Total score:", totalScore);
    console.log("Total score type:", typeof totalScore);
    console.log("Target number type:", typeof game.targetNumber);
    console.log("Crystal value:", crystalValue);
});

$("#number-to-guess").text(targetNumber);
