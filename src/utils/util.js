export const limitShowNum = (txt, num) => {
  let str = txt;
  if (str && num < str.length) {
    str = str.substr(0, num) + '...';
    return str;
  } else {
    return str;
  }
}

export const callPhone = (phoneNumber) => {
  window.location.href = 'tel://' + phoneNumber
}

// export const getQueryString = (name) => {
//   var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//   console.log(window.location.toString().split('?'), 'kkk');
//   var r = window.location.search.substr(1).match(reg);
//   // console.log(window.location,'getQueryString');
//   if (r != null) {
//     return unescape(r[2]);
//   }
//   return null;
// }

export const getQueryString = (paraName) => {
  var url = document.location.toString();
  console.log(document.location, url,'00');
  var arrObj = url.split("?");

  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split("&");
    var arr;

    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");

      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return "";
  } else {
    return "";
  }
}
