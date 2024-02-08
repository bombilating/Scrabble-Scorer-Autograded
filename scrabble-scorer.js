// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let score = 0;
	for (let i = 0; i < word.length; i++) {
 
	  for (pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
         pointValue = Number(pointValue);
         score += pointValue;
		 }
 
	  }
	}
	return score;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   return input.question("Enter a word to score: ");
};

function simpleScorer(word) {
   let letterPoints = 0;
   for(i=0; i<word.length; i++) {
      letterPoints++;
   }
   return letterPoints;
};

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   let vowelsList = ["A","E","I","O","U"];
   for(i=0; i<word.length; i++) {
      if(vowelsList.includes(word[i])) {
      letterPoints += 3;
      } else {
         letterPoints++;
      }
   }
   return letterPoints;
};

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for(let i = 0; i<word.length; i++){
      letterPoints += newPointStructure[word[i]];
   }
   return letterPoints;
};

const scoringAlgorithms = [{
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
}, {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
}, {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
}];

function scorerPrompt() {
   scoringChoice = Number(input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0 , 1 , or 2: "));
   while(scoringChoice < 0 || scoringChoice > 2) {
      scoringChoice = Number(input.question("That is an invalid number. Please try again: "));
   }
   return scoringAlgorithms[scoringChoice].scorerFunction;
}

function transform(oldPointStructure) {
   let transformedPointStructure = {};
   for (point in oldPointStructure) {
      for(i=0;i<oldPointStructure[point].length;i++) {
         transformedPointStructure[oldPointStructure[point][i].toLowerCase()] = Number(point);
      }
   }
   return transformedPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let scoringChoice = scorerPrompt();
   let score = scoringChoice(word);
   console.log(`You scored ${score} points for the word '${word}'`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
