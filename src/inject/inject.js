chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log('BIRP! Track Downloader Loaded');
            // ----------------------------------------------------------


            //Add download link to tracks
            function addDownloadLinks() {
                //Get all single tracks on page

                var tracks = document.getElementsByClassName('fap-single-track');

                //Loop through all the tracks
                for (var i = 0; i < tracks.length; ++i) {
                    var element = tracks[i];

                    //Make sure the track has a title
                    if (element.getAttribute('title')) {
                        var trackTitle = element.getAttribute('title');
                        var href = element.getAttribute('href');
                        // HREFs are BASE64 encoded. Decode that shiz.
                        var decodedHREF = decodeURIComponent(escape(window.atob(href)));
                        var downloadLink = document.createElement('a');
                        downloadLink.classList.add('appended-download-link');
                        downloadLink.href = decodedHREF;
                        downloadLink.target = '_blank';
                        downloadLink.download = trackTitle;
                        downloadLink.innerText = 'Download Track';
                        downloadLink.style.cssText = 'color: #999; font-size: 12px; margin-left:8px;';
                        element.parentNode.appendChild(downloadLink);
                    }
                }
            }

            //Fire functions on load
            addDownloadLinks();

            //Do some polling to fix AJAX problem
            var location = window.location.href;
            var pollInterval = 1000; //1s
            var polling = setInterval(function() {
              //If the href changes
                if (window.location.href != location) {
                    location = window.location.href;
                    addDownloadLinks();
                }
            }, pollInterval);

        }
    }, 10);
});
