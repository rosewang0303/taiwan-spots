# THE F2E 3rd Week1-台灣旅遊景點導覽

## 作品說明
查詢全台各縣市景點、活動、美食。

使用Vue.js開發，UI元件儘可能的增加可用彈性，api資料的不齊全花了不少時間在過濾資料，串接TDX平台的v2和v3的圖資api，這也是我第一次嘗試申請使用google map的api服務，也挑戰不使用第三方套件自己實作輪播圖片和時間選擇器。

## 系統說明
```bash
## Project setup
yarn install

### Compiles and hot-reloads for development
yarn serve

### Compiles and minifies for production
yarn build
```

## 資料夾說明
* src/api：api設定
* src/assets：icon圖/共用css樣式
* src/components：元件
* src/function：共用function
* router：路由設定
* views：網站頁面


## 使用技術
* Vue.js
* SCSS
* axios


## 第三方服務
* google map api - Maps JavaScript API
* TDX api v2 / v3
