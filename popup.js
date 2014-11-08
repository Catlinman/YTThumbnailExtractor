var tabURL; // Stores the current tab that was opened before clicking on the extension
var youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

// String truncation to clean up URLs that take up too much space
String.prototype.trunc = String.prototype.trunc ||
	function(n) {
		return this.length > n ? this.substr(0, n - 1) + '&hellip;' : this;
	};

// Checks if a URL points to an actual YouTube video
function validateYTURL(url) {
	return(url.match(youtubeRegex)) ? RegExp.$1 : false;
}

// Takes a YouTube video URL and sepperates the video id
function getVideoId(url) {
	var id = url.split(/=|&/)[1];
	document.getElementById("statusmessage").innerHTML = "Output: " + id;
	return id;
}

// Opens a new tab and passes along the information needed for the viewer module
function buildThumbnailPage() {
	chrome.tabs.create({
		url: "viewer.html"
	});
}

document.addEventListener('DOMContentLoaded', function() {
	// Listener for the local YouTube video button
	document.getElementById("localbutton").addEventListener("click", function() {
		var bg = chrome.extension.getBackgroundPage();
		bg.id = getVideoId(tabURL);
		buildThumbnailPage();
	});

	// Listener for the form confirmation button
	document.getElementById("urlbutton").addEventListener("click", function() {
		var url = "";
		if(document.getElementById("custominput").value) {
			url = document.getElementById("custominput").value
			if(validateYTURL(url)) {
				var bg = chrome.extension.getBackgroundPage();
				bg.id = getVideoId(url);
				buildThumbnailPage();
			} else {
				document.getElementById("statusmessage").style.color = "Red";
				document.getElementById("statusmessage").innerHTML = "Invalid URL";
			}
		} else {
			document.getElementById("statusmessage").style.color = "Red";
			document.getElementById("statusmessage").innerHTML = "Enter a URL first";
		}
	});

	// Gets the background tab corresponding to when the extension icon was clicked
	chrome.tabs.query({
			'active': true,
			'windowId': chrome.windows.WINDOW_ID_CURRENT
		},
		function(tabs) {
			tabURL = tabs[0].url;
			document.getElementById("localurl").innerHTML = tabURL.trunc(50);

			// Checks if the tab was a YouTube watch page and if so enables the local fetch button
			if(validateYTURL(tabURL)) {
				document.getElementById('localbutton').disabled = false;
			} else {
				document.getElementById('localbutton').disabled = true;
			}
		}
	);
});
