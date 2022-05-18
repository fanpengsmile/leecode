
let len = str.length;
function minBaohanSte(str, tar) {
    let s = "", left = 0, right = 0;
    while(right < str.length - 1) {
        s = str.substr(left, right);
        if (s.contions(tar)) {
            left ++;
            len = Math.min(s.length, len);;
        } else {
            left ++;
        }
    }
}