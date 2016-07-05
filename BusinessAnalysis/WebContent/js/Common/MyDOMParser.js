/**
 * DOMパーサ
 *
 */
var MyDOMParser = {
		CreateObjFromXML:function(XMLText){
			if(window.DOMParser){
				var dom_parser = new DOMParser();
				var document_obj = dom_parser.parseFromString(XMLText , "application/xml");
				if(document_obj.getElementsByTagName("parsererror").length == 0){
					return document_obj;
				}
			}else{
				var document_obj = new ActiveXObject("Microsoft.XMLDOM");
				document_obj.async = false;
				document_obj.loadXML(XMLText);
				if(document_obj.documentElement){
					return document_obj;
				}
			}
			return null;
		}
}