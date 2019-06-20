function openStream(){
    const config  = { audio:true, video: false};
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream ){
    // var audio = $('<audio autoplay />').appendTo('body');
    var audio = document.getElementById('remoteAudio');
    audio.srcObject = stream;
    audio.play();
    // audio.src = (URL || webkitURL || mozURL).createObjectURL(stream);
    // const video =  document.getElementById(idVideoTag);
    // audio[0].sc
    // video.srcObject = stream;
    // video.play();
}

// openStream().then(stream=>{
//    playStream( 'localStream',stream);
// });

var peer = new Peer({key: 'lwjd5qra825777'});

console.log('connect peer');

peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    $('#mypeer').append(id);
});

$("#btnCall").click(function(){
    const id = $('#remoteId').val();
    openStream().then(stream=>{
        playStream('localStream',stream);
        const call = peer.call(id,stream);
        call.on('stream', remoteStream=>{ playStream('remoteStream', remoteStream)})
    });
});

peer.on('call',call=>{
    openStream().then(stream =>{
        console.log(peer);
        call.answer(stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
        // playStream('localStream', remoteStream => playStream('remoteStream', remoteStream));
    })
});