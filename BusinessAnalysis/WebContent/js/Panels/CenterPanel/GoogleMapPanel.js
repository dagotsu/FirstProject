/**
 *
 */
var GoogleMapPanel = {
		Initialize:function(){
			var DomIDGoogleMap = "GoogleMap";
			require(["dojo/dom", "dojo/dom-construct", "dojo/domReady!"],function(dom, domConstruct){
				var ddom = dom.byId(DomIDGoogleMap);
				if(!ddom){
					MyStopWatch.Start("GoogleMapパネル初期化開始");
					domConstruct.place("<div id='" + DomIDGoogleMap + "'></div>", ConstTags.GoogleMapPanel);
					var domGM =document.getElementById(DomIDGoogleMap);
					//alert(domGM);
					var map = new google.maps.Map(domGM, {
					    center: {lat: 33.885, lng: 130.885},
					    scrollwheel: true,
					    mapTypeId :google.maps.MapTypeId.ROADMAP,
					    zoom: 18,
					    mapTypeControl : true,
					    navigationControl : true,
					    scaleControl : true
					  });
					MyStopWatch.Stop("GoogleMapパネル初期化完了");
				}
			});
		}
}