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
 * api回傳City format
 * @param   {Object}    item    單筆回傳資料
 */
Vue.prototype.formatCity = (item) => {
    let format = item.City?item.City:item.Address.substr(0, 3);
    return format;
}
/** 
 * api回傳Picture format
 * @param   {Object}    item    單筆Picture回傳資料
 */ 
 Vue.prototype.formatImageList = (item) => {
    let imageList = [];
    for (const key in item) {
        if(key.indexOf('PictureDescription') != -1) {
            let keyIndex = key.split("PictureDescription")[1]-1;
            if(imageList[keyIndex] == undefined) {
                imageList.splice(keyIndex, 0, {
                    alt: item[key]
                });
            }else {
                imageList[keyIndex]["alt"] = item[key]
            }
        }else {
            let keyIndex = key.split("PictureUrl")[1]-1;
            if(imageList[keyIndex] == undefined) {
                imageList.splice(keyIndex, 0, {
                    img: item[key]
                });
            }else {
                imageList[keyIndex]["img"] = item[key]
            }
        }
    }
    return imageList;
}