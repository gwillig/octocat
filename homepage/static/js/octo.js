
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
