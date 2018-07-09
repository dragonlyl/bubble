const Const = require('./const');

let Util = {
    go: go,
    goRedirect: goRedirect,
    reLaunchGo: reLaunchGo,
    goBack: goBack,
    showSuccessToast: showSuccessToast,
    inArray: inArray,
    time: time,
    timeFormat: timeFormat,
    getTodayBegin: getTodayBegin,
    getTodayEnd: getTodayEnd,
    timeFormatForHour: timeFormatForHour,
    timeFormatForHMS: timeFormatForHMS,
    timeFormatForYM: timeFormatForYM,
    timeFormatForYMD: timeFormatForYMD,
    numberFormat: numberFormat,
    union: union,
    intersection: intersection,
    difference: difference,
    isEmail: isEmail,
    isPhone: isPhone,
    isNum: isNum,
    getImgUrl: getImgUrl,
    getImgUrlList: getImgUrlList,
    dateFormat: dateFormat,
    setNavigationBarTitle: setNavigationBarTitle,
    showTip: showTip,
    getUserAvatarUrl: getUserAvatarUrl,
    getUploadImgUrl: getUploadImgUrl,
    displayUserName: displayUserName,
    calculateDuration: calculateDuration,
    getVoiceUrl: getVoiceUrl,
    stringTruncate: stringTruncate,
    get: get,
    isHttp: isHttp,
    isHttpNotWX: isHttpNotWX,
    transformObjectToUrlencodedData: transformObjectToUrlencodedData,
    haveHttp:haveHttp
};

function transformObjectToUrlencodedData(obj) {
    let p = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            p.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
    }
    return p.join('&');
}

function isHttp(content) {
    if(/https:\/\/mp.weixin.qq.com\/s\/([0-9a-zA-Z-_]+)/.test(content)) {
        return true
    } else {
        return false
    }
}

function isHttpNotWX(content) {
    if(/(http|https):\/(\/[0-9a-zA-Z-_]+)+/.test(content)) {
        return true
    } else {
        return false
    }
}
function haveHttp(content) {
    if(/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(content)) {
        return true
    } else {
        return false
    }
}

function go(url) {
    wx.navigateTo({url: url});
}

function goRedirect(url) {
    wx.redirectTo({url: url});
}

function reLaunchGo(url) {
    wx.reLaunch({url: url})
}

function goBack(delta = 1) {
    wx.navigateBack(delta);
}

function get(obj, key) {
    return key.split('.').reduce(function (o, x) {
        return (typeof o === 'undefined' || o === null) ? o : o[x]
    }, obj)
}

function showSuccessToast(title, time, url, isGoRedirect = false) {
    wx.showToast({
        title: title,
        icon: 'success',
        duration: time,
        success: function () {
            setTimeout(function () {
                if (isGoRedirect) {
                    goRedirect(url);
                } else {
                    go(url);
                }
            }, time)
        }
    });
}

function inArray(needle, haystack, argStrict) {

    let key = '',
        strict = !!argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    }

    return false;
}

function time() {
    return parseInt(new Date().getTime() / 1000, 10);
}

function getTodayBegin() {
    return parseInt(new Date(new Date().setHours(0, 0, 0, 0)) / 1000);
}
function displayUserName(user, anonymous) {
    if (anonymous) {
        return "匿名"
    }

    if (!user) {
        return "匿名"
    }

    if (user.name) {
        return user.name
    }

    if (user.nickname) {
        return user.nickname
    }

    return "匿名"
}
function getTodayEnd() {
    return parseInt(new Date(new Date().setHours(23, 59, 59, 999)) / 1000);
}

function timeFormat(timeStamp, detail) {
    if (timeStamp <= 0) {
        return '--';
    }
    let date = new Date(timeStamp * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    // xxxx/xx/xx xx:xx:xx
    if (detail === 1) {
        return [year, month, day].map(numberFormat).join('/') + ' ' + [hour, minute, second].map(numberFormat).join(':');
    }
    // xxxx-xx-xx xx:xx
    if (detail === 2) {
        return [year, month, day].map(numberFormat).join('-') + ' ' + [hour, minute].map(numberFormat).join(':');
    }

    // xxxx-xx-xx
    if (detail === 3) {
        return [year, month, day].map(numberFormat).join('-');
    }

    // xx/xx xx:xx
    if (detail === 4) {
        return [month, day].map(numberFormat).join('/') + " " + [hour, minute].map(numberFormat).join(':');
    }

    // 当天返回 xx : xx , 其他返回 xxxx/xx/xx
    if (detail === 5) {
        let todayBegin = getTodayBegin();
        let todayEnd = getTodayEnd();
        if (timeStamp > todayBegin && timeStamp < todayEnd) {
            return [hour, minute].map(numberFormat).join(':');
        }
        return [year, month, day].map(numberFormat).join('/');
    }

	// 当天返回 xx小时之前，其他返回几天前
	if (detail === 6) {
		let nowTime = new Date().getTime()
		let timeDelta = nowTime / 1000 - timeStamp
		if(timeDelta / 86400 <= 1) {
            let hours = parseInt(timeDelta / 3600)
            if(hours === 0) {
                let minutes = parseInt(timeDelta / 60)
                if(minutes === 0) {
                    return '刚刚'
                } else {
                    return `${minutes}分钟前`
                }
            } else {
                return `${hours}小时前`
            }
		} else {
			let days = parseInt(timeDelta / 86400)
			if(days > 30) {
				return '很久以前'
			} else {
				return `${days}天前`
			}
        }
	}

    // x月x日 xx:xx
    return [month, day].map(numberFormat).join('月') + '日 ' + [hour, minute].map(numberFormat).join(':');
}

function calculateDuration(time) {
    let t = time / 1000
    let m = parseInt(t / 60) + ''
    let s = Math.round(t % 60) + ''
    function paddingWithZero(r) {
        return ('00' + r).substring(r.length)
    }
    return `${m}′:${paddingWithZero(s)}″`
}

function timeFormatForHour(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let hour = date.getHours();
    let minute = date.getMinutes();

    return [hour, minute].map(numberFormat).join(":");
}

function timeFormatForYM(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return numberFormat(month) + "月" + numberFormat(day) + "日";
}

function timeFormatForYMD(date, separator, isCN = false) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (isCN) {
        return year + '年 ' + month + '月' + day + '日';
    }
    return [year, month, day].map(numberFormat).join(separator);
}

function timeFormatForHMS(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return [hour, minute, second].map(numberFormat);
}

function numberFormat(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

function union(arr1, arr2) {
    let set1 = new Set(arr1);
    let set2 = new Set(arr2);

    let unionSet = new Set([...set1, ...set2]);
    return [...unionSet];
}

function intersection(arr1, arr2) {
    let set1 = new Set(arr1);
    let set2 = new Set(arr2);

    let intersectionSet = new Set([...set1].filter(x => set2.has(x)));
    return [...intersectionSet];
}

function difference(arr1, arr2) {
    let set1 = new Set(arr1);
    let set2 = new Set(arr2);

    let differenceSet = new Set([...set1].filter(x => !set2.has(x)));
    return [...differenceSet];
}

function isEmail(email) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(email);
}

function isPhone(phone) {
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;
    return reg.test(phone);
}

function isNum(num) {
    let reNum = /^\d*$/;
    return (reNum.test(num));
}

//function dateFormat(micro_second) {
//	// 秒数
//	let second = Math.floor(micro_second / 1000);
//	// 小时位
//	let hr = fill_zero_prefix(Math.floor(second / 3600));
//	// 分钟位
//	let min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
//	// 秒位
//	let sec = fill_zero_prefix((second - hr * 3600 - min * 60));
//	return [hr, "" + min, "" + sec];
//}

function dateFormat(second_time) {
    let second = parseInt(second_time);
    if (parseInt(second_time) > 60) {
        let second = parseInt(second_time) % 60;
        let min = parseInt(second_time / 60);
        if (min > 60) {
            min = parseInt(second_time / 60) % 60;
            let hour = parseInt(parseInt(second_time / 60) / 60);
            if (hour > 24) {
                hour = parseInt(parseInt(second_time / 60) / 60) % 24;
                let day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
                time = [day, hour, fill_zero_prefix(min), fill_zero_prefix(second)];
            } else {
                time = [0, hour, fill_zero_prefix(min), fill_zero_prefix(second)];
            }
        } else {
            time = [0, 0, fill_zero_prefix(min), fill_zero_prefix(second)];
        }
    } else {
        time = [0, 0, 0, fill_zero_prefix(second)];
    }

    return time;
}

function fill_zero_prefix(num) {
    return num < 10 ? "0" + num : num
}

function getUserAvatarUrl(user, anonymous) {
    if (anonymous) {
        return '/static/assets/icon/default-avatar.jpg'
    }
    if (!user) {
        return '/static/assets/icon/default-avatar.jpg'
    }

    if (!user.avatar) {
        return '/static/assets/icon/default-avatar.jpg'
    }

    if (user.avatar.indexOf('http') >= 0) {
        return user.avatar;
    }

    return Const.NET.IMG_URL_PREFIX + user.avatar;
}

function getUploadImgUrl(data) {
    if(!data) {
        return '/static/assets/icon/icon-avatar@2x.png'
    }
    if(data.code) {
        return '/static/assets/icon/icon-avatar@2x.png'
    }
    if(data.cover) {
        return Const.NET.IMG_URL_PREFIX + data.cover
    }
    if(data.name) {
        return Const.NET.IMG_URL_PREFIX + data.name
    }
    if(data.data) {
        return Const.NET.IMG_URL_PREFIX + data.data.name
    }
}

function getVoiceUrl(data) {
    if(!data) {
        return ''
    }
    if(!data.name) {
        return ''
    }
    return Const.NET.FILE_URL_PREFIX + data.name
}

function getImgUrl(img) {
    if (img && img.indexOf('http') >= 0) {
        return img
    }
    if (!img) {
        return '/static/assets/icon/icon-avatar@2x.png'
    }
    return Const.NET.IMG_URL_PREFIX + img;
}

function getImgUrlList(imgList) {
    if (!imgList.length) {
        return []
    }

    let resultList = [];

    imgList.forEach(lt => {
        resultList.push(Const.NET.IMG_URL_PREFIX + lt)
    });
    return resultList
}

function setNavigationBarTitle(title) {
    wx.setNavigationBarTitle({
        title: "title"
    });
}

// 显示内容弹窗，无回调事件
function showTip(title, message) {
    wx.showModal({
        title: title,
        content: message,
        showCancel: false,
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定')
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        }
    })
}

function stringTruncate(str, len) {
    var temp;
    var icount = 0;
    var patrn = /[^\x00-\xff]/;
    var strre = "";
    var leng = str.length;
    for (var i = 0; i < leng; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
            if (patrn.exec(temp) == null) {
                icount = icount + 1
            } else {
                icount = icount + 2
            }
            strre += temp
        } else {
            break
        }
    }
    if (leng < len)
    {
        return strre;
    }
    else
    {
        return strre + '...';
    }
}




module.exports = Util;
