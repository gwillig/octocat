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

                               console.log(response.text())
                            }
                  })
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

  //===================================================
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