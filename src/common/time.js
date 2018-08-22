//将20180816字符串转化为Date对象
export function convertToTime(str) {
    let time = str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8);
    let date = new Date(time);
    date.setDate(date.getDate() - 1); //按照api要求还原时间
    return date;
}
//将Date对象转换为20180816的格式
export function convertToString(time) {
    time.setDate(time.getDate() + 1); //按照api要求加1
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let dateString = year + '';
    if(month < 10) {
        dateString += '0' + month;
    } else {
        dateString += month;
    }
    if(day < 10) {
        dateString += '0' + day;
    } else {
        dateString += day;
    }
    return dateString;
}
