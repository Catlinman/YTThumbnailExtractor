var tabURL;
var formURL;
var youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;;

String.prototype.trunc = String.prototype.trunc ||
	function(n) {
		return this.length > n ? this.substr(0, n - 1) + '&hellip;' : this;
	};

function validateYTURL(url) {
	return(url.match(youtubeRegex)) ? RegExp.$1 : false;
}

function getVideoId(url) {
	var id = url.split(/=|&/)[1];
	document.getElementById("idoutput").innerHTML = "Output: " +id;
	return id;
}

function buildThumbnailPage(id) {
	var maxresURL = "http://img.youtube.com/vi/" +id +"/maxresdefault.jpg";
	chrome.tabs.create({url:maxresURL});
}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("localbutton").addEventListener("click", function() {
		buildThumbnailPage(getVideoId(tabURL));
	});

	document.getElementById("urlbutton").addEventListener("click", function() {

	});

	chrome.tabs.query({
			'active': true,
			'windowId': chrome.windows.WINDOW_ID_CURRENT
		},
		function(tabs) {
			tabURL = tabs[0].url;
			document.getElementById("localurl").innerHTML = tabURL.trunc(50);

			if(validateYTURL(tabURL)) {
				document.getElementById('localbutton').disabled = false;
			} else {
				document.getElementById('localbutton').disabled = true;
			}
		}
	);
});
