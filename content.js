document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'c') {
      const selection = document.getSelection();
      if (selection && selection.toString().length > 0) {
        // テキストが選択されている場合、標準の操作を実行
        return;
      } else {
        // テキストが選択されていない場合、タイトルとURLをコピー
        event.preventDefault();
        copyTitleAndUrl();
      }
    }
  });
  
  function copyTitleAndUrl() {
    const title = document.title;
    const url = window.location.href;
    const text = `${title}\n${url}`;
    navigator.clipboard.writeText(text).then(() => {
      showCopyNotification();
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
  
  function showCopyNotification() {
    const notification = document.createElement('div');
    notification.textContent = 'コピーしました';
    notification.style.position = 'fixed';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.padding = '20px';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    notification.style.color = 'white';
    notification.style.borderRadius = '10px';
    notification.style.fontSize = '24px';
    notification.style.zIndex = '10000';
    notification.style.textAlign = 'center';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 1000);
  }
  