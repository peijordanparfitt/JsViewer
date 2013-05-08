dojo.require("esri.map");
dojo.require("esri.arcgis.utils");
dojo.require("esri.virtualearth.VETiledLayer");

dojo.require("dijit.dijit"); // optimize: load dijit layer

dojo.require("dijit.TitlePane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");

dojo.require("esri.dijit.BasemapGallery");
dojo.require("esri.dijit.Geocoder");
dojo.require("esri.dijit.Legend");
dojo.require("esri.dijit.Popup");
dojo.require("esri.dijit.Scalebar");
dojo.require("dojo.fx")
dojo.require("agsjs.dijit.TOC");

var map;
var layerInfo = [];

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

    dojo.connect(map, 'onLayerAdd', function (results) {
        var toc = new agsjs.dijit.TOC({
            map: map,
            layerInfos: layerInfo
        }, 'tocDiv');
        toc.startup();
    });


    dojo.connect(map, "onLoad", mapReady);

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
    
    var geocoder = new esri.dijit.Geocoder({
        map: map,
        autoComplete: true,
        arcgisGeocoder: {
            name: "Esri World Geocoder",
            suffix: ""
        }
    }, "searchDiv");
    geocoder.startup();

   /* dojo.connect(geocoder, "onFindResults", function (results) {
        Alert(dojo.toJson(results));
    });*/

}


function mapReady(map) {

    for (var i = 0; i < mapLayers.length; i++) {
        var newLayer = new esri.layers.ArcGISDynamicMapServiceLayer(mapLayers[i].url, { opacity: mapLayers[i].opacity });
        layerInfo.push({ layer: newLayer, title: mapLayers[i].name });
        map.addLayer(newLayer);

        dojo.connect(map, "onClick", function (evt) {
            var identifyParams = new esri.tasks.IdentifyParameters();
            identifyParams.tolerance = 3;
            identifyParams.returnGeometry = true;
            identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
            identifyParams.width = map.width;
            identifyParams.height = map.height;
            identifyParams.geometry = evt.mapPoint;
            identifyParams.mapExtent = map.extent;

            for (var y = 0; y < mapLayers.length; y++) {
                var identifyTask = new esri.tasks.IdentifyTask(mapLayers[y].url);
                var deferred = identifyTask.execute(identifyParams);
            }

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
        });

    }
}