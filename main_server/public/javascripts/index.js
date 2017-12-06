var applicationsRoute = '/command_handler';
var debugAnnyang = true;

var ttsVoice = 'US English Female';
var ttsRate = 1.0;
var botui;

var assistant = {
  name: 'Karen',
  label: 'karen',
  purpose: 'to assist SPARC members',
  intro: 'My name is Karen.  How may I help you?',
  voice: 'US English Female'
}

$(document).ready(function() {
  if (annyang) {
    var commands = {'(hey) (yo) (okay) (ok) karen *query' : useApplication};
  }

  if (debugAnnyang) {
    annyang.debug();
  }

  SpeechKITT.annyang();
  SpeechKITT.setInstructionsText('Listening...');
  SpeechKITT.setStylesheet('../stylesheets/speechkitt.css');
  annyang.addCommands(commands);
  SpeechKITT.vroom();
  botui = new BotUI('botui-app');
  isListening = false;
  say(assistant.intro);
  var instructionString = "To communicate with me say, hey " + assistant.name + " and ask me what you would like to know.";
  say(instructionString,1000);
})

function say(response, delay) {
  botui.message.bot({
    delay: delay,
    content: response
  });
  if (SpeechKITT.isListening()){
    tts(response);
  }
  else {

  }
}

function ask_user(){ 
  var command = ""
  if (SpeechKITT.isListening()){
     
  }
  else {
    command = botui.action.text({ // show 'text' action
      action: {
        placeholder: ''
      }
    }); 
  }
}

function tts(text) {
  responsiveVoice.speak(text, ttsVoice, {
    rate: ttsRate
  });
}

function useApplication(question) {
  var userCoords = getGeoLocationCoords();
  var dataToSend = {
    'question': question,
    'userCoords': userCoords
  };
  botui.message.add({
    human: true,
    content: question
  });
  $.post(applicationsRoute, dataToSend, function(dataRecieved){handleApplicationResponse(dataRecieved)});
}

function handleApplicationResponse(response) {
  say(response.ttsText);
}

function getGeoLocationCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          return position.coords;
        });
    } else {
         console.warn('Browswer does not support geolocation');
    }
}
