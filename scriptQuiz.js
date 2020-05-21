atLeastSomeData = false;
var basicSymptoms = ["fever", "cough", "tiredness"];
var mediumSymptoms = ["aches_and_pains", "throat", "diarrhea", "conjunctivitis", "headache", "smell", "skin"];
var seriousSymptoms = ["breathing", "chest_pain", "speech"];

var messages = ["Great! you seem to be alright, in any case follow the rules and be careful", "Your current state makes you a likely candidate for coronavirus, althought it's early to say. Stay home as much as possible and follow all the precautions indicated",
"You could be infected, please contact the necessary authorities and check on your nearest hospital"];

$("input#buttonSubmit").click(function(event){
  if(!atLeastSomeData){
  event.preventDefault();
  checkedStrings = []
  $(":checkbox").each(function(){
    if(this.checked){
      checkedStrings.push(this.id);
  }
});
  var numberOfQuizResult = checkQuiz(checkedStrings);
  var messageChosen = messages[numberOfQuizResult];
  displayQuizResult(messageChosen);
}
});


$('form').on('submit', function (event) {
  if(!atLeastSomeData){
   	          	event.preventDefault();
              }
  else{
    console.log("at least one box was checked");
  }
});


function displayQuizResult(messageToDisplay){
  $("div.centralDiv").html("<img src='loading.gif' style='display:block;margin-left:auto;margin-right:auto;'>");
  setTimeout(function(){
  $("div.centralDiv").html("<p id='textQuizResult'>" + messageToDisplay + "</p>");
}, 2000);


}

function checkQuiz(checkedIds){
  finalPunctuation = 0;
  somethingSerious = false;
  for (word in checkedIds){
    word = checkedIds[word];
    if(basicSymptoms.includes(word)){
      finalPunctuation += 1;
    }
    if(mediumSymptoms.includes(word)){
      finalPunctuation = finalPunctuation + 3;
      console.log(finalPunctuation);
    }
    if(seriousSymptoms.includes(word)){
      somethingSerious = true;
    }
  }
  console.log("final");
  console.log(finalPunctuation);
  if(finalPunctuation > 10 || somethingSerious){
    console.log("hospital");
    return 2;
  }
  else if(finalPunctuation > 4){
    console.log("stay safe");
    return 1;
  }else{
    console.log("just follow the rules");
    return 0;
  }


}
