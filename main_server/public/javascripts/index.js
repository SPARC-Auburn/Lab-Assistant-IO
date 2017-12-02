var applicationsRoute = '/command_handler';
var debugAnnyang = true;
var ttsVoice = 'US English Female';
var ttsRate = 1.0;

$(document).ready(function() {
  if (annyang) {
    // Let's define a command.
    var commands = {
      '(hey) (yo) (okay) (ok) assist *query': useApplication
    }
  }

  if (debugAnnyang) {
    annyang.debug();
  }

  SpeechKITT.annyang();
  SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');
  annyang.addCommands(commands);
  SpeechKITT.vroom();

})

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
  $.post(applicationsRoute, dataToSend, function(dataRecieved){handleApplicationResponse(dataRecieved)});
}

function handleApplicationResponse(response) {
  tts(response.ttsText);
  console.log(response);
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
