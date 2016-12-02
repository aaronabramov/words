function getCurrentTabUrl(callback) {
  chrome.tabs.executeScript({code: 'window.getSelection().toString();'}), selection => {
    console.log('SELECTION', selection[0]);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // stuff
});
