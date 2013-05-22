dojo.require("esri.tasks.ClosestFacilityTask");
dojo.require("esri.tasks.ClosestFacilityParameters");
dojo.require("esri.tasks.BufferParameters");

function afterGeocodeInit(results) {
    //build query
    var queryTask = new esri.tasks.QueryTask("http://gisdev2.patrickco.com/arcgis/rest/services/ClosestFacilityDemo/Facilities/MapServer/0");
    

    var incidents = new esri.tasks.FeatureSet();
    incidents.features = [new esri.Graphic(new esri.geometry.Point(results.results[0].feature.geometry.x, results.results[0].feature.geometry.y, map.spatialReference))];

    //build query filter
    var query = new esri.tasks.Query();
    query.where = "1=1";
    query.returnGeometry = true;
    query.outFields = ["*"];
    //execute query
    queryTask.execute(query, showResults);

}

function showResults(results) {

    var facilities = new esri.tasks.FeatureSet();
    for (var i=0;i<9;i++)
    {
        facilities.features.push(new esri.Graphic(new esri.geometry.Point(results.features[i].geometry.x, results.features[i].geometry.y, results.features[i].geometry.spatialReference)));
    }

    var params = new esri.tasks.ClosestFacilityParameters();
    params.defaultCutoff = 3.0;
    params.returnIncidents = false;
    params.returnRoutes = true;
    params.returnDirections = true;
    params.facilities = facilities;
    params.outSpatialReference = results.features[0].geometry.spatialReference;
    params.incidents = incidents;

    //solve 
    closestFacilityTask.solve(params, function (solveResult) {
        var directions = solveResult.directions;
        dojo.forEach(solveResult.routes, function (route, index) {
            //build an array of route info
            var attr = dojo.map(solveResult.directions[index].features, function (feature) {
                return feature.attributes.text;
            });
            routeGraphicLayer.add(route);
            dojo.byId("directionsDiv").innerHTML = "Hover over the route to view directions";
        });

    });
}


var incidents = new esri.tasks.FeatureSet();
function mapClickHandler(evt) {


    var queryTask = new esri.tasks.QueryTask("http://gisdev2.patrickco.com/arcgis/rest/services/ClosestFacilityDemo/Facilities/MapServer/0");


    incidents.features = [new esri.Graphic(new esri.geometry.Point(evt.mapPoint.x, evt.mapPoint.y, map.spatialReference))];

    //build query filter
    var query = new esri.tasks.Query();
    query.where = "1=1";
    query.returnGeometry = true;
    query.outFields = ["*"];
    //execute query
    queryTask.execute(query, showResults1);


}

function showResults1(results) {

    var facilities = new esri.tasks.FeatureSet();
    for (var i = 0; i < 100; i++) {
        facilities.features.push(new esri.Graphic(new esri.geometry.Point(results.features[i].geometry.x, results.features[i].geometry.y, results.features[i].geometry.spatialReference)));
    }

    var params = new esri.tasks.ClosestFacilityParameters();
    params.defaultCutoff = 3.0;
    params.returnIncidents = false;
    params.returnRoutes = true;
    params.returnDirections = false;
    params.facilities = facilities;
    params.outSpatialReference = map.spatialReference;

    params.incidents = incidents;

    //solve 
    closestFacilityTask.solve(params, function (solveResult) {
        var directions = solveResult.directions;
        dojo.forEach(solveResult.routes, function (route, index) {
            //build an array of route info
            var attr = dojo.map(solveResult.directions[index].features, function (feature) {
                return feature.attributes.text;
            });
            routeGraphicLayer.add(route);
            dojo.byId("directionsDiv").innerHTML = "Hover over the route to view directions";
        });

    });
}