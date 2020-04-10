
// Greeting is a global varible and ensure that the greeting only happen once
 var greeting = 0;


 function smiling_cat(name_person){

    document.querySelector("#octocat").classList.remove("normal_cat")
    document.querySelector("#octocat").classList.add("sm_cat")
    let speech_bubble = document.querySelector("#speech");
    let time_show_msg=0;
    let condition_Promise = new Promise((resolve, reject) => {
      if (greeting==0) {
            speech_bubble.classList.add("speech_heart")
            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 1
                msg.rate = 1.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

           msg = new SpeechSynthesisUtterance(name_person);
                msg.volume = 1
                msg.rate = 0.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);
          greeting = 2;

          time_show_msg = 3000
      }
      else if (greeting==2) {
        speech_bubble.classList.add("speech_hi")
        var msg = new SpeechSynthesisUtterance('meow meow');
            msg.volume = 1
            msg.rate = 1.5
            msg.pitch = 2
            msg.lang = 'de-D'
        window.speechSynthesis.speak(msg);
        var msg = new SpeechSynthesisUtterance('mein Name ist Tom');
            msg.volume = 1
            msg.rate = 1.0
            msg.pitch = 2
            msg.lang = 'de-D'
        window.speechSynthesis.speak(msg);
        greeting=3
        time_show_msg = 3000
      }
      else {
          fetch('/weather')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                speech_bubble.classList.add("speech_empty")
                speech_bubble.querySelector("span").innerHTML=
                `Temp: ${Math.round(data.main.temp)} °C<br>
                 Temp_min: ${Math.round(data.main.temp_min)} °C <br>
                 Temp_max: ${Math.round(data.main.temp_max)} °C <br>
                 Weather: ${data.weather[0].description} <br>
                `

              let text = `
                    Aktuelle Temperatur ${Math.round(data.main.temp)} °
                    Minimale Temperatur: ${Math.round(data.main.temp_min)} °
                    Maximale Temperatur: ${Math.round(data.main.temp_max)} °
                    Aktuelles Wetter: ${data.weather[0].description}

                `
              var msg = new SpeechSynthesisUtterance(text);
                    msg.volume = 1
                    msg.rate = 1.5
                    msg.pitch = 2
                    msg.lang = 'de-D'
              window.speechSynthesis.speak(msg);
              });
              time_show_msg = 15000

      }

    }).then(
          setTimeout(function(){

     document.querySelector("#octocat").classList.add("normal_cat");
     document.querySelector("#octocat").classList.remove("sm_cat");
     speech_bubble.querySelector("span").innerHTML="";
     speech_bubble.classList=""

  }, time_show_msg)

    )









 }

 function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

 function get_weater(){

 fetch('https://samples.openweathermap.org/data/2.5/weather?q=Eberstadt,ger&appid=b6907d289e10d714a6e88b30761fae22')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
 }
//////////////////
    //DOM load event+9
window.addEventListener("DOMContentLoaded",	() => {

    //Check that page is not running in a CodePen preview iframe

    //Set speech recognition
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    window.SpeechRecognition.lang =" de-DE"
    const recognition = new SpeechRecognition(),
          colorName = document.querySelector('.color-name'),
          colorCube = document.querySelector('.color-cube'),
          heardOutput = document.querySelector('.heard-output'),
          confidenceOutput = document.querySelector('.confidence-output'),
          cssColorNames = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "transparent", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];

    //Start speech recognition
    recognition.start();

    //Listen for when the user finishes talking
    recognition.addEventListener('result', e => {

        //Get transcript of user speech & confidence percentage
        const transcript = e.results[0][0].transcript.toLowerCase().replace(/\s/g, ''),
              confidence = (e.results[0][0].confidence * 100).toFixed(1);

    if (transcript.include("svenja")) {

            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 1
                msg.rate = 1.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

           msg = new SpeechSynthesisUtterance(name_person);
                msg.volume = 1
                msg.rate = 0.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

          time_show_msg = 3000
      }

        //Output transcript
        heardOutput.textContent = `Heard: ${transcript}`;

        //Output transcript confidence percentage
        confidenceOutput.textContent = `Confidence: ${confidence}%`;

    });

    //Restart speech recognition after user has finished talking
    recognition.addEventListener('end', recognition.start);

});