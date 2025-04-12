document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'c') {
    const selection = document.getSelection();
    const activeElement = document.activeElement;
  
    let selectedText = '';
    let isEmailOrNumberType = false;
  
    if (selection && selection.toString().length > 0) {
      selectedText = selection.toString();
    } else if (
      activeElement &&
      (activeElement.tagName === 'TEXTAREA' ||
        (activeElement.tagName === 'INPUT' &&
          ['text','search','tel','url','password','email', 'number'].includes(activeElement.type)))
    ) {
      isEmailOrNumberType = activeElement.type === 'email' || activeElement.type === 'number';
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      console.log(`[INFO]activeElement.selection start=${start} end=${end}`);
      if (start !== null && end !== null && start !== end) {
        selectedText = activeElement.value.substring(start, end);
      }
    }
  
    if (selectedText.length > 0) {
      console.log('[INFO] 通常のコピー処理: ', selectedText);
      showCopyNotification('通常コピー/選択されているテキストをコピーしました');
      return; // 標準のコピー動作を継続
    }
  
    // テキストが選択されていない → 独自コピーに差し替え
    event.preventDefault();
    copyTitleAndUrl();
    showCopyNotification('独自コピー/タイトルとURLをコピーしました' + (isEmailOrNumberType ? '\n[email|number型はselectionStartが機能しないので選択していても無視されます]' : ''));
  }
});
  
function copyTitleAndUrl() {
  const title = document.title;
  const url = window.location.href;
  const text = `${title}\n${url}`;
  navigator.clipboard.writeText(text).then(() => {
    // コピー成功時の処理（必要に応じて追加）
    console.log('[INFO] 独自コピー処理: ', text);
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}

function showCopyNotification(title) {
  const notification = document.createElement('div');
  notification.textContent = title;
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
  }, 2000);
}
