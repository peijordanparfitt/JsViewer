
dojo.require("esri.map");
dojo.require("esri.toolbars.draw");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dojox.grid.DataGrid");
dojo.require("dojo._base.lang");

var map, toolbar, symbol, geomTask;
var toolbarActive = false;
var csvData;
var grid;

function activateTool(type) {
    toolbarActive = true;
    toolbar.activate(esri.toolbars.Draw[type]);
}

function createToolbar(themap) {
    // loop through all dijits, connect onClick event
    // listeners for buttons to activate drawing tools
    toolbar = new esri.toolbars.Draw(map);
    dojo.connect(toolbar, "onDrawEnd", addToMap);
    
}

function addToMap(geometry) {
    var symbol;
    toolbar.deactivate();
    map.showZoomSlider();
    switch (geometry.type) {
        case "point":
        case "multipoint":
        symbol = new esri.symbol.SimpleMarkerSymbol();
        break;
        case "polyline":
        symbol = new esri.symbol.SimpleLineSymbol();
        break;
        default:
        symbol = new esri.symbol.SimpleFillSymbol();
        break;
    }
    var graphic = new esri.Graphic(geometry, symbol);
    map.graphics.clear();
    map.graphics.add(graphic);
}

function executeQuery() {
    var queryTask = new esri.tasks.QueryTask("http://gisdev2.patrickco.com/arcgis/rest/services/Telug/AppService_Cust_Sales/MapServer/1");
    

    //build query filter
    var query = new esri.tasks.Query();
    query.where = "1=1";
    query.returnGeometry = true;
    query.outFields = ["*"];
    query.geometry = map.graphics.graphics[0].geometry;
    //execute query
    queryTask.execute(query, gridResults);
}

require(['dojo/_base/lang', 'dojox/grid/DataGrid', 'dojo/data/ItemFileWriteStore', 'dojo/dom', 'dojo/domReady!'],
function gridSetup() {

    /*set up layout*/

    /*create a new grid*/
    grid = new dojox.grid.DataGrid({
        id: 'grid',
        structure: gridLayout,
        height: '85%'
    });

    /*append the new grid to the div*/
    grid.placeAt("tableDiv");

    /*Call startup() to render the grid*/
    grid.startup();

});

function gridResults(results) {
    /*set up data store*/
    var data = {
        identifier: "id",
        items: []
    };

    csvData = [];
    for (var i = 0, il = results.features.length; i < il; i++) {
        var tempArray = [];
        for (var index in results.features[i].attributes) {
            tempArray.push(results.features[i].attributes[index]);
        }
        csvData.push(tempArray);
    }

    var gridData = [];
    for (var i = 0, il = results.features.length; i < il; i++) {
        var tempArray = [];
        var obj = '{"';
        for (var value in gridLayout[0]) {
            obj += gridLayout[0][value].field.toString();
            obj += '":"';
            obj += results.features[i].attributes[gridLayout[0][value].field];
            obj += '","';
        }
        var lastIndex = obj.lastIndexOf(',"')
        obj = obj.substring(0, lastIndex);
        obj += "}";
        gridData.push(JSON.parse(obj));
    }

    for (var i = 0, l = gridData.length; i < gridData.length; i++) {
        data.items.push(dojo._base.lang.mixin({ id: i + 1 }, gridData[i % l]));
    }

    var store = new dojo.data.ItemFileWriteStore({ data: data });
    grid.setStore(store);
}

function zoomToFeature(feature) {
    if (feature) {
        var gsvc = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
        var outSR = new esri.SpatialReference({ wkid: 102113 });
        gsvc.project([feature.geometry], outSR, function (projectedPoints) {
            pt = projectedPoints[0];
            map.centerAndZoom(pt, 18);
        });
    } else {
        alert("No results matched your search.");
    }
}

function downloadCSV() {
    if (csvData.length == 0) {
        alert("Please do a query first.");
    }
    else {
        var csvContent = "data:text/csv;charset=utf-8,";
        csvData.forEach(function (infoArray, index) {

           dataString = infoArray.join(",");
           csvContent += index < infoArray.length ? dataString+ "\n" : dataString;

        });

       var encodedUri = encodeURI(csvContent);


       var encodedUri = encodeURI(csvContent);
       var link = document.createElement("a");
       link.setAttribute("href", encodedUri);
       link.setAttribute("download", "my_data.csv");

       link.click(); // This will download the data file named "my_data.csv".
    }
}