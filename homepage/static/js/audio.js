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
       audioBlob = new Blob(audioChunks, { 'type' : 'audio/wav; codecs=MS_PCM' });
       audioUrl = URL.createObjectURL(audioBlob);
       audio = new Audio(audioUrl);
      audio.download = 'acetest.wav';
      audio.play();console.log(audio)
    });

    setTimeout(() => {
      mediaRecorder.stop();
    }, 3000);
  });