/**
 *
 * OpenLayersPanel
 * 2016/07/04 taguchi
 *
 */
var OpenLayersPanel = {
	Initialize: function(){
		var map = new OpenLayers.Map(ConstTags.OpenLayersPanel);

		var ol_wms = new OpenLayers.Layer.WMS(
		    "OpenLayers WMS",
		    "http://vmap0.tiles.osgeo.org/wms/vmap0",
		    {layers: "basic"}
		);

		var dm_wms = new OpenLayers.Layer.WMS(
		    "Canadian Data",
		    "http://www2.dmsolutions.ca/cgi-bin/mswms_gmap",
		    {
		        layers: "bathymetry,land_fn,park,drain_fn,drainage," +
		                "prov_bound,fedlimit,rail,road,popplace",
		        transparent: "true",
		        format: "image/png"
		    },
		    {isBaseLayer: false, visibility: false}
		);

		map.addLayers([ol_wms, dm_wms]);
		map.addControl(new OpenLayers.Control.LayerSwitcher());
		map.zoomToMaxExtent();
	}
}