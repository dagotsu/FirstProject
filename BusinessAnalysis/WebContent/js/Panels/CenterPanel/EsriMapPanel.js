/**
 *
 */
var EsriMapPanel = {
		map : null,
		Initialize : function(MyLayerInfoForm){
			var DomIDEsriMapAll = "EmALL";
			var DomIDEsriMap = "EM";
			var DomIDAddr = "EMAddr";
			require(["dojo/dom", "dojo/dom-construct", "dojo/on", "esri/map", "esri/geometry/Point",
			         "esri/graphic", "esri/symbols/SimpleMarkerSymbol", "esri/layers/ArcGISTiledMapServiceLayer",
			         "dijit/form/TextBox", "dojo/domReady!"],
					function(dom, domConstruct, on, Map, Point, Graphic, SimpleMarkerSymbol, TiledMapLayer) {
					var ddom = dom.byId(DomIDEsriMap);
					if(!ddom){
						domConstruct.place("<div id='" + DomIDEsriMapAll + "'></div>", ConstTags.EsriMapPanel);
						domConstruct.place("<div id='" + DomIDEsriMap + "'></div>", DomIDEsriMapAll);
						domConstruct.place("<input id='" + DomIDAddr + "' data-dojo-type='dijit/form/TextBox' placeHolder='input addr'></input>", DomIDEsriMapAll);
						EsriMapPanel.map = new Map(DomIDEsriMap, {
							basemap: "streets",  //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
							center: [130.885, 33.885], // longitude, latitude
							zoom: 18
						});
						var tileLayer = new TiledMapLayer("http://192.168.0.200:6080/arcgis/rest/services/TTRI/DEMO_TTRI_BaseMap/MapServer");
						EsriMapPanel.map.addLayer(tileLayer);

						on(dom.byId(DomIDAddr), "change", function(evt){
							MyStopWatch.Start("住所検索開始");
							var gc = new google.maps.Geocoder();
							gc.geocode({ address : evt.target.value }, function(results, status){
								EsriMapPanel.map.graphics.clear();
								if (status == google.maps.GeocoderStatus.OK) {
									for(var i = 0; i < results.length; i++){

										var ll = results[i].geometry.location;
										var glat = ll.lat();
										var glng = ll.lng();
										var p = new Point({"x":ll.lng(), "y":ll.lat(), "spatialReference":{"wkid":4326}});
										EsriMapPanel.map.graphics.add(new Graphic(p, new SimpleMarkerSymbol()));
										if(i === 0)
											EsriMapPanel.map.centerAt(p);
									}
									MyStopWatch.Stop("住所検索完了");
								}

							});

						})
						/*
						var addrTextBox = new textBox({
							name:"addr",
							value:"",
							placeHolder:"address",
						}, DomIDAddr);
						addrTextBox.startup();
						*/
				}
			});
		}
}