
// Greeting is a global varible and ensure that the greeting only happen once
 var greeting = 0;


 function smiling_cat(){
      let speech_bubble = document.querySelector("#speech");
      if (greeting==0) {
            speech_bubble.classList.add("speech_heart")
            let msg_pitch = getRandomInt(3)
            var msg = new SpeechSynthesisUtterance('meow meow  meow  meow');
                msg.volume = 1
                msg.rate = 1.5
                msg.pitch = msg_pitch
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);

           msg = new SpeechSynthesisUtterance('Sfenjaa');
                msg.volume = 1
                msg.rate = 0.5
                msg.pitch = msg_pitch
                msg.lang = 'de-D'
          window.speechSynthesis.speak(msg);
          greeting = 1;
      }
      else {
        speech_bubble.classList.add("speech_hi")
        let msg_pitch = getRandomInt(3)
        var msg = new SpeechSynthesisUtterance('meow meow');
            msg.volume = 1
            msg.rate = 1.5
            msg.pitch = msg_pitch
            msg.lang = 'de-D'
        window.speechSynthesis.speak(msg);
      }





  document.querySelector("#octocat").classList.remove("normal_cat")
  document.querySelector("#octocat").classList.add("sm_cat")
  setTimeout(function(){

     document.querySelector("#octocat").classList.add("normal_cat")
     document.querySelector("#octocat").classList.remove("sm_cat")
     speech_bubble.classList=""

  }, 6000);
 }

 function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}