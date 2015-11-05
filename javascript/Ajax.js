// 创建AjaxRequest对象；
var ajaxReq = new AjaxRequest();

// AjaxRequest构造函数；
function AjaxRequest() {
    // Try the XMLHttpRequest object first
    if (window.XMLHttpRequest) {
        try {
            this.request = new XMLHttpRequest();
        } catch(e) {
            this.request = null;
        }
        // IE；
    } else if (window.ActiveXObject) {
        try {
            this.request = new ActiveXObject("Msxml2.XMLHTTP");
            //老版IE
        } catch(e) {
            try {
                this.request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                this.request = null;
            }
        }
    }

    // If the request creation failed, notify the user
    if (this.request == null)
        alert("Ajax error creating the request.\n" + "Details: " + e);
}

AjaxRequest.prototype.getReadyState = function() {
    return this.request.readyState;
}

AjaxRequest.prototype.getStatus = function() {
    return this.request.status;
}

// Send an Ajax request to the server
AjaxRequest.prototype.send = function(type, url, handler, postDataType, postData) {

    try {
        this.request.onreadystatechange = handler;
        this.request.open(type, url, true); // always asynchronous (true)
        if (type.toLowerCase() == "get") {
            // Send a GET request; no data involved
            this.request.send(null);
        } else {
            // Send a POST request; the last argument is data
            this.request.setRequestHeader("Content-Type", postDataType);
            this.request.send(postData);
        }
    } catch(e) {
        alert("Ajax error communicating with the server.\n" + "Details: " + e);
    }
}

AjaxRequest.prototype.getResponseXML = function() {
    return this.request.responseXML;
}