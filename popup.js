document.getElementById('copyButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: getTitleAndUrl
      }, (results) => {
        const titleAndUrl = results[0].result;
        navigator.clipboard.writeText(titleAndUrl).then(() => {
          alert("Title and URL copied to clipboard!");
        }).catch(err => {
          console.error('Could not copy text: ', err);
        });
    });
  });
  
  function getTitleAndUrl() {
    const title = document.title;
    const url = window.location.href;
    return `${title}\n${url}`;
  }
  