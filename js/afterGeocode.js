dojo.require("esri.tasks.ClosestFacilityTask");
dojo.require("esri.tasks.ClosestFacilityParameters");
dojo.require("esri.tasks.BufferParameters");

function afterGeocodeInit(results) {
    //Geometry Service Endpoint
    var gsvc = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

    // Listen for GeometryService onBufferComplete event
    dojo.connect(gsvc, "onBufferComplete", function (geometries) {
    
        var facilities = new esri.tasks.FeatureSet();
        facilities.features = [new esri.Graphic(geometries[0])]; ;

        var params = new esri.tasks.ClosestFacilityParameters();
        params.facilities = facilities;
        params.outSpatialReference = map.spatialReference;

        var closestFacilityTask = new esri.tasks.ClosestFacilityTask("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/NAServer/Closest Facility")
        closestFacilityTask.solve(params, function (solveResult) {
            alert('success');
        });
    });



    var params = new esri.tasks.BufferParameters();
    params.geometries = [results.results[0].feature.geometry];

    // Buffer in linear units such as meters, km, miles etc.
    params.distances = [100];
    params.unit = esri.tasks.GeometryService.UNIT_STATUTE_MILE;
    params.bufferSpatialReference = map.spatialReference;
    params.outSpatialReference = map.spatialReference;
    gsvc.buffer(params);
}

