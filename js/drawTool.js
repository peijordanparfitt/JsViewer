
dojo.require("esri.map");
dojo.require("esri.toolbars.draw");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dojox.grid.DataGrid");

var map, toolbar, symbol, geomTask;
var toolbarActive = false;
var csvData;

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

function gridResults(results) {
    toolbarActive = true;
    var table = document.getElementById('tableGrid');

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    for (var i = 0, il = gridAttributes.headers.length; i < il; i++) {
        row.insertCell(i).innerHTML = "<b>" + gridAttributes.headers[i].label + "</b>";
    }

    row.insertCell(gridAttributes.headers.length).innerHTML = "";


    for (var i = 0, il = results.features.length; i < il; i++) {
        addRow('tableGrid', results.features[i]);
    }

    csvData = [];
    for (var i = 0, il = results.features.length; i < il; i++) {
        var tempArray = [];
        for (var index in results.features[i].attributes) {
            tempArray.push(results.features[i].attributes[index]);
        }
        csvData.push(tempArray);
    }
}

function addRow(tableID, result) {

    var featureAttributes = result.attributes;
    var table = document.getElementById(tableID);

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    for (var i = 0, il = gridAttributes.headers.length; i < il; i++) {
        if (featureAttributes[gridAttributes.headers[i].value] != null) {
            if (gridAttributes.headers[i].isLink) {
                var preLink = gridAttributes.headers[i].preLink.toString();
                var midLink = featureAttributes[gridAttributes.headers[i].value];
                var postLink = gridAttributes.headers[i].postLink.toString();
                row.insertCell(i).innerHTML = preLink + midLink + postLink;
            } else {
                row.insertCell(i).innerHTML = featureAttributes[gridAttributes.headers[i].value];
            }
        } else {
            row.insertCell(i).innerHTML = "";
        }
    }

    var cell = row.insertCell(gridAttributes.headers.length);
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Zoom to";
    cell.appendChild(button);
    button.onclick = function () {
        zoomToFeature(result);
    };
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