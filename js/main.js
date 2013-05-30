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
dojo.require("dojo.request")
dojo.require("agsjs.dijit.TOC");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dojox.layout.ExpandoPane");

var map;
var layerInfo = [];
var closestFacilityTask;

function init() {
    //setup the popup window 
    var popup = new esri.dijit.Popup({
        fillSymbol: new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]))
    }, dojo.create("div"));

    map = new esri.Map("map", {
        basemap: "satellite",
        center: mapConfig.initialCenter,
        zoom: mapConfig.intialZoom,
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

function mapReady(map) {
    addServices();
    enableIdentify();
    createToolbar();
}

function enableIdentify() {
    if (mapConfig.doIdentify) {
        dojo.connect(map, "onClick", function (evt) {
            if (!toolbarActive) {
                for (i = 0; i < map.layerIds.length; i++) {
                    if (map.getLayer(map.layerIds[i]).visible) {
                        var identifyParams = new esri.tasks.IdentifyParameters();
                        identifyParams.tolerance = 15;
                        identifyParams.returnGeometry = true;
                        identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
                        identifyParams.width = map.width;
                        identifyParams.height = map.height;
                        identifyParams.geometry = evt.mapPoint;
                        identifyParams.mapExtent = map.extent;
                        var identifyTask = new esri.tasks.IdentifyTask(map.getLayer(map.layerIds[i]).url);

                        var deferred = identifyTask.execute(identifyParams);

                        deferred.addCallback(function (response) {
                            return dojo.map(response, function (result) {
                                var feature = result.feature;
                                for (var i = 0; i < idents.length; i++) {
                                    var object = idents[i];
                                    if (result.layerName === object.layerName) {
                                        var template = new esri.InfoTemplate("", object.layerContent);
                                        feature.setInfoTemplate(template);
                                        map.infoWindow.setFeatures([deferred]);
                                        map.infoWindow.show(evt.mapPoint);
                                    }
                                }
                                return feature;
                            });
                        });
                    }
                }
            }
        });
    }
}


function addServices() {
    for (i = 0; i < mapServiceList.service.length; i++) {
        var newLayer = addMapService(mapServiceList.service[i]);
        layerInfo.push({ layer: newLayer, title: mapServiceList.service[i].ServiceName });
        map.addLayer(newLayer);
    }
}

function addMapService(service) {
    var thisServiceName = service.ServiceId + 'Service';
    var serviceText = "var " + thisServiceName + " = new esri.layers." + service.ServiceType + "(\"" + service.ServiceUrl + "\", {id: \'" + service.ServiceId + "\'";
    if (service.ServiceOptions.length > 0) {
        serviceText += ", " + service.ServiceOptions;
    }
    serviceText += "});";
    eval(serviceText);
    return (eval(thisServiceName));
}




function addMapParts() {
    //scalebar
    if (mapConfig.showScalebar) {
        var scalebar = new esri.dijit.Scalebar({
            map: map,
            scalebarUnit: "dual"
        });
    }
    
    //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
    if (mapConfig.showBasemapGallery) {
        var basemapGallery = new esri.dijit.BasemapGallery({
            showArcGISBasemaps: true,
            map: map
        }, "basemapGallery");
        basemapGallery.startup();
    }

    if (mapConfig.geocoder.show) {
        var geocoder = new esri.dijit.Geocoder({
            autoNavigate: mapConfig.autoNavigate,
            map: map,
            autoComplete: mapConfig.geocoder.autoComplete,
            arcgisGeocoder: {
                name: "Esri World Geocoder",
                suffix: ""
            }
        }, "searchDiv");
        geocoder.startup();

        dojo.connect(geocoder, "onFindResults", function (results) {
            map.setExtent(results.results[0].extent);
        });
    }

}