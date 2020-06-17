
// Greeting is a global varible and ensure that the greeting only happen once
 var greeting = 0;
function forwarding_learning(){

    let new_address = window.location.href.split("/home")[0]+"/audio"
    window.location.href = new_address;
}



//==================================================================================00
async function speak_msg(msg_to_speak,cat_img,callback){
    return new Promise((resolve, reject) => {
    var synth = window.speechSynthesis;
    document.querySelector("#octocat").classList.remove("normal_cat")
    document.querySelector("#octocat").classList.add("sm_cat")
    let speech_bubble = document.querySelector("#speech");
    speech_bubble.classList.add(cat_img)
    var msg1 = new SpeechSynthesisUtterance('meow meow');
        msg1.volume = 1
        msg1.rate = 1.5
        msg1.pitch = 2
        msg1.lang = 'de-D'
    synth.speak(msg1);
    var msg2 = new SpeechSynthesisUtterance(msg_to_speak);
        msg2.volume = 1
        msg2.rate = 1.0
        msg2.pitch = 2
        msg2.lang = 'de-D'

    synth.speak(msg2);
    msg2.addEventListener('end', function (e) {
        document.querySelector("#octocat").classList.add("normal_cat");
        document.querySelector("#octocat").classList.remove("sm_cat");
        speech_bubble.querySelector("span").innerHTML="";
        speech_bubble.classList=""
        resolve()
        if (callback !== undefined) {
            callback()

        }
    }, {once: true});
  })};
function reco_word_2(reco_word) {
  return new Promise((resolve, reject) => {
    //Test if mobile, if not make a beep
    let ua = navigator.userAgent;
    if(ua.includes("Mobile")!=false){
        beep(100, 450, 200)
    }

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
   recognition.addEventListener('result',function(e) {

        //Get transcript of user speech & confidence percentage
         transcript = e.results[0][0].transcript.toLowerCase()
         confidence = (e.results[0][0].confidence * 100).toFixed(1);
        //Convert transcript string to array
        transcript_array = transcript.split(" ");
         //Get the last word
         name_person = transcript_array[transcript_array.length-1]
         // Shows the reco words and confidence percentage on the screen
         heardOutput.textContent = `Heard: ${name_person}`;
        confidenceOutput.textContent = `Confidence: ${confidence}%`;
        if(ua.includes("Mobile")!=false){
            beep(100, 450, 200)
        }
        if(reco_word.some(el => transcript_array.includes(el)))
        {
            console.log("word erkannt")
            condition_is_true=true
            resolve()
        }
        else{
        console.log("Name false")
            condition_is_true=false
            resolve()
        }
    }, {once: true})
})}
function reco_name_2() {
  return new Promise((resolve, reject) => {
    if(ua.includes("Mobile")!=false){
        beep(100, 450, 200)
    }
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
   recognition.addEventListener('result',function(e) {

        //Get transcript of user speech & confidence percentage
         transcript = e.results[0][0].transcript.toLowerCase()
         confidence = (e.results[0][0].confidence * 100).toFixed(1);
        //Convert transcript string to array
        transcript_array = transcript.split(" ");
         //Get the last word
         name_person = transcript_array[transcript_array.length-1]
         // Shows the reco words and confidence percentage on the screen
         heardOutput.textContent = `Heard: ${name_person}`;
        confidenceOutput.textContent = `Confidence: ${confidence}%`;
        if(ua.includes("Mobile")!=false){
            beep(100, 450, 200)
        }
        resolve(name_person);
    }, {once: true});
})}

function ask_name(msg_1){
    /*
    Asks a person for his name. If person conforms that name is correct it tests if person is
    in db. If person is in db Tom greets the person
    */
condition_is_true=false;
name_person_global=""
speak_msg(msg_1,"speech_hi")
.then(reco_name_2)
.then(name_person=>{
                    name_person_global = name_person;
                    speak_msg(`Heißst du ${name_person}`,"speech_hi");
                    })
.then(result=>reco_word_2(["ja"]))
.then(result=>{
    if(condition_is_true==true){
        fetch(`/person/${name_person_global}`).then(response => response.json())
             .then(data =>{
                if(data.name_person=="unkown"){

                    speak_msg(`Schön dich kennzulernen ${name_person_global}`,"speech_hi");
                    greeting=1
                }
                else{
                    speak_msg(`Schön dich wiederzusehen ${name_person_global}`,"speech_heart");
                    greeting=1
                }
             } );

    }
    else
    {
     ask_name("wie heißt du?")
    }


})

}

function tom_reaction(){

    if (greeting==0) {
        ask_name("Mein Name ist Tom wie heißt du?")

    }

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
   recognition.addEventListener('result', e => {

    //Get transcript of user speech & confidence percentage
     transcript = e.results[0][0].transcript.toLowerCase()
     confidence = (e.results[0][0].confidence * 100).toFixed(1);

     // Shows the reco words and confidence percentage on the screen
    heardOutput.textContent = `Heard: ${transcript}`;
    confidenceOutput.textContent = `Confidence: ${confidence}%`;

    })
    recognition.addEventListener('end', recognition.start);
    var refreshId = setInterval(function() {
      console.log(1)
      recognition.addEventListener('end', recognition.start);
      if (transcript!=null) {
        recognition.removeEventListener('end', recognition.start);
        clearInterval(refreshId);
        function_output(transcript);

      }
    }, 1000);



    }

/*
//====================================================
greeting=0
let condition_is_true=false;
function speak_msg_without1(msg_to_speak) {
  return new Promise((resolve, reject) => {

      var synth = window.speechSynthesis;
    document.querySelector("#octocat").classList.remove("normal_cat")
    document.querySelector("#octocat").classList.add("sm_cat")
    let speech_bubble = document.querySelector("#speech");
    if (greeting==0) {
    speech_bubble.classList.add("speech_hi")
    var msg1 = new SpeechSynthesisUtterance('meow meow');
        msg1.volume = 1
        msg1.rate = 1.5
        msg1.pitch = 2
        msg1.lang = 'de-D'
    synth.speak(msg1);
    var msg2 = new SpeechSynthesisUtterance('mein Name ist Tom. Wie heißt du?');
        msg2.volume = 1
        msg2.rate = 1.0
        msg2.pitch = 2
        msg2.lang = 'de-D'
    greeting=3

    }else{
      var msg1 = new SpeechSynthesisUtterance('meow meow');
        msg1.volume = 1
        msg1.rate = 1.5
        msg1.pitch = 2
        msg1.lang = 'de-D'
    synth.speak(msg1);
    var msg2 = new SpeechSynthesisUtterance(msg_to_speak);
        msg2.volume = 1
        msg2.rate = 1.0
        msg2.pitch = 2
        msg2.lang = 'de-D'
    }
    synth.speak(msg2);
    msg2.addEventListener('end', function (e) {
        document.querySelector("#octocat").classList.add("normal_cat");
        document.querySelector("#octocat").classList.remove("sm_cat");
        speech_bubble.querySelector("span").innerHTML="";
        speech_bubble.classList=""
        resolve("ok");
    }, {once: true});
  });
}
*/