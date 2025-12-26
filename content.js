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
    showFormatSelectionPopup(isEmailOrNumberType);
  }
});

function showFormatSelectionPopup(isEmailOrNumberType) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '10001';

  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.backgroundColor = '#fff';
  popup.style.padding = '20px';
  popup.style.borderRadius = '10px';
  popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  popup.style.zIndex = '10002';
  popup.innerHTML = `
    <p>コピー形式を選択してください</p>
    <button id="copy-normal" class="copy-popup-button" tabindex="0">通常</button>
    <button id="copy-markdown" class="copy-popup-button" tabindex="0">Markdown</button>
    <button id="copy-textile" class="copy-popup-button" tabindex="0">Textile</button>
    <button id="copy-path" class="copy-popup-button" tabindex="0">Pathのみ</button>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  // スタイル追加
  const style = document.createElement('style');
  style.textContent = `
    .copy-popup-button {
      margin: 5px;
      padding: 10px 20px;
      font-size: 16px;
      border: 2px solid #007BFF;
      background-color: white;
      color: #007BFF;
      border-radius: 5px;
      cursor: pointer;
      outline: none;
      transition: background-color 0.2s, color 0.2s;
    }

    .copy-popup-button:hover,
    .copy-popup-button:focus {
      background-color: #007BFF;
      color: white;
    }
  `;
  document.head.appendChild(style);

  const removePopup = () => {
    document.removeEventListener('keydown', handleKeyDown);
    overlay.remove();
    popup.remove();
  };

  const handleCopy = (format) => {
    copyTitleAndUrl(format);
    const messages = {
      normal: 'タイトルとURLをコピーしました (通常形式)',
      markdown: 'タイトルとURLをコピーしました (Markdown形式)',
      textile: 'タイトルとURLをコピーしました (Textile形式)',
      path: 'ページのパスをコピーしました'
    };
    let notificationMessage = messages[format] || 'コピーしました';
    if (isEmailOrNumberType && format === 'normal') {
      notificationMessage += '\n[email|number型はselectionStartが機能しないので選択していても無視されます]';
    }
    showCopyNotification(notificationMessage);
    removePopup();
  };

  document.getElementById('copy-normal').onclick = () => handleCopy('normal');
  document.getElementById('copy-markdown').onclick = () => handleCopy('markdown');
  document.getElementById('copy-textile').onclick = () => handleCopy('textile');
  document.getElementById('copy-path').onclick = () => handleCopy('path');

  // 最初のボタンにフォーカスを合わせる
  const buttons = popup.querySelectorAll('button');
  buttons[0].focus();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      document.activeElement.click();
    } else if (e.key === 'Escape') {
      removePopup();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
}

function copyTitleAndUrl(format = 'normal') {
  const title = document.title;
  const url = window.location.href;
  const pathOnly = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  let text;
  switch (format) {
    case 'path':
      text = pathOnly || '/';
      break;
    case 'markdown':
      text = `[${title}](${url})`;
      break;
    case 'textile':
      text = `"${title}":${url}`;
      break;
    case 'normal':
    default:
      text = `${title}\n${url}`;
      break;
  }

  navigator.clipboard.writeText(text).then(() => {
    console.log(`[INFO] コピー成功 (${format}): `, text);
  }).catch(err => {
    console.error('コピー失敗: ', err);
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
  notification.style.fontSize = '20px';
  notification.style.zIndex = '10000';
  notification.style.textAlign = 'center';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}
