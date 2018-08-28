//注解，知乎api查询使用加一天的字符串，返回json中的date为正常日期
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

export function convertToLocalString(str) {
    //备注：输入的str为标准时间
    //转换为Date对象
    let date = convertToTime(str);
    //加一天符合api标准输出
    date.setDate(date.getDate() + 1);
    //判断是否是今日
    let nowDate = convertToTime(convertToString(new Date()));//用于去除小时分钟秒数的影响
    if(date-nowDate == 0) {
        return '今日新闻';
    }

    let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let month = date.getMonth() + 1;;
    let day = date.getDate();
    let week = weeks[date.getDay()];
    let dateString = '';
    if(month < 10) {
        dateString += '0' + month + '月';
    } else {
        dateString += month + '月';
    }
    if(day < 10) {
        dateString += '0' + day + '日';
    } else {
        dateString += day + '日';
    }

    return dateString + ' ' + week;
}
