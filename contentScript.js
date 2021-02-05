window.addEventListener("hashchange", function () {
    // Check hash details first, before sending bookmark request.
    // Grab the hash.
    let locHashParts = window.location.hash.split('/');
    // See if this is a switch to a new context page.
    if (locHashParts.length > 1 && locHashParts[0] == '#context') {
        // Set a count to give up if the context hasn't been loaded in 2 seconds.
        let failsafeCount = 0;
        let timer = setInterval(function () {
            // Lookup where the context name is stored.
            let contextName = document.getElementById('contextName');
            // See if the context name has been set.
            if (contextName) {
                clearInterval(timer);
                // Context name has been set, so send a message to check bookmarks.
                chrome.runtime.sendMessage({ title: window.document.title, hash: window.location.hash });
            } else {
                failsafeCount++;
                if (failsafeCount > 10) {
                    // We've tried for 2 seconds to get the context name - context has not been loaded - give up.
                    clearInterval(timer);
                    alert('Context could not be loaded in order to check whether it should be bookmarked.');
                }
            }
        }, 200);
    }
}, false);
