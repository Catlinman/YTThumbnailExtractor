function createImage(url, alt) {
	var div = document.createElement("div");
	div.className = "image-container"

	var label = document.createElement("p")
	label.innerHTML = alt;

	var img = new Image();
	img.src = url;

	img.onload = function() {
		if(img.width != 120 && img.height != 90) {
			img.alt = alt || "Thumbnail";

			div.style.width = img.width + "px";
			div.style.height = (img.height + 24) + "px";

			div.appendChild(img);
			div.appendChild(label);
			document.getElementById("view-wrapper").appendChild(div);
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	// Fetch the video id from the background page
	var bg = chrome.extension.getBackgroundPage();

	var maxresURL = "http://img.youtube.com/vi/" + bg.id + "/maxresdefault.jpg";
	createImage(maxresURL, "Maximum resolution thumbnail")

	var sdresURL = "http://img.youtube.com/vi/" + bg.id + "/sddefault.jpg";
	createImage(sdresURL, "Standard resolution thumbnail")

	var default0URL = "http://img.youtube.com/vi/" + bg.id + "/0.jpg";
	createImage(default0URL, "Default maximum resolution thumbnail")
});
