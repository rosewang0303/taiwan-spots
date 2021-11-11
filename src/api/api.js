import axios from 'axios';
import jsSHA from 'jssha';

/**
 * axios
 */
const AppID = "d3fd45c9c5bd4b298f967b59745777f9";
const AppKey = "pcWWHmwwZnFYdO-A0mvrlFXsypk";

const webTokenRequestV2 = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_V2,
});
const webTokenRequestV3 = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_V3,
});

// request攔截器
webTokenRequestV2.interceptors.request.use(function (config) {
  // header
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  let HMAC = ShaObj.getHMAC('B64');
  let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';

  config.headers.common = {
    'Authorization': Authorization, 
    'X-Date': GMTString 
  }
  console.log(config.headers.common);

  return config
}, function (error) {
  console.log("error:: ", error);
  return Promise.reject(error)
})
webTokenRequestV3.interceptors.request.use(function (config) {
  // header
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  let HMAC = ShaObj.getHMAC('B64');
  let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';

  config.headers.common = {
    'Authorization': Authorization, 
    'X-Date': GMTString 
  }
  console.log(config.headers.common);

  return config
}, function (error) {
  console.log("error:: ", error);
  return Promise.reject(error)
})

// Response攔截器
webTokenRequestV2.interceptors.response.use(
  function (response) {
    console.log(response.config.url);
    console.log(response);
    return response.data;
  },
  function (error) {
    if (error.response){
      switch (error.response.status) {
        case 400:
          // 發生錯誤
          break
        case 404:
          // 你要找的頁面不存在
          break
        case 500:
          // 程式發生錯誤，請聯絡管理員
          break
        default:
          // 系統發生非預期錯誤，請聯絡管理員
      }
      console.log(error.response.status);
    } 
    if (!window.navigator.onLine) {
      // 沒有網路連線
      return;
    }
    return Promise.reject(error.response);
  }
);
webTokenRequestV3.interceptors.response.use(
  function (response) {
    console.log(response.config.url);
    console.log(response);
    return response.data;
  },
  function (error) {
    if (error.response){
      switch (error.response.status) {
        case 400:
          // 發生錯誤
          break
        case 404:
          // 你要找的頁面不存在
          break
        case 500:
          // 程式發生錯誤，請聯絡管理員
          break
        default:
          // 系統發生非預期錯誤，請聯絡管理員
      }
      console.log(error.response.status);
    } 
    if (!window.navigator.onLine) {
      // 沒有網路連線
      return;
    }
    return Promise.reject(error.response);
  }
);

/**
 * TDX api v3
 */

// GET 取得縣市引用參數
export const apiGetCityList = () => webTokenRequestV3.get(`/V3/Map/Basic/City`); 

/**
 * TDX api v2
 */

// GET 取得 所有 觀光景點資料
export const apiGetSpotList = (data) => webTokenRequestV2.get(`/v2/Tourism/ScenicSpot?${data}`); 
// GET 取得 所有 觀光景點資料
export const apiGetSpotCityList = (city, data) => webTokenRequestV2.get(`/v2/Tourism/ScenicSpot/${city}?${data}`);
// GET 取得 所有 觀光餐飲資料
export const apiGetFoodList = (data) => webTokenRequestV2.get(`/v2/Tourism/Restaurant?${data}`);
// GET 取得 縣市 觀光餐飲資料
export const apiGetFoodCityList = (city, data) => webTokenRequestV2.get(`/v2/Tourism/Restaurant/${city}?${data}`);
// GET 取得 所有 觀光活動資料
export const apiGetEventList = (data) => webTokenRequestV2.get(`/v2/Tourism/Activity?${data}`); 
// GET 取得 縣市 觀光活動資料
export const apiGetEventCityList = (city, data) => webTokenRequestV2.get(`/v2/Tourism/Activity/${city}?${data}`);
