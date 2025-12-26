document.getElementById('copyButton').addEventListener('click', () => {
  copyFromActiveTab('normal');
});

document.getElementById('copyPathButton').addEventListener('click', () => {
  copyFromActiveTab('path');
});

function copyFromActiveTab(format) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: getContentByFormat,
        args: [format],
      },
      (results) => {
        const content = results && results[0] ? results[0].result : '';
        if (!content) {
          console.error('Could not retrieve content to copy.');
          return;
        }
        navigator.clipboard.writeText(content).then(() => {
          const message = format === 'path' ? 'Path copied to clipboard!' : 'Title and URL copied to clipboard!';
          alert(message);
        }).catch(err => {
          console.error('Could not copy text: ', err);
        });
      }
    );
  });
}

function getContentByFormat(format) {
  const title = document.title;
  const url = window.location.href;
  const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (format === 'path') {
    return path || '/';
  }
  return `${title}\n${url}`;
}
