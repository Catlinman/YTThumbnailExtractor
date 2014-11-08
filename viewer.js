document.addEventListener('DOMContentLoaded', function() {
	// Fetch the video id from the background page
	var bg = chrome.extension.getBackgroundPage();

	var maxresURL = "http://img.youtube.com/vi/" + bg.id + "/maxresdefault.jpg";
	var maxresimage = document.createElement("img");
	maxresimage.setAttribute('src', maxresURL);
	maxresimage.setAttribute('alt', 'na');

	document.getElementById("imagecontainer").appendChild(maxresimage);
});
