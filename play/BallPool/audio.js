var ac, audio;

function initAudio(){
  ac = new AudioContext();
  audio = document.createElement("audio");
  document.body.appendChild(audio);
  audio.autoplay = true;

  navigator.webkitGetUserMedia({audio: true}, function(stream){
    audio.src = stream;
    //audio.src = window.URL.createObjectURL(stream);
  }, function(e){
    console.log(e);
  });


  var audioSrc = ac.createMediaElementSource(audio);
  var analyser = ac.createAnalyser();
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
