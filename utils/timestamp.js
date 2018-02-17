exports.getTimestamp = function() {
  const date = new Date();
  let hour = date.getHours();
  hour = addZero(hour);

  let min  = date.getMinutes();
  min = addZero(min);

  let sec = date.getSeconds();
  sec = addZero(sec);

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = addZero(month);

  let day =  date.getDate();
  day = addZero(day);

  return year + '-' + month + '-' + day + '_' + hour + ':' + min + ':' + sec;
};

function addZero(value) {
  return (value < 10 ? '0' : '') + value;
}
