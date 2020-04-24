
// Greeting is a global varible and ensure that the greeting only happen once
 var greeting = 0;

function speak_msg(msg_to_speak){
   /*
   let the cat say some words
   */
    var msg = new SpeechSynthesisUtterance('meow meow');
        msg.volume = 1
        msg.rate = 1.5
        msg.pitch = 2
        msg.lang = 'de-D'
        window.speechSynthesis.speak(msg);
    var msg = new SpeechSynthesisUtterance(msg_to_speak);
        msg.volume = 1
        msg.rate = 1.0
        msg.pitch = 2
        msg.lang = 'de-D'
    window.speechSynthesis.speak(msg);
}

function greeting_visitor(){
    /*
    Function to greet the visitor. After the first click he will not longer introduce himself
    */
    document.querySelector("#octocat").classList.remove("normal_cat")
    document.querySelector("#octocat").classList.add("sm_cat")
    let speech_bubble = document.querySelector("#speech");
    // Set a promise because the bubble speech should disappear after he is finish
    let condition_Promise = new Promise((resolve, reject) => {

    if (greeting==0) {
        speech_bubble.classList.add("speech_hi")
        var msg = new SpeechSynthesisUtterance('meow meow');
            msg.volume = 1
            msg.rate = 1.5
            msg.pitch = 2
            msg.lang = 'de-D'
        window.speechSynthesis.speak(msg);
        var msg = new SpeechSynthesisUtterance('mein Name ist Tom. Wie heißt du?');
            msg.volume = 1
            msg.rate = 1.0
            msg.pitch = 2
            msg.lang = 'de-D'
        window.speechSynthesis.speak(msg);
        greeting=3
        time_show_msg = 2000

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
     speech_recog(say_name_visitor)
  }, time_show_msg)

    )

}



function say_name_visitor(reco_msg){
    /*
    Function to greet the visitor. After the first click he will not longer introduce himself
    */
    document.querySelector("#octocat").classList.remove("normal_cat")
    document.querySelector("#octocat").classList.add("sm_cat")
    let speech_bubble = document.querySelector("#speech");
    // Set a promise because the bubble speech should disappear after he is finish
    let condition_Promise = new Promise((resolve, reject) => {

    //1. Greet a new person
    //1.1.Step: Check if msg contains name
    //First Case: "Ich heiße Max "
    let name_person;
    //1.2.Step. Convert string to array
    let msg_array = reco_msg.split(" ")
    if (msg_array.length>=3) {
        name_person = msg_array[msg_array.length-1];
      }
      else{
        name_person = msg_array[0]
      }
    //2.Step: Check if person is known

    var conditions =["svenja","sv",person_name]
    if(conditions.some(el => name_person.includes(el)))
    {
          speech_bubble.classList.add("speech_heart")
            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 10
                msg.rate = 1.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

           msg = new SpeechSynthesisUtterance(`Schoen dich wiederzusehen ${name_person}`);
                msg.volume = 1
                msg.rate = 0.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);
          greeting = 2;

          time_show_msg = 3000
    }
    else{
        speech_bubble.classList.add("speech_hi")
    var msg = new SpeechSynthesisUtterance('meow meow');
        msg.volume = 1
        msg.rate = 1.5
        msg.pitch = 2
        msg.lang = 'de-D'
    window.speechSynthesis.speak(msg);
    var msg = new SpeechSynthesisUtterance(`Hallo ${name_person}, schon dich kennenzulernen`);
        msg.volume = 1
        msg.rate = 1.0
        msg.pitch = 2
        msg.lang = 'de-D'
    window.speechSynthesis.speak(msg);
    greeting=3
    time_show_msg = 6000
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
 function smiling_cat(name_person){

    document.querySelector("#octocat").classList.remove("normal_cat")
    document.querySelector("#octocat").classList.add("sm_cat")
    let speech_bubble = document.querySelector("#speech");
    let time_show_msg=0;
    let condition_Promise = new Promise((resolve, reject) => {
      if (greeting==3) {
            speech_bubble.classList.add("speech_heart")
            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 10
                msg.rate = 1.5
                msg.pitch = 2

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
      else if (greeting==0) {
        speech_bubble.classList.add("speech_hi")
        var msg = new SpeechSynthesisUtterance('meow meow');
            msg.volume = 1
            msg.rate = 1.5
            msg.pitch = 2
            msg.lang = 'de-D'
        window.speechSynthesis.speak(msg);
        var msg = new SpeechSynthesisUtterance('mein Name ist Tom. Wie heißt du?');
            msg.volume = 1
            msg.rate = 1.0
            msg.pitch = 2
            msg.lang = 'de-D'
        window.speechSynthesis.speak(msg);
        greeting=3
        time_show_msg = 6000
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
function speech_reco(){
    window.addEventListener("DOMContentLoaded",	() => {

    //Check that page is not running in a CodePen preview iframe

    //Set speech recognition
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    var recognition = new SpeechRecognition(),
           heardOutput = document.querySelector('.heard-output'),
          confidenceOutput = document.querySelector('.confidence-output')
     //Start speech recognition
     recognition.lang="de-DE"
     window.SpeechRecognition.lang ="de-DE"

    recognition.start();

    //Listen for when the user finishes talking
    recognition.addEventListener('result', e => {

        //Get transcript of user speech & confidence percentage
        const transcript = e.results[0][0].transcript.toLowerCase().replace(/\s/g, ''),
              confidence = (e.results[0][0].confidence * 100).toFixed(1);

        var rec_word = transcript
        var conditions =["svenja","sv"]
    if (conditions.some(el => transcript.includes(el))) {

            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 1
                msg.rate = 1.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

          msg = new SpeechSynthesisUtterance("Alles Gute zum Geburtstag");
                msg.volume = 1
                msg.rate = 0.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);
          greeting = 2;
      }
    if (transcript.includes("x10")) {
            var img_tag = document.querySelector(".present")
            img_tag.src="/static/css/mond.jpg"
            img_tag.style.display="block";
            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 1
                msg.rate = 1.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

          msg = new SpeechSynthesisUtterance("Herzlichen Glückwunsch zur Kette");
                msg.volume = 1
                msg.rate = 0.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

      }
    if (transcript.includes("x11")) {
            var img_tag = document.querySelector(".present")
            img_tag.src="/static/css/uhr.jpg"
            img_tag.style.display="block"
            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 1
                msg.rate = 1.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

          msg = new SpeechSynthesisUtterance("Herzlichen Glückwunsch zur Uhr");
                msg.volume = 1
                msg.rate = 0.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);
          greeting = 2;
      }
    if (transcript.includes("x12")) {
            var img_tag = document.querySelector(".present")
            img_tag.src="/static/css/herz.jpg"
            img_tag.style.display="block"
            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 1
                msg.rate = 1.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

          msg = new SpeechSynthesisUtterance("Herzlichen Glückwunsch zur Kette");
                msg.volume = 1
                msg.rate = 0.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);
          greeting = 2;
      }
    if (transcript.includes("x13")) {
            var img_tag = document.querySelector(".present")
            img_tag.src="/static/css/band.jpg"
            img_tag.style.display="block"
            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 1
                msg.rate = 1.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

          msg = new SpeechSynthesisUtterance("Herzlichen Glückwunsch zur Armbändern");
                msg.volume = 1
                msg.rate = 0.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);
          greeting = 2;
      }
    if (transcript.includes("x14")) {
            var img_tag = document.querySelector(".present")
            img_tag.src="/static/css/bild.jpg"
            img_tag.style.display="block"
            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 1
                msg.rate = 1.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

          msg = new SpeechSynthesisUtterance("Herzlichen Glückwunsch zur bilderrahmen");
                msg.volume = 1
                msg.rate = 0.5
                msg.pitch = 2
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);
          greeting = 2;
      }
        //Output transcript

        heardOutput.textContent = `Heard: ${transcript}`;

        //Output transcript confidence percentage
        confidenceOutput.textContent = `Confidence: ${confidence}%`;

    });

    //Restart speech recognition after user has finished talking
    recognition.addEventListener('end', recognition.start);

});
}

function talking_cat1(msg,reco_string){

    document.querySelector("#octocat").classList.remove("normal_cat")
    document.querySelector("#octocat").classList.add("sm_cat")
    let speech_bubble = document.querySelector("#speech");
    let time_show_msg=0;
    let condition_Promise = new Promise((resolve, reject) => {
      if (greeting==10) {
            speech_bubble.classList.add("speech_heart")
            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 10
                msg.rate = 1.5
                msg.pitch = 2

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

function speech_recog(function_output){
    /*
    Function to detect speech
    @args:
        function_output: function which process the output
    @return:
        Returns a string which contains the detected words
    */
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    var recognition = new SpeechRecognition(),
        heardOutput = document.querySelector('.heard-output'),
        confidenceOutput = document.querySelector('.confidence-output')
     //Start speech recognition
     recognition.lang="de-DE"
     window.SpeechRecognition.lang ="de-DE"

    recognition.start();

    //Listen for when the user finishes talking
    let transcript,confidence
    return recognition.addEventListener('result', e => {

        //Get transcript of user speech & confidence percentage
         transcript = e.results[0][0].transcript.toLowerCase()
         confidence = (e.results[0][0].confidence * 100).toFixed(1);

         // Shows the reco words and confidence percentage on the screen
        heardOutput.textContent = `Heard: ${transcript}`;
        confidenceOutput.textContent = `Confidence: ${confidence}%`;
        function_output(transcript);


        })



    }

