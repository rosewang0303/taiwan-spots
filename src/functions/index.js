// 共用函式
import Vue from 'vue'

/** 
 * 時間format
 * @param   {string}    time 
 */
 Vue.prototype.formatDate = (time) => {
    let date = new Date(time);
    let format = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
    return format;
}
/** 
 * api回傳城市名稱format
 * @param   {Object}    item    單筆回傳資料
 */
Vue.prototype.formatCity = (item) => {
    let format = item.City?item.City:item.Address.substr(0, 3);
    return format;
}