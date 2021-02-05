function handleMessage(request, sender, sendResponse) {
  // See if the bookmark already exists for this context. Searching within Title only doesn't return any results.
  chrome.bookmarks.search(request.title, results => {
    if (results.length) {
     // Update existing bookmark with the new context.
      chrome.bookmarks.update(results[0].id, {
        title: request.title, url: sender.tab.url
      })
    } else {
      // Create new bookmark.
      chrome.bookmarks.create({
        title: request.title, url: sender.tab.url
      });
    }
  })
}

chrome.runtime.onMessage.addListener(handleMessage);