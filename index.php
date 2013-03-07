<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />

		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

		<title>Anonymizr | being faceless within seconds</title>
		<meta name="description" content="Anonymizr - being faceless within seconds. Tool to pixelate faces by Moritz Klack" />
		<meta name="author" content="Moritz Klack" />
		<meta name="robots" content="index,follow" />
		<meta name="viewport" content="width=device-width; initial-scale=1.0" />

		<!-- Replace favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
		<link href="img/favicon.ico" rel="shortcut icon" />
		<script type="text/javascript" src="js/libs/modernizer_canvas.js"></script>
		<link type="text/css" href="css/ui-lightness/jquery-ui-1.8.23.custom.css" rel="stylesheet" />
		<link href='http://fonts.googleapis.com/css?family=VT323' rel='stylesheet' type='text/css'>
		<link href="css/style.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script type="text/javascript" src="js/anonymizr/jquery-ui-1.8.23.custom.min.js"></script>
		<script type="text/javascript" src="js/anonymizr/facedetection/ccv.js"></script>
		<script type="text/javascript" src="js/anonymizr/facedetection/face.js"></script>
		<script type="text/javascript" src="js/anonymizr/jquery.facedetection.js"></script>
		<script type="text/javascript" src="js/anonymizr/anonymizr.js"></script>
		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-36675543-1']);
			_gaq.push(['_trackPageview']);

			(function() {
				var ga = document.createElement('script');
				ga.type = 'text/javascript';
				ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(ga, s);
			})();

		</script>
	</head>

	<body>
		<div class="overlay">
			<img src="img/ajaxload.gif"/>
			<div class="browserfail">
				<span>oh no! your browser is not supported!
					<br />
					Try a modern browser to run this application.</span>
			</div>
		</div>
		<div class="global">
			<header>
				<div class="hWrapper">
					<div class="logo">
						<h1>Anonymizr</h1>
						<span class="subtitle">being.faceless.within.seconds.</span>
					</div>

					<div class="button changeExample">
						change example!
					</div>
					<div class="button saveImg">
						save!
					</div>
					<!--<input id="uploadbtn" class="button upload" type="button" value="upload!"/>-->
					<div id="uploadbtn" class="button upload">
						upload!
					</div>

					<input id="uploader" type="file"/>
					<form style="display:none" id="save" method="post" action="http://anonymizr.net/saveimg.php">
						<textarea name="imgdata" type="text" class="imgData"></textarea>
						<input name="name" type="text" class="imgName"/>
					</form>
					<div class="fileError message">
						Oh no! An error occured. Only .jpg, .png and .gif are valid fileformats!
					</div>
					<div class="clear"></div>
				</div>

			</header>

			<div class="content">

				<div class="sidebar">
					<div class="sliderWrapper">
						<div id="slider"></div>
						<div class="moveMessage">
							move the slider to pixalte the faces
						</div>
					</div>

				</div>
				<div class="main">

					<div class="anonymityStatus">
						<span class="statusWrapper">Status of anonymity: <span class="status"></span>
							<br />
						</span>
						<span class="fdMessage"><span class="count"></span> face(s) detected!</span>

					</div>
					<div class="clear"></div>
					<canvas id="anonymizrCanvas"></canvas>
					<img id="defaultimg" src="http://anonymizr.net/img/default_1.jpg"/>
					<img id="userimg" src=""/>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<footer>
			<div class="infoWrapper">

				<a href="https://twitter.com/share" class="twitter-share-button" data-via="moklick" data-count="none">Tweet</a>
				<script>
					! function(d, s, id) {
						var js, fjs = d.getElementsByTagName(s)[0];
						if (!d.getElementById(id)) {
							js = d.createElement(s);
							js.id = id;
							js.src = "//platform.twitter.com/widgets.js";
							fjs.parentNode.insertBefore(js, fjs);
						}
					}(document, "script", "twitter-wjs");
				</script>

				<span>Anonymizr - <a target="_blank" href="http://moritzklack.com">moritzklack.com</a> | <a href="http://facedetection.jaysalvat.com/">Facedetection plugin</a></span>
			</div>
		</footer>

	</body>
</html>
