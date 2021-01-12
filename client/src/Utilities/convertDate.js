//get date.now and convert
const convert = function (date){
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const a = date.split('T');
    const d = a[0].split("-");
    const t = a[1].substr(0, 5).split(':');

    return `${months[d[1] - 1]} ${d[2]}, ${d[0]} - ${t[0] > 12 ? t[0] - 12 : t[0]}:${t[1]}${t[0] > 12 ? "PM" : "AM"}`;
}

export default convert;