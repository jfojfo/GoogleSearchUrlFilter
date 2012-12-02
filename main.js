var a = $("#ires h3 a");
a.attr("onmousedown", null);
return;

var url = window.location.href;
var pattern = /url\=([^&]+)/g;
url.match(pattern);
var realurl = RegExp.$1;
window.location.href = urldecode(realurl);

function urldecode(encodedString)
{
    var output = encodedString;
    var binVal, thisString;
    var myregexp = /(%[^%]{2})/;
    function utf8to16(str)
    {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = str.length;
        i = 0;
        while(i < len) 
        {
            c = str.charCodeAt(i++);
            switch(c >> 4)
            { 
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                out += str.charAt(i-1);
                break;
                case 12: case 13:
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
                case 14:
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                break;
            }
        }
        return out;
    }
    while((match = myregexp.exec(output)) != null
                && match.length > 1
                && match[1] != '')
    {
        binVal = parseInt(match[1].substr(1),16);
        thisString = String.fromCharCode(binVal);
        output = output.replace(match[1], thisString);
    }
    return utf8to16(output);
}