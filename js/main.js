dojo.require("esri.map");
dojo.require("esri.arcgis.utils");
dojo.require("esri.virtualearth.VETiledLayer");

dojo.require("dijit.TitlePane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");

dojo.require("esri.dijit.BasemapGallery");
dojo.require("esri.dijit.Geocoder");
dojo.require("esri.dijit.Legend");
dojo.require("esri.dijit.Popup");
dojo.require("esri.dijit.Scalebar");


var map;
var identifyTask, identifyParams;

function init() {
    //setup the popup window 
    var popup = new esri.dijit.Popup({
        fillSymbol: new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]))
    }, dojo.create("div"));

    map = new esri.Map("map", {
        basemap: "satellite",
        center: initialCenter,
        zoom: intialZoom,
        infoWindow: popup
    });

    dojo.connect(map, "onLoad", mapReady);

    var landBaseLayer = new esri.layers.ArcGISDynamicMapServiceLayer(baseURL, { opacity: 1 });
    map.addLayer(landBaseLayer);

    //legend
    try { //use try/catch to block error
        var layerInfo = [{ layer: landBaseLayer, title: ""}];
        if (layerInfo.length > 0) {
            var legendDijit = new esri.dijit.Legend({
                map: map,
                layerInfos: layerInfo
            }, "legendDiv");
            legendDijit.startup();
        }
    }
    catch (error) {

    }

    addMapParts();
}

function addMapParts() {

    //scalebar
    var scalebar = new esri.dijit.Scalebar({
        map: map,
        // "dual" displays both miles and kilmometers
        // "english" is the default, which displays miles
        // use "metric" for kilometers
        scalebarUnit: "dual"
    });

    //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
    var basemapGallery = new esri.dijit.BasemapGallery({
        showArcGISBasemaps: true,
        map: map
    }, "basemapGallery");
    basemapGallery.startup();

    dojo.connect(basemapGallery, "onError", function (msg) { console.log(msg) });

    var geocoder = new esri.dijit.Geocoder({
        map: map,
        autoComplete: true,
        arcgisGeocoder: {
            name: "Esri World Geocoder",
            suffix: ""
        }
    }, "searchDiv");
    geocoder.startup();

}


function mapReady(map) {
    dojo.connect(map, "onClick", executeIdentifyTask);
    //create identify tasks and setup parameters 
    identifyTask = new esri.tasks.IdentifyTask(baseURL);

    identifyParams = new esri.tasks.IdentifyParameters();
    identifyParams.tolerance = 3;
    identifyParams.returnGeometry = true;
    identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
    identifyParams.width = map.width;
    identifyParams.height = map.height;
}

function executeIdentifyTask(evt) {
    identifyParams.geometry = evt.mapPoint;
    identifyParams.mapExtent = map.extent;

    var deferred = identifyTask.execute(identifyParams);

    deferred.addCallback(function (response) {
        // response is an array of identify result objects    
        // Let's return an array of features.
        return dojo.map(response, function (result) {
            var feature = result.feature;
            for (var i = 0; i < idents.length; i++) {
                var object = idents[i];
                if (result.layerName === object.layerName) {
                    var template = new esri.InfoTemplate("", object.layerContent);
                    feature.setInfoTemplate(template);
                }
            }
            return feature;
        });
    });

    // InfoWindow expects an array of features from each deferred
    // object that you pass. If the response from the task execution 
    // above is not an array of features, then you need to add a callback
    // like the one above to post-process the response and return an
    // array of features.
    map.infoWindow.setFeatures([deferred]);
    map.infoWindow.show(evt.mapPoint);
}
