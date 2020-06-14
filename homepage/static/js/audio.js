
//###########################
//===============================================================
function showError(msg){
  /*
  Functions shows error
  @args:
    msg(str)
  */
  let p_tag = document.querySelector(".confidence-output");
  p_tag.innerText = msg;
  p_tag.style.color="red";
  p_tag.style.fontSize="70px";
}
function check_microphone(){
    /*
    Check if browser suppoert MeidaRecorder API
    */
    if ('MediaRecorder' in window) {
        return true
      // everything is good, let's go ahead
    } else {
      showError("Sorry, your browser doesn't support the MediaRecorder API, so this demo will not work.");
      return false
    }
}
function create_audio_tag(blob){

//    let tag_div = document.querySelector(".speech_reco");
    let tag_div = document.querySelector("body");
    const blobUrl = URL.createObjectURL(blob);
    const li = document.createElement('li');
    const audio = document.createElement('audio');
    audio.setAttribute('src', blobUrl);
    audio.setAttribute('controls', 'controls');
    li.appendChild(audio);
    tag_div.appendChild(li)
}
async function define_recoder_obj(){
    /**/
    let recorder="none";
    //1.Step: start recording
    //1.1.Step: Check if browser allow recording
    if(check_microphone()==true){
        //1.2.Step: Check if microphone has the permission
         try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });

            //1.2.1.Step: Define recoder object
            mimeType = 'audio/wav';
            let chunks = [];
            recorder = new MediaRecorder(stream, { type: mimeType });
            //1.2.2.Step: Define behaviour of recoder object when data is available
            recorder.addEventListener('dataavailable', event => {
                if (typeof event.data === 'undefined') return;
                if (event.data.size === 0) return;
                chunks.push(event.data);
            });
            //1.2.3.Step: Define behaviour of recoder object when stop event happen
            recorder.addEventListener('stop', () => {
                const recording = new Blob(chunks, {
                type: mimeType
                });
                create_audio_tag(recording)
                chunks = [];
                classify_audio(recording)

            });
            //1.2.1.Step: Stop recording  after 2 secs
            //setTimeout(function(){ recorder.stop(); }, 2000);

            return recorder
         }
         catch {
              showError('You denied access to the microphone, it will not work.');
         }

        //2.Step: Stop recording after 2 secs
        //3.Step: Send recording
    }

}
function click_microphone(){
    let btn_click_microphone = document.querySelector(".microphone");
    btn_click_microphone.style.backgroundColor="red"
    define_recoder_obj().then(recorder=>{
        beep(100, 450, 200)
        recorder.start()
        setTimeout(function(){
            recorder.stop();
            beep(100, 450, 200)
            btn_click_microphone.style.backgroundColor="#a6b7cc";
        }, 3000);
    })
}
function beep(vol, freq, duration){
    /*
    Function creates a beep sound!
    @args:
    beep(100, 450, 200)
     - vol (int)
     - freq (int)
     - duration (int)
    */
  a=new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em
  v=a.createOscillator()
  u=a.createGain()
  v.connect(u)
  v.frequency.value=freq
  v.type="sin"
  u.connect(a.destination)
  u.gain.value=vol*0.01
  v.start(a.currentTime)
  v.stop(a.currentTime+duration*0.001)
}
//===============================================================

function classify_audio(blobFile){
    //1.Step: Get the parent element
    fetch("/classify_audio",{
    mode: "cors",
    method: "post",
    body: blobFile,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },})
          .then(function(response){
                    //Check status code
                    if(response.ok==false){
                        //
                        return response.text()
                    }
                    else{

                       return response.json()
                    }
          }).then((data) => {
                console.log(data["prediction"])

            });
};
/*


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
*/