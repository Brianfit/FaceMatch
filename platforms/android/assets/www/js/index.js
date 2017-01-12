// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

var Card = [] 

Card[0] = "images/vos.jpg"
Card[1] = "images/1File.jpg"
Card[2] = "images/2File.jpg"
Card[3] = "images/3File.jpg"
Card[4] = "images/4File.jpg"
Card[5] = "images/5File.jpg"
Card[6] = "images/6File.jpg"

var AudioName = []
AudioName[0] = "audio/Record-My-Name-0.wav"
AudioName[1] = "audio/Record-My-Name-1.wav"
AudioName[2] = "audio/Record-My-Name-2.wav"
AudioName[3] = "audio/Record-My-Name-3.wav"
AudioName[4] = "audio/Record-My-Name-4.wav"
AudioName[5] = "audio/Record-My-Name-5.wav"
AudioName[6] = "audio/Record-My-Name-6.wav"


var PhotoNum;
var CardAudio;


function PlayGame(){

	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			///So you'll call THIS: When it's time to play the game.
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.binding();
			this.paused = false;
     	    this.guess = null;
		},
		
		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				var AudioElement = $("#audio");
              CardAudio = AudioElement.data("audiofile");
					
					console.log(AudioName[$(this).attr("data-id")]); 
			 	    playAudio(AudioName[$(this).attr("data-id")]);
				
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
			playAudio(audio/tada.mp3);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");	
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside"><div class="front" style="margin: 0 auto; padding-left: 5; padding-top: 10; background-color:#FF6296;"><img src="'+ v.img +'"alt="'+ v.name +'" /></div><div class="back" style="margin: 0 auto; padding-left: 5; padding-top: 10; background-color:#FF6296;"><img src="images/heart.png" alt="Heart" /><div id="audio" data-audiofile="'+ v.audio +'"></div></div></div></div>';
              
              
			
			});
			return frag;
		}
	};
	
	

	var cards = [
		{
			name: "Image1",
			img: Card[1],
			id: 1,
			audio: AudioName[1]
		},
		{
			name: "Image2",
			img: Card[2],
			id: 2,
			audio: AudioName[2]

		},		
		{
			name: "Image3",
			img: Card[3],
			id: 3,
			audio: AudioName[3]
		},
		{
			name: "Image4",
			img: Card[4],
			id: 4,
			audio: AudioName[4]
		},
		{
			name: "Image5",
			img: Card[5],
			id: 5,
			audio: AudioName[5]
		}, 
		{
			name: "Image6",
			img: Card[6],
			id: 6,
			audio: AudioName[6]
		},

	];
    
	Memory.init(cards);


};

function SetupPix() {
// $(".animsition").animsition({
//   inClass: "rotate-in",
//   outClass: "rotate-out"
// });
$('.game').html('<br /><br /><br /><h1 style="font-family: Chewy;"></h1><br /><div class="card"><div class="inside"><div class="back" style="margin: 0 auto; padding-left: 5; padding-top: 10; background-color:#FF6296;"><a href="javascript:void(0)" class="Change1"><img src="'+Card[1]+'"></a></div></div></div><div class="card"><div class="inside"><div class="back" style="margin: 0 auto; padding-left: 5; padding-top: 10; background-color:#FF6296;"><a href="javascript:void(0)" class="Change2"><img src="'+Card[2]+'"></a></div></div></div><div class="card"><div class="inside"><div class="back" style="margin: 0 auto; padding-left: 5; padding-top: 10; background-color:#FF6296;"><a href="javascript:void(0)" class="Change3"><img src="'+Card[3]+'"></a></div></div></div><div class="card"><div class="inside"><div class="back" style="margin: 0 auto; padding-left: 5; padding-top: 10; background-color:#FF6296;"><a href="javascript:void(0)" class="Change4"><img src="'+Card[4]+'"></a></div></div></div><div class="card"><div class="inside"><div class="back" style="margin: 0 auto; padding-left: 5; padding-top: 10; background-color:#FF6296;"><a href="javascript:void(0)" class="Change5"><img src="'+Card[5]+'"></a></div></div></div><div class="card"><div class="inside"><div class="back" style="margin: 0 auto; padding-left: 5; padding-top: 10; background-color:#FF6296;"><a href="javascript:void(0)" class="Change6"><img src="'+Card[6]+'"></a></div></div></div><br /><br /><br /><br /><div class="center"><a href="javascript:void(0)" id="Play"><img src="images/play-button.png" height="100" width="100"></a></div>');
console.log('Setuppix');


}

function ChangePhoto(PhotoNumber) {
PhotoNum = PhotoNumber;
// var SwapCard = 'images/'+PhotoNum+'File.jpg';
var SwapCard = Card[PhotoNum];
// var imgWidth = img.naturalWidth;
// console.log(imgWidth);
$('.game').html('<br /><div class="singlecard" style="width:200px; height:250px"><div class="inside"><div class="back" id="imgDiv"><img src="'+SwapCard+'" class="center"></a></div></div></div><br /><br /><br /><br /><div class="row"><div class="col-md-6 col-md-offset-3" style="background-color:#DEDCE9;"><div class="center"><button style="height:50px;width:100px" onclick="capturePhotoEdit();"><span class="icon-camera"></span></button><button style="height:50px;width:100px" ><span class="icon-picture"></span></button></button><button style="height:50px;width:100px"  onclick=" playAudio(AudioName[PhotoNum]);"><span class="icon-play"></span></button><button style="height:50px;width:100px"  onclick="CaptureAudio(PhotoNum);"><span class="icon-mic"></span></button><Button style="height:50px;width:100px"  onclick="SetupPix()"><span class="icon-to-start"></span></button></div></div></div>').animsition('in');


}

function CaptureAudio(PhotoNumber) {
// capture callback
var captureSuccess = function(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        console.log(path);
        playAudio(path);
        AudioName[PhotoNumber] = path;
        
        // do something interesting with the file
    }
};

// capture error callback
var captureError = function(error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
};

// start audio capture
navigator.device.capture.captureAudio(captureSuccess, captureError);

}

function playAudio(url) {
    // Play the audio file at url
    var my_media = new Media(url,
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );
    // Play audio
    my_media.play();
//     my_media.stop();
//     my_media.release();
}


// <div class="singlecard"><div class="inside"><div class="back">
// </div></div></div>
SetupPix();
//  PlayGame();



