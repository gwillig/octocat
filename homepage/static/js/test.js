
//========= Also reco_name_2 wird 10 mal wiederholt
async function reco_name_2(resolve) {

    beep(100, 450, 200)
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
        beep(100, 450, 200)
        resolve()
    }, {once: true});
}
for (let i = 0, p = Promise.resolve(); i < 10; i++) {
    p = p.then(_ => new Promise(resolve =>{
     reco_name_2(resolve);
        }
    ));
}
//==================================== Widerhol 10 mal
async function speak_msg_without1(resolve,msg_to_speak)  {
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
        resolve();
    }, {once: true});
  };

function reco_name_2() {
  return new Promise((resolve, reject) => {
    beep(100, 450, 200)
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
        beep(100, 450, 200)
        resolve(name_person);
    }, {once: true});
})}
for (let i = 0, p = Promise.resolve(); i < 10; i++) {
    p = p.then(_ => new Promise(resolve =>{
            reco_name_2().then(
            result => {
                speak_msg_without1(resolve,`Heißst du ${result}`)
            }
        )
        }
    ));
}

//=======================================================00

async function speak_msg_without1(msg_to_speak,callback)  {
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
        callback()
    }, {once: true});
  };
function reco_word_2(reco_word,resolve2) {
  return new Promise((resolve, reject) => {
    beep(100, 450, 200)
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
        beep(100, 450, 200)
        if(reco_word.some(el => transcript_array.includes(el)))
        {
            resolve(true)
            condition_is_true=true
            resolve2()
        }
        else{
            condition_is_true=false
            resolve2()
        }
    }, {once: true})
})}
function reco_name_2() {
  return new Promise((resolve, reject) => {
    beep(100, 450, 200)
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
        beep(100, 450, 200)
        resolve(name_person);
    }, {once: true});
})}
condition_is_true=false
for (let i = 0, p = Promise.resolve(); i < 10; i++) {
    p = p.then(_ => new Promise(resolve =>{
            reco_name_2().then(
            result => {
                speak_msg_without1(`Heißst du ${result}`,test=>reco_word_2(["ja"],resolve));
                if(condition_is_true==true){throw 42}
            }
        )

        }
    ));
}


//===================
async function speak_msg(msg_to_speak,callback){
    return new Promise((resolve, reject) => {
    var synth = window.speechSynthesis;
    document.querySelector("#octocat").classList.remove("normal_cat")
    document.querySelector("#octocat").classList.add("sm_cat")
    let speech_bubble = document.querySelector("#speech");
    speech_bubble.classList.add("speech_hi")
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
    beep(100, 450, 200)
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
        beep(100, 450, 200)
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
    beep(100, 450, 200)
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
        beep(100, 450, 200)
        resolve(name_person);
    }, {once: true});
})}

function ask_name(msg_1){
condition_is_true=false;
name_person_global=""
speak_msg(msg_1)
.then(reco_name_2)
.then(name_person=>{;name_person_global=name_person;speak_msg(`Heißst du ${name_person}`)})
.then(result=>reco_word_2(["ja"]))
.then(result=>{
    if(condition_is_true==true){
        speak_msg(`Schön dich kennzulernen${name_person_global}`)
    }
    else
    {
     ask_name("wie heißt du?")
    }


})

}
ask_name("Mein Name ist Tom wie heißt du?")
//=================
function test() {
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
for (let i = 0, p = Promise.resolve(); i < 10; i++) {
    p = p.then(_ => new Promise(resolve =>
        setTimeout(function () {
            test = getRandomInt(3)
            console.log(test)
            if(test==2){throw 42}
            else{resolve()}
        }, Math.random() * 1000)
    ));
}

}
