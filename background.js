chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: copyTitleAndUrl
    });
  });
  
  function copyTitleAndUrl() {
    const title = document.title;
    const url = window.location.href;
    const text = `${title}\n${url}`;
    navigator.clipboard.writeText(text).then(() => {
      alert("Title and URL copied to clipboard!");
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
  