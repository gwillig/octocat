function show_predictions(data_array){
    /*
    Functions show the prediction for each value
    */
    //1.Step: find div_prediction
    let div_prediction = document.querySelector("#predictions ol");
    //2.Step: Delete old prediciton
    div_prediction.innerHTML = "";
    for(let key in data_array){
        let li_tag = document.createElement("li");
        li_tag.innerText = `${key}: ${data_array[key]}`;
        div_prediction.appendChild(li_tag)

    }
}

function delete_current_row(self_row){
    /*
    @description:
        Delete the current row
    @args:
       self_row (html-obj)
    */
    //1.Step: Set outherHTML to none
    self_row.parentElement.outerHTML="";
    }

function classify_audio(self){
    //1.Step: Get the parent element
    let parent = self.closest("li")
    //2.Step: Get the url blob
    let blob_url = parent.querySelector("a").href;
    //3.Step: Query data from url
    let blob = fetch(blob_url).then(r =>r.blob()).then(blobFile=>{
            //3.1.Step: Send blob data to db
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
                        show_predictions(data["prediction"])

                    });
        }
    );
};

function post_data_db(self){
    //1.Step: Get the parent element
    let parent = self.closest("li")
    //2.Step: Get the url blob
    let blob_url = parent.querySelector("a").href;
    //3.Step: Query data from url
    let ground_truth_text = parent.querySelector(".ground_truth").value;
    let blob = fetch(blob_url).then(r =>r.blob()).then(blobFile=>{
            //3.1.Step: Send blob data to db
            fetch("/recorded_audio",{
            mode: "cors",
            method: "post",
            body: blobFile,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "ground-truth": ground_truth_text
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
        }
    );
};
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
define_recoder_obj().then(recorder=>{
    beep(100, 450, 200)
    recorder.start()
    setTimeout(function(){
        recorder.stop();
        beep(100, 450, 200)
    }, 3000);
})
//===============================================================

  window.addEventListener('DOMContentLoaded', () => {
    const getMic = document.getElementById('mic');
    const recordButton = document.getElementById('record');
    const list = document.getElementById('recordings');
    if ('MediaRecorder' in window) {
      getMic.addEventListener('click', async () => {
        getMic.setAttribute('hidden', 'hidden');
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
          });
          const mimeType = 'audio/wav';
          let chunks = [];
          const recorder = new MediaRecorder(stream, { type: mimeType });
          recorder.addEventListener('dataavailable', event => {
            if (typeof event.data === 'undefined') return;
            if (event.data.size === 0) return;
            console.log(event.data)
            chunks.push(event.data);

          });
          recorder.addEventListener('stop', () => {
            const recording = new Blob(chunks, {
              type: mimeType
            });
            console.log(recording)
            renderRecording(recording, list);
            chunks = [];
          });
          recordButton.removeAttribute('hidden');
          recordButton.addEventListener('click', () => {
            if (recorder.state === 'inactive') {
              recorder.start();
              recordButton.innerText = 'Stop';
            } else {
              recorder.stop();
              recordButton.innerText = 'Record';
            }
          });
        } catch {
          MicroError(
            'You denied access to the microphone so this demo will not work.'
          );
        }
      });
    } else {
      MicroError(
        "Sorry, your browser doesn't support the MediaRecorder API, so this demo will not work."
      );
    }
  });

function MicroError(message) {
    /*
    @description:
        sets the innerText of the p tag to display an error msg
    @args:
        message(str)

    */
    const main = document.querySelector('main');
    main.innerHTML = `<div class="error"><p>${message}</p></div>`;
    }

function create_audio_tag(self,blob){
  /*
  @description:
    Create an audio tag based on a blob
  @args:
    blob(Blob)
  */
    //1.Step: Create the URL source for the audio tag
    const blobUrl = URL.createObjectURL(blob);
    self.setAttribute('src', blobUrl);
  }
function renderRecording(blob, list) {
    const blobUrl = URL.createObjectURL(blob);
    const li = document.createElement('li');
    const audio = document.createElement('audio');
    const anchor = document.createElement('a');
    const fetch_btn = document.createElement('button');
    const classify_audio_btn = document.createElement('button');
    const ground_truth = document.createElement('input');
    ground_truth.classList.add("ground_truth")
    const blob_data = document.createElement('p');
    const delete_p = document.createElement('p');
    delete_p.innerHTML = "&#10060";
    delete_p.onclick = function(){delete_current_row(this)};
    blob_data.value = blob;
    ground_truth.value= document.querySelector("#ground_truth").value;
    fetch_btn.innerText="Post db";
    fetch_btn.onclick = function() { post_data_db(this) };
    classify_audio_btn.innerText="Predict";
    classify_audio_btn.onclick = function() { classify_audio(this) };
    anchor.setAttribute('href', blobUrl);
    const now = new Date();

    audio.setAttribute('src', blobUrl);
    audio.setAttribute('controls', 'controls');
    li.appendChild(audio);
    li.appendChild(fetch_btn);
    li.appendChild(classify_audio_btn);
    li.appendChild(ground_truth);
    li.appendChild(delete_p);
    li.appendChild(anchor);
    list.appendChild(li);
  }