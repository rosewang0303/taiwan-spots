// 共用函式
/** 
 * 時間format
 * @param   {string}    time 
 */
export function formatDate(time) {
    let date = new Date(time);
    let format = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
    return format;
}