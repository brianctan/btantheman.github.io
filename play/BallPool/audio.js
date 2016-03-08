var ac, audio, stream, audioSrc, analyser;

function initAudio(){
  ac = new AudioContext();
  audio = document.createElement("audio");
  document.body.appendChild(audio);
  audio.autoplay = true;

  navigator.webkitGetUserMedia({audio: true}, function(s){
    console.log(s);
    stream = s;
    audio.src = s;
    //audio.src = window.URL.createObjectURL(stream);
  }, function(e){
    console.log(e);
  });


  audioSrc = ac.createMediaElementSource(audio);
  analyser = ac.createAnalyser();
  // we have to connect the MediaElementSource with the analyser
  audioSrc.connect(analyser);
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

  // frequencyBinCount tells you how many values you'll receive from the analyser
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);

  // we're ready to receive some data!
  // loop
  /*
  function renderFrame() {
     requestAnimationFrame(renderFrame);
     // update data in frequencyData
     analyser.getByteFrequencyData(frequencyData);
     // render frame based on values in frequencyData
     // console.log(frequencyData)
  }
  audio.start();
  renderFrame();
  */
}
