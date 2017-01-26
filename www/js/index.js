// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

//GET THE REPLAY BUTTON WORKIONG ON WIN SCREEN
//Stop initial help screen showing more than once. x
//Figure out why audio not storing / retrieving
//Fix error message on successful audio record
//Fix thumbnail inaccuraccy on image change
//Add array of animated applause screens --- different one every time! x
//PLIST: remove landscape modes
//Add permission strings for mic and images




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
var FirstRun = true;
var AudioFinished = false;



// window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
// 
//     console.log('file system open: ' + fs.name);
//     fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {
// 
//         console.log("fileEntry is file?" + fileEntry.isFile.toString());
//         // fileEntry.name == 'someFile.txt'
//         // fileEntry.fullPath == '/someFile.txt'
//         writeFile(fileEntry, null);
// 
//     }, onErrorCreateFile);
// 
// }, onErrorLoadFs);


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
              
              
              if( AudioName[$(this).attr("data-id")] !== null && typeof AudioName[$(this).attr("data-id")] === 'object'){ srcfile = AudioName[$(this).attr("data-id")].toInternalURL(); 
             //  console.log('Object Audio: '+srcfile); 
			 	    playAudio(srcfile);
			 	    asyncLoop(10, function(loop) {
    someFunction(1, 2, function(result) {

        // log the iteration
//         console.log(loop.iteration());

        // Okay, for cycle could continue
        loop.next();
    })},
    function(){// console.log('cycle ended')
    }
);

			 	    
			 	    
			 	    AudioFinished == false;
              
              } else 
              if ( AudioName[$(this).attr("data-id")] !== null ) {
               locationstring = AudioName[$(this).attr("data-id")];
//               console.log('Audio item: '+ locationstring)
              var srcfile = locationstring;
//               console.log('Non-object Audio: '+srcfile); 
			  playAudio(srcfile);
              }
 //              
//               //Figure out why aiff files fail here
//               locationstring = AudioName[$(this).attr("data-id")];
//               console.log('Audio item: '+ locationstring)
//               var srcfile = locationstring;
//               if (srcfile.indexOf("aiff") == -1){
//               if (AudioName[$(this).attr("data-id")] !== null){
//           			srcfile = AudioName[$(this).attr("data-id")].toInternalURL();}
//           			}
// 					console.log('Flip Audio: '+srcfile); 
// 			 	    playAudio(srcfile);
				
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
			var RandomNum = getRandomIntInclusive(1, 6);
// 			console.log('RandomNum: '+RandomNum);
			var HoorayImage = 'images/'+RandomNum+'.gif';
// 			console.log(HoorayImage);
			document.getElementById("Hooray").style.backgroundImage = "url("+HoorayImage +")";
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
			var delayMillis = 5000; //4 second

setTimeout(function() {
Memory.hideModal();
Memory.reset();
}, delayMillis);
			
            
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");	
			playAudio(Tada);
			
			
			
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
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside"><div class="front" style="margin: 0 auto; padding-left: 5; padding-top: 10;"><img src="'+ v.img +'"alt="'+ v.name +'" class="img-responsive" /></div><div class="back" style="margin: 0 auto; padding-left: 5; padding-top: 10;"><img src="images/heart.png" alt="Heart" /><div id="audio" data-audiofile="'+ v.audio +'"></div></div></div></div>';
              
              
			
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
$('.control').html('<input type="image" onclick="PlayGame()" src="images/play.png" style="height:50; width:50;"></input><input type="image" onclick="SetupPix()" src="images/stop.png" style="height:50; width:50;"></input>');



};

function SetupPix() {
// $(".animsition").animsition({
//   inClass: "rotate-in",
//   outClass: "rotate-out"
// });
LoadPixAudio();
$('.game').html('<div class="container" ><div class="row"><div class="col-xs-6"><span class="pull-right"><a href="javascript:void(0)" class="Change1"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[1]+'"></a></span></div><div class="col-xs-6"><a href="javascript:void(0)" class="Change2"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[2]+'"></a></div></div><div class="row"><div class="col-xs-12" ></div><div class="row"><div class="col-xs-6"><span class="pull-right"><a href="javascript:void(0)" class="Change3"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[3]+'"></a></span></div><div class="col-xs-6"><a href="javascript:void(0)" class="Change4"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[4]+'"></a></div></div><div class="row"><div class="col-xs-12" ></div><div class="row"><div class="col-xs-6"><span class="pull-right"><a href="javascript:void(0)" class="Change5"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[5]+'"></a></span></div><div class="col-xs-6"><a href="javascript:void(0)" class="Change6"><img style="margin-top:5px;margin-bottom:5px; height:80px;" src="'+Card[6]+'"></a></div></div></div><div class="row"><div class="col-xs-12"><div class="text-center" style="font-family: Indie Flower"></div></div></div>');

if (FirstRun == true){
alertify.alert("Welcome to Family Face Match, the matching game you can customize with your own images and voice. Create games to teach family names and faces, pet or animal names, or vocabulary. The example game teaches colors. After you press OK, you'll be on the setup screen. <strong>Touch a play tile to change the image</strong> to a photo from your camera or library. Then add custom audio by recording the name of the person, pet, or object in your own voice or your child\'s.");
FirstRun = false};

$('.control').html('<a href="javascript:void(0)" id="Play"><img src="images/play.png" height="50" width="50" style="margin-bottom:30px"></a>');

}



function ChangePhoto(PhotoNumber) {
LoadPixAudio();
PhotoNum = PhotoNumber;
// var SwapCard = 'images/'+PhotoNum+'File.jpg';
var SwapCard = Card[PhotoNum];
// console.log(localStorage);


// var imgWidth = img.naturalWidth;
// console.log(imgWidth);
$('.game').html('<br /><div class="singlecard" style="width:200px; height:250px"><div class="inside"><div class="back" id="imgDiv"><img src="'+SwapCard+'" class="center"></div></div></div><br /><div class="row"><div class="col-md-6 col-md-offset-3" ><div class="center"><button style="height:50px;width:100px" onclick="capturePhotoEdit();"><span class="icon-camera"></span></button><button style="height:50px;width:100px" onclick="captureLibraryEdit();"><span class="icon-picture"></span></button><button style="height:50px;width:100px"  onclick=" playAudio(AudioName[PhotoNum]);"><span class="icon-play"></span></button><button style="height:50px;width:100px"  onclick="CaptureAudio(PhotoNum);"><span class="icon-mic"></span></button><Button style="height:50px;width:100px"  onclick="SetupPix()"><span class="icon-to-start"></span></button><Button style="height:50px;width:100px"  onclick="Help();"><span class="icon-help"></span></button></div></div></div>');

$('.control').html('<a href="javascript:void(0)" id="Play"><img src="images/play.png" height="50" width="50" style="margin-bottom:30px"></a>');

//swap loadpixaudio in game with onclick="capturePhotoEdit();"

}

function ChangePhotoAgain(PhotoNumber) {


LoadPixAudio();
PhotoNum = PhotoNumber;
// var SwapCard = 'images/'+PhotoNum+'File.jpg';
var SwapCardAgain = Card[PhotoNum];
// console.log("SwapcardAgain "+SwapCardAgain);




// var imgWidth = img.naturalWidth;
// console.log(imgWidth);
$('.game').html('<br /><div class="singlecard" style="width:200px; height:250px"><div class="inside"><div class="back" id="imgDiv"><img src="'+SwapCardAgain+'" class="center"></div></div></div><br /><div class="row"><div class="col-md-6 col-md-offset-3" ><div class="center"><button style="height:50px;width:100px" onclick="capturePhotoEdit();"><span class="icon-camera"></span></button><button style="height:50px;width:100px" onclick="captureLibraryEdit();"><span class="icon-picture"></span></button><button style="height:50px;width:100px"  onclick=" playAudio(AudioName[PhotoNum]);"><span class="icon-play"></span></button><button style="height:50px;width:100px"  onclick="CaptureAudio(PhotoNum);"><span class="icon-mic"></span></button><Button style="height:50px;width:100px"  onclick="SetupPix()"><span class="icon-to-start"></span></button><Button style="height:50px;width:100px"  onclick="Help();"><span class="icon-help"></span></button></div></div></div>');

$('.control').html('<a href="javascript:void(0)" id="Play"><img src="images/play.png" height="50" width="50" style="margin-bottom:30px"></a>');

//swap loadpixaudio in game with onclick="capturePhotoEdit();"

}


function Help() {
alertify.alert("<table><tr><td><span class='icon-camera'></span></td><td>Use the Camera Icon to change the tile to a photo you want to take now.</td></tr><tr><td><span class='icon-picture'></span></td><td>Use the Library Icon to change the tile to a photo from your library. </td></tr><tr><td><span class='icon-play'></span></td><td>Use the Play button to hear the tile's audio.</td><td></tr><tr><td><span class='icon-mic'></span></td><td>Use the Mic Icon to record the name of the object, person or pet.</td></tr><tr><td><span class='icon-to-start'></span></td><td>Use the return button to go back to the other tiles.</td></tr></table>")

}

function CaptureAudio(PhotoNumber) {
// capture callback
var captureSuccess = function(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
//         console.log(path);
        playAudio(path);
        MoveAudio(path);
        
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
//             console.log("playAudio():Audio Success");
            my_media.stop();
            my_media.release();
            AudioFinished = true;
        },
        // error callback
        function (err) {
//             console.log("playAudio():Audio Error: " + err);
        }
    );
    // Play audio
    my_media.play();
   

   
}

function playStoredAudio(PhotoNumber) {
    // Play the audio file at url
    var srcfile = AudioName[PhotoNumber].toInternalURL();
   //  var srcfile = cordova.file.documentsDirectory + 'FamilyFaceMatch/'+PhotoNumber+'.wav';
//     console.log('ackkkkkk: '+srcfile);
    
    
    playAudio(srcfile);			
//     console.log('UGLy ugly: '+storedfile);
//     var my_media = new Media(storedfile,
//         // success callback
//         function () {
//             console.log("playAudio():Audio Success");
//         },
//         // error callback
//         function (err) {
//             console.log("playAudio():Audio Error: " + err);
//         }
//     );
//     // Play audio
//     my_media.play();
// //     my_media.stop();
// //     my_media.release();
//    
}


function SavePix(CardNumber,PixURL){
                            PixURL = PixURL.toInternalURL();
                             window.localStorage.setItem('Pix-'+CardNumber,PixURL); 
                             Card[CardNumber] = PixURL;       
//                              console.log('Saved and set: '+CardNumber,PixURL);        
};

function SaveAudio(CardNumber,AudioURL){
                             window.localStorage.setItem('Audio-'+CardNumber,AudioURL);
                              AudioName[CardNumber] = AudioURL;
//                               console.log('Saved and set: '+CardNumber,AudioURL);
};

function LoadPixAudio(){
if (window.localStorage.length !== 0){
var ticker = 7;
// console.log('ticker = '+ticker);


for(var i = 0; i < ticker; i++){
var AudioRef ='Audio-'+i;
var PixRef ='Pix-'+i;
var StoredPixURL = localStorage.getItem(PixRef);
var StoredAudioURL = localStorage.getItem(AudioRef);
if (StoredPixURL !== null) {Card[i] = StoredPixURL;};
// console.log('LOADING: '+i+' url '+StoredPixURL); 
if (StoredAudioURL !== null) {AudioName[i] = StoredAudioURL};
// console.log('LOADING: '+i+' url '+StoredAudioURL);
}
$('.game').html('');

};

};


function MovePic(file){ 
    window.resolveLocalFileSystemURL(file, resolveOnSuccess, resOnError); 
} 

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry){ 

    var newFileName = PhotoNum + ".jpg";
    var myFolderApp = "FamilyFaceMatch";
   //  console.log('Pix entry: '+entry);

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
    //The folder is created if doesn't exist
    fileSys.root.getDirectory( myFolderApp,
                    {create:true, exclusive: false},
                    function(directory) {
                        entry.moveTo(directory, newFileName,  successMove, resOnError);
                    },
                    resOnError);
                    },
    resOnError);
}

function resolveOnAudioSuccess(entry){ 

    var newFileName = PhotoNum + ".wav";
    var myFolderApp = "FamilyFaceMatch";
//     console.log('Audio entry: '+entry);

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
    //The folder is created if doesn't exist
    fileSys.root.getDirectory( myFolderApp,
                    {create:true, exclusive: false},
                    function(directory) {
                        entry.moveTo(directory, newFileName,  successAudioMove, resOnError);       
                    },
                    resOnError);
                    },
    resOnError);
    
}


//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    //I do my insert with "entry.fullPath" as for the path
    
   //  var path = entry.toInternalURL();//given by the success callback
// IOS_ASSETS_ABS_PATH = path.replace("file:///", "file:///private/");
// // IOS_ASSETS_ABS_PATH += "www/";
//     console.log('Saving Picture: '+IOS_ASSETS_ABS_PATH);
//     SavePix(PhotoNum,IOS_ASSETS_ABS_PATH);
// entry = entry.toInternalURL();
// MovePic(entry);
SavePix(PhotoNum,entry);
console.log('saving '+PhotoNum+' as '+entry);
}

function MoveAudio(file){ 
//     console.log('MoveAudio '+file);
    filepath = 'file:///'+file;
    window.resolveLocalFileSystemURL(filepath, resolveOnAudioSuccess, resOnAudioError); 
   
} 



//Callback function when the file system uri has been resolved







//Callback function when the file has been moved successfully - inserting the complete path
function successAudioMove(entry) {
    //I do my insert with "entry.fullPath" as for the path
//     console.log('Processing Hopeful Audio: '+entry);
    entry = entry.toInternalURL();
//     console.log('Saving Hopeful audio: '+entry); 
    SaveAudio(PhotoNum,entry);
}

function resOnError(error) {
    alertify.alert('Whoops: Error code: '+error.code);
}

function resOnAudioError(error) {
    alertify.alert('Audio Whoops: Error code: '+error.code);
}



var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('.gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

function getRandomIntInclusive(min, max) {
//    console.log('Randomizing');
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(updateGradient,10);
// console.log("Top of the pops here........");

// for (i = 0; i < 7; i++) {
// MoveAudio(AudioName[i]);
// console.log('moving: '+i);
// }


function asyncLoop(condition, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (AudioFinished == false) {
                index++;
                func(loop);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}

function someFunction(a, b, callback) {
//     console.log('Waiting for Audio');
    callback();
}

// localStorage.clear();
SetupPix();



