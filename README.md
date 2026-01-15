# Copy Title and URL Chrome Extension

## 概要

**Copy Title and URL**は、現在のWebページのタイトルとURLを簡単にクリップボードにコピーするためのChrome拡張機能です。ショートカットキー（Ctrl+C）を押すだけで、ページのタイトルとURLをコピーし、画面中央に「コピーしました」というメッセージを1秒間表示します。

## 特徴

- **簡単操作**: ショートカットキー（Ctrl+C）を使用して、現在のページのタイトルとURLをコピー。
- **視覚的フィードバック**: コピー操作が成功すると、画面中央に「コピーしました」というメッセージを大きな文字で1秒間表示。
- **軽量設計**: シンプルで軽量な設計のため、ブラウザのパフォーマンスに影響を与えません。

## インストール方法

1. 拡張機能を画面右上から`zip形式でダウンロード`して任意のディレクトリに保存して解凍します。<br>[![Image from Gyazo](https://i.gyazo.com/a467514e3d2f191f94dc31214b752bfc.png)](https://gyazo.com/a467514e3d2f191f94dc31214b752bfc)
2. Chromeで「拡張機能」ページを開きます（`chrome://extensions/`をアドレスバーに入力）。
3. 画面右上の「デベロッパーモード」を有効にします。
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、ダウンロードしたディレクトリを選択します。

### デベロッパーモードの有効化と拡張機能の読み込み方法

[![Image from Gyazo](https://i.gyazo.com/7d41f77730568c30bada6cfa819ccd39.png)](https://gyazo.com/7d41f77730568c30bada6cfa819ccd39)

[![Image from Gyazo](https://i.gyazo.com/89840f0b01150cc6ab4c063ecd050d4b.png)](https://gyazo.com/89840f0b01150cc6ab4c063ecd050d4b)

## ファイル構成

```
my-chrome-extension/
├── manifest.json
├── content.js
├── background.js
├── popup.html
├── popup.js
└── icon.png
```

## 使用方法

1. 拡張機能をインストールした後、任意のWebページを開きます。
2. Ctrl+Cを押すと、現在のページのタイトルとURLがクリップボードにコピーされます。<br>[![Image from Gyazo](https://i.gyazo.com/688cd1d41a6fd26409f190a142786dd4.png)](https://gyazo.com/688cd1d41a6fd26409f190a142786dd4)
3. 「コピーしました」というメッセージが画面中央に大きな文字で1秒間表示され、その後自動的に消えます。

たとえば、

ページのタイトルが`ちいプラ`で、URLが`https://nyango.com/chipla`の場合、それぞれ以下のような内容がクリップボードにコピーされます。

|コマンド|コピーされる内容|備考|
|-|-|-|
|通常|ちいぷら<br>https://nyango.com/chipla|Eメール等で利用|
|Markdown|`[ちいプラ](https://nyango.com/chipla)`|Redmineで利用|
|Textile|`"ちいプラ":https://nyango.com/chipla`|旧Redmineで利用。現在は不要|
|Pathのみ|`/chipla`||

## 注意事項

1. この拡張機能は、全てのWebページで動作しますが、特定のサイトでの使用に制限がある場合があります。
2. 拡張機能のパフォーマンスに影響を与えないように設計されていますが、多数のタブを開いている場合などには、動作が遅くなる可能性があります。

## ライセンス
  
このプロジェクトはMITライセンスの下で公開されています。
