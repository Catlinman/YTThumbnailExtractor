
function createImage(url, description) {
	var div = document.createElement("div");
	div.className = "image-container"

	var img = new Image();
	img.src = url;

	img.onload = function() {
		if(img.width != 120 && img.height != 90) {
			var width = Math.min(window.innerWidth * 0.9, img.width);
			var height = Math.min(window.innerHeight * 0.9, img.height);

			var label = document.createElement("p")
			label.innerHTML = description;

			var a = document.createElement('a');
			a.title = description;
			a.href = img.src;

			img.style.width = width + "px";
			img.style.height = height + "px";
			img.alt = description || "Thumbnail";

			div.style.width = width + "px";
			div.style.height = height + "px";

			a.appendChild(img);
			div.appendChild(a);
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
	createImage(default0URL, "Default thumbnail")
});
