$(document).ready(function(){
  var width = 320, height = 0;
  var streaming = false;
  
  navigator.getMedia = ( navigator.getUserMedia || navigator.webketGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );

  navigator.getMedia({ 
    video: true, 
    audio: false 
  },
  function(stream){
    if(navigator.mozGetUserMedia){
      $('#video').attr('mozSrcObject', stream);
    } else {
      //var vendorURL = window.URL || window.webkitURL;
			//var vendorURL = window.URL;
      //var src = vendorURL.createObjectURL(stream);
      //$('#video').attr('src', src);
			$('#video')[0].srcObject = stream;
    }
    $('#video')[0].play();
  },
  function(err){
    console.log('Error occured! ' + err);
  });

  //clear photo
  var clearphoto = function(){
    var context = $('#canvas')[0].getContext('2d');
    var canvas = $('#canvas')[0];
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    $('#photo').attr('src', data);
  };

  var takepicture = function(){
    var context = $('#canvas')[0].getContext('2d');
    var canvas = $('#canvas')[0];
    if(width && height){
      canvas.width = width;
      canvas.height = height;
      context.drawImage($('#video')[0], 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      $('#photo').attr('src', data);
    } else {
      clearphoto();
    }
  };

  $('#video').on('canplay', function(ev){
    var video = $('#video')[0];
    if(!streaming){
      height = video.videoHeight / (video.videoWidth/width);
      if(isNaN(height)){
        height = width * 3 / 4;
      }
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  });
  $('#startbutton').on('click', function(ev){
    takepicture();
    //ev.preventDefault();
  });
  clearphoto();

});
