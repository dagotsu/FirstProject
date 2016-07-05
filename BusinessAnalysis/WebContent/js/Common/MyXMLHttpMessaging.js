/**
 *
 */
var MyXMLHttpMessaging = {
		SendByPost:function(servletURL, props, callback){
			//IE8対策
			if (window.XMLHttpRequest)
			{
				XMLRequest = new XMLHttpRequest();
			}
			else
			{
				XMLRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
			XMLRequest.open("POST", servletURL, true);
			XMLRequest.setRequestHeader("content-type", "application/x-www-form-urlencoded");
			XMLRequest.onreadystatechange = callback;
			XMLRequest.send(props);
		}
}