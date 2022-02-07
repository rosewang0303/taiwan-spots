// 共用函式
import Vue from 'vue'

/** 
 * 時間format
 * @param   {string}    time 
 */
 Vue.prototype.formatDate = (time) => {
    let date = new Date(time);
    let format = date.getFullYear() + "/" + date.getMonth()+1 + "/" + date.getDate()
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
/** 
 * 月份中文轉換
 * @param   {Object}    month    月份
 */
Vue.prototype.formatMonth = (month) => {
    let monthList = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"]

    return monthList[month];
}
/** 
 * 判斷是否為行動裝置
 */
 Vue.prototype.isMobile = () => {
    let ua = navigator.userAgent.toString().toLowerCase();
    
    if(ua.match(/iphone/i) || ua.match(/ipad/i) || ua.match(/ipod/i) || ua.match(/android/i) || ua.match(/blackberry/i)  || ua.match(/webos/i)  || ua.match(/windows phone/i)) {
        return true
    }else {
        return false
    }
}






