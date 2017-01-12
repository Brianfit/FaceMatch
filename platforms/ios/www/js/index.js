// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

// Replay button not workind

//Add instruction screens: animated with Hype 5.

//add quit button



var Card = [] 

Card[0] = "images/vos.jpg"
Card[1] = "images/1File.jpg"
Card[2] = "images/2File.jpg"
Card[3] = "images/3File.jpg"
Card[4] = "images/4File.jpg"
Card[5] = "images/5File.jpg"
Card[6] = "images/6File.jpg"

var AudioName = []
AudioName[0] = "audio/Record-My-Name.aiff"
AudioName[1] = "audio/Record-My-Name-1.aiff"
AudioName[2] = "audio/Record-My-Name-2.aiff"
AudioName[3] = "audio/Record-My-Name-3.aiff"
AudioName[4] = "audio/Record-My-Name-4.aiff"
AudioName[5] = "audio/Record-My-Name-5.aiff"
AudioName[6] = "audio/Record-My-Name-6.aiff"


var PhotoNum;
var CardAudio;
var Tada = "audio/tada.mp3";


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
			playAudio(Tada);
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

		rechange: function(){
			this.hideModal();
			this.Setuppix();
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
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside"><div class="front" style="margin: 0 auto; padding-left: 5; padding-top: 10; background-color:#BA55D3;"><img src="'+ v.img +'"alt="'+ v.name +'" class="img-responsive" /></div><div class="back" style="margin: 0 auto; padding-left: 5; padding-top: 10; background-color:#BA55D3;"><img src="images/heart.png" alt="Heart" /><div id="audio" data-audiofile="'+ v.audio +'"></div></div></div></div>';
              
              
			
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
// $('.control').html('<input type="image" onclick="PlayGame()" src="images/play.png" style="height:50; width:50"></input><input type="image" onclick="SetupPix()" src="images/stop.png" style="height:50; width:50;"></input>');



};

function SetupPix() {
// $(".animsition").animsition({
//   inClass: "rotate-in",
//   outClass: "rotate-out"
// });
// LoadPixAudio();
$('.game').html('<div class="container" style="background-color:#BA55D3;"><div class="row"><div class="col-xs-6"><span class="pull-right"><a href="javascript:void(0)" class="Change1"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[1]+'"></a></span></div><div class="col-xs-6"><a href="javascript:void(0)" class="Change2"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[2]+'"></a></div></div><div class="row"><div class="col-xs-12" style="background-color:#ba55d3;"></div><div class="row"><div class="col-xs-6"><span class="pull-right"><a href="javascript:void(0)" class="Change3"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[3]+'"></a></span></div><div class="col-xs-6"><a href="javascript:void(0)" class="Change4"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[4]+'"></a></div></div><div class="row"><div class="col-xs-12" style="background-color:#ba55d3;"></div><div class="row"><div class="col-xs-6"><span class="pull-right"><a href="javascript:void(0)" class="Change5"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[5]+'"></a></span></div><div class="col-xs-6"><a href="javascript:void(0)" class="Change6"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[6]+'"></a></div></div></div><div class="row" style="background-color:#BA55D3;"><div class="col-xs-12" style="background-color:#ba55d3;"><div style="background-color:#BA55D3; text-align:center" class="center"> Touch a play tile to change the image to a photo of a pet or family member. You can take a photo or select an image from your library. Add an audio recording of the pet or family member\'s name. All set? Press the green play button. </div></div></div>');


// $('.control').html('<a href="javascript:void(0)" id="Play"><img src="images/play.png" height="50" width="50"></a>');

}


function ChangePhoto(PhotoNumber) {
PhotoNum = PhotoNumber;
// var SwapCard = 'images/'+PhotoNum+'File.jpg';
var SwapCard = Card[PhotoNum];
// var imgWidth = img.naturalWidth;
// console.log(imgWidth);
$('.game').html('<br /><div class="singlecard" style="width:200px; height:250px"><div class="inside"><div class="back" id="imgDiv"><img src="'+SwapCard+'" class="center"></a></div></div></div><br /><div class="row"><div class="col-md-6 col-md-offset-3" style="background-color:#BA55D3;"><div class="center"><button style="height:50px;width:100px" onclick="capturePhotoEdit();"><span class="icon-camera"></span></button><button style="height:50px;width:100px" onclick="captureLibraryEdit();"><span class="icon-picture"></span></button><button style="height:50px;width:100px"  onclick=" playAudio(AudioName[PhotoNum]);"><span class="icon-play"></span></button><button style="height:50px;width:100px"  onclick="CaptureAudio(PhotoNum);"><span class="icon-mic"></span></button><Button style="height:50px;width:100px"  onclick="SetupPix()"><span class="icon-to-start" style="z-index:0"></span></button></div></div></div>');

$('.control').html('<a href="javascript:void(0)" id="Play"><img src="images/play.png" height="50" width="50"></a>');



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
       //  SaveAudio(PhotoNumber,path);
        
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


       
// function SavePix(CardNumber,PixURL){
//                              window.localStorage.setItem('Pix-'+CardNumber,PixURL);                
// };
// 
// function SaveAudio(CardNumber,AudioURL){
//                              window.localStorage.setItem('Audio-'+CardNumber,AudioURL);
// };
// 
// function LoadPixAudio(){
// if (window.localStorage.length !== 0){
// var ticker = 6;
// console.log('ticker = '+ticker);
// 
// 
// for(var i = 0; i < ticker; i++){
// 
// var PixRef ='Pix-'+i;
// var AudioRef ='Audio='+i;
// var StoredPixURL = localStorage.getItem(PixRef);
// var StoredAudioURL = localStorage.getItem(AudioRef);
// Card[i] = StoredPixURL;
// console.log(StoredNumberNum+' url '+StoredPixURL);
// AudioName[i] = StoredPixURL;
// 
// }
// 
// };
// 
// };



// <div class="singlecard"><div class="inside"><div class="back">
// </div></div></div>
SetupPix();
//  PlayGame();



