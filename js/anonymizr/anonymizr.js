$(document).ready(function() {
	
	if(!Modernizr.canvas){
		$('.overlay img').hide();
		$('.overlay').show();
		$('.browserfail').show();
	}else{

		var img = document.getElementById('defaultimg');
		Uploader.init();
		Downloader.init();
		ExampleChanger.init();
		View.showOverlay();
		
		img.onload = function() {
			
			Anonymizr.init(img);
			Anonymizr.pixalize();
			View.init();
			
		}
	}

});

var Color = function(r, g, b) {
	this.red = r;
	this.blue = b;
	this.green = g;
}
Color.prototype.add = function(r, g, b) {
	this.red += r;
	this.blue += b;
	this.green += g;
}
Color.prototype.createAVG = function(divisor) {
	this.red /= divisor;
	this.green /= divisor;
	this.blue /= divisor;
}
Color.prototype.getColor = function() {

	var r = this.red;
	var b = this.blue;
	var g = this.green;

	r = r < 0 ? 0 : Math.floor(r);
	r = r > 255 ? 255 : Math.floor(r);

	g = g < 0 ? 0 : Math.floor(g);
	g = g > 255 ? 255 : Math.floor(g);

	b = b < 0 ? 0 : Math.floor(b);
	b = b > 255 ? 255 : Math.floor(b);

	return new Color(r, g, b);
}

var ExampleChanger = {
	
	init : function(){
		
		$('.changeExample').on('click', function() {
			View.showOverlay();
			var path = 'http://anonymizr.net/img/';
				
			if (Anonymizr.isUpload) {
				View.setExample(true);
				$('#defaultimg').attr('src', path + 'default_1.jpg');
			} else {
				var currSrc = $('#defaultimg').attr('src');
				currSrc = currSrc.split('/');
				currSrc = currSrc[currSrc.length - 1];
				var newDefaultImg = currSrc == 'default_1.jpg' ? 'default_2.jpg' : 'default_1.jpg';
				$('#defaultimg').attr('src', path + newDefaultImg);
			}
		});
	}
	
}


var Downloader = {

	init : function() {
		$('.saveImg').on('click', function() {
			Downloader.save();
		});
	},

	save : function() {

		View.showOverlay();
		
		var saveData = Anonymizr.canvas.toDataURL("image/png");
		saveData = saveData.substr(saveData.indexOf(',') + 1).toString();
		
		var name = typeof Uploader.fileName != 'undefined' && Uploader.fileName != '' && Anonymizr.isUpload ? Uploader.fileName + " - Anonymizr" : "Anonymizr_moritzklack_com";
		name += '.png';

		$('.imgData').val(saveData);
		$('.imgName').val(name);
		$('#save').submit();

		window.setTimeout(function() {
			View.hideOverlay();
		}, 5000);
	}
}

var Uploader = {

	MAX_WIDTH : 980,
	MAX_HEIGHT : 800,

	init : function() {

		this.uploadBtn = $('.upload');
		this.defaultUploadBtn = $('#uploader');

		this.uploadBtn.on('click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			Uploader.defaultUploadBtn.click();
		});

		this.defaultUploadBtn.on('change', function() {
			var files = $(this)[0].files;
			Uploader.processFiles(files);
			return false;
		});
	},

	processFiles : function(files) {
		if (files && typeof FileReader !== "undefined") {
			View.showOverlay();
			this.readFile(files[0]);
		} else {
			View.showError();
		}
	},

	readFile : function(file) {
		if ((/image/i).test(file.type)) {
			//define FileReader object
			var reader = new FileReader();

			//init reader onload event handlers
			reader.onload = function(e) {
				var image = $('<img/>').load(function() {
					//get new image URL from canvas image
					var newimageurl = Uploader.getCanvasData(this);

					Uploader.fileName = file.name.substr(0, file.name.lastIndexOf('.'));

					$('#userimg').attr('src', newimageurl).load(function() {
						Anonymizr.init(this, Uploader.w, Uploader.h);
						Anonymizr.pixalize();
					});

				}).attr('src', e.target.result);

			};
			reader.readAsDataURL(file);
		} else {
			View.showError();
		}
	},

	getCanvasData : function(image) {

		this.w = image.width;
		this.h  = image.height;

		if (this.w > this.h) {
			if (this.w > this.MAX_WIDTH) {
				this.h *= this.MAX_WIDTH / this.w;
				this.w = this.MAX_WIDTH;
			}
		} else {
			if (this.h > this.MAX_HEIGHT) {
				this.w *= this.MAX_HEIGHT / this.h;
				this.h = this.MAX_HEIGHT;
			}
		}
		
		this.w = Math.floor(this.w);
		this.h = Math.floor(this.h);
		
		var canvasTmp = document.createElement('canvas');
		canvasTmp.width = this.w;
		canvasTmp.height = this.h;
		var ctxTmp = canvasTmp.getContext('2d');
		ctxTmp.drawImage(image, 0, 0, this.w, this.h);

		return canvasTmp.toDataURL("image/jpg");
	}
}

var Slider = {

	init : function() {

		this.firstUse = true;
		View.showStatus();
		
		$("#slider").slider({
			disabled: false, 
			orientation : 'vertical',
			range : 'min',
			value : 0,
			min : 0,
			max : 24,
			step : 4,
			slide : function(event, ui) {
					if (Slider.firstUse) {
						View.hideFDMessage();
					}
					if (ui.value > 0) {
						Anonymizr.rastersize = ui.value;
						Anonymizr.pixalize();
					} else {
						Anonymizr.reload();
					}
					View.updateStatus(ui.value);
					Slider.firstUse = false;
			}
		});

		View.updateStatus();
	},

	fail : function(){
		$("#slider").slider({ disabled: true });
	}
}

var View = {
		
	statusArr : [
		'oh! not a bit',
		'still recognizable',
		'gettin\' anonymous',
		'who are you?',
		'masked with pixels',
		'completely faceless',
		'inhuman'
	],
	
	init : function(){	
		$('#anonymizrCanvas').show();
		$('.statusWrapper').fadeIn();
	},
	
	showFDMessage : function(faceCount) {
		$('.fdMessage .count').text(faceCount);
		$('.fdMessage').fadeIn();
	},
	
	hideFDMessage : function(){
		$('.fdMessage').delay(1250).fadeOut(450);
	},
	
	showOverlay : function(){
		$('.overlay').show();
	},
	
	hideOverlay : function(){
		$('.overlay').hide();
	},

	updateStatus : function(value){	
		value = value || 0;
		$('.anonymityStatus .status').text(this.statusArr[value/4]);
	},
	
	showStatus : function(){
		$('.statusWrapper').show();
	},
	
	hideStatus : function(){
		$('.statusWrapper').hide();
	},
	
	setExample : function(isExample){
		var text = isExample ? 'change example!' : 'show example!';
		$('.changeExample').text(text);
	},
	
	showError : function(){
		this.hideOverlay();
		$('.fileError').fadeIn(450).delay(3500).fadeOut(450);
	}
	
};

var Anonymizr = {
	
	minConfidence : -3,

	reload : function() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.drawImage(this.currImg, 0, 0, this.width, this.height);
	},

	init : function(img, newWidth, newHeight) {
		
		this.currImg = img;
		
		//check if image is uploaded by user
		this.isUpload = typeof newWidth != 'undefined' && typeof newHeight != 'undefined';
		var imgId = this.isUpload ? 'userimg' : 'defaultimg';
		
		//get facedetection coords
		this.faceCoords = $('#' + imgId).faceDetection({
			complete : function() {
				View.hideOverlay();
			}
		});

		//init slider
		Slider.init();
		View.showFDMessage(this.faceCoords.length);
		
		var confidenceValid = false;
		
		for (var i = 0; i < this.faceCoords.length; i++){
			if(this.faceCoords[i].confidence > this.minConfidence){
				confidenceValid = true;
			}
		}

		if (!confidenceValid || this.faceCoords.length == 0) {
			Slider.fail();
			View.hideStatus();
			View.showFDMessage(0);
		}

		//init global anonymizr variables
		this.canvas = document.getElementById('anonymizrCanvas');
		this.ctx = this.canvas.getContext('2d');
		this.ctx.drawImage(this.currImg, 0, 0);

		this.width = this.currImg.width;
		this.height = this.currImg.height;

		if (this.isUpload) {
			View.setExample(false);
			this.width = newWidth;
			this.height = newHeight;
		}

		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.ctx.drawImage(this.currImg, 0, 0, this.width, this.height);

		this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);
		this.pixels = this.imageData.data;

		this.rastersize = 1;


	},

	pixalize : function() {
		this.reload();

		var newImageData = this.ctx.getImageData(0, 0, this.width, this.height);
		var newPixels = newImageData.data;

		for (var i = 0; i < this.faceCoords.length; i++) {
			//console.log(this.faceCoords[i].x + ' ' + this.faceCoords[i].confidence);
			if (this.faceCoords[i].confidence > this.minConfidence) {
				var startX = this.faceCoords[i].x;
				var startY = this.faceCoords[i].y;
				var endX = startX + this.faceCoords[i].width;
				var endY = startY + this.faceCoords[i].height;

				for (var x = startX; x < endX; x += this.rastersize) {
					for (var y = startY; y < endY; y += this.rastersize) {
						
						var avgColor = this.getAVGColor(x, y);
						
						for (var subX = x; subX < (x + this.rastersize); subX++) {
							for (var subY = y; subY < (y + this.rastersize); subY++) {

								var curPos = ((this.width * subY) + subX) * 4;
								newPixels[curPos] = avgColor.red ;
								newPixels[curPos + 1] = avgColor.green ;
								newPixels[curPos + 2] = avgColor.blue ;
							}
						}
					}
				}
			}
			
			this.ctx.putImageData(newImageData, 0, 0);
		}
	},

	getAVGColor : function(startX, startY) {

		var avgColor = new Color(0, 0, 0);
		var index = 0;
		this.maxSubPos = 0;

		for (var subX = startX; subX < startX + this.rastersize; subX++) {
			for (var subY = startY; subY < startY + this.rastersize; subY++) {

				var curSubPos = ((this.width * subY) + subX) * 4;
				var r = this.pixels[curSubPos];
				var g = this.pixels[curSubPos + 1];
				var b = this.pixels[curSubPos + 2];
				
				avgColor.add(r, g, b);
				index++;
				this.maxSubPos = curSubPos > this.maxSubPos ? curSubPos : this.maxSubPos;
			}
		}
		avgColor.createAVG(index);
		return avgColor.getColor();
	}
}