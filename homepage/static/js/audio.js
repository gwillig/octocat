var audioChunks,audioBlob,audio
navigator.mediaDevices.getUserMedia({ audio: true})
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    const audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
       audioBlob = new Blob(audioChunks, { 'type' : 'audio/wav; codecs=0' });
       audioUrl = URL.createObjectURL(audioBlob);
       audio = new Audio(audioUrl);
      audio.download = 'acetest.wav';
      audio.play();console.log(audio)
    });

    setTimeout(() => {
      mediaRecorder.stop();
    }, 3000);
  });
//###########################

fetch("/recorded_audio",{
mode: "cors",
method: "post",
body: temp1,
headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },})
      .then(function(response){
                //Check status code
                if(response.ok==false){
                    //
                    return response.text()
                }
                else{

                   return "Items successfuly posted to database"
                }
            })