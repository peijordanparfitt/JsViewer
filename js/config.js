var mapConfig = {
    initialCenter: [-80.3258, 27.4464],
    intialZoom: 10,
    showScalebar: true,
    showBasemapGallery: true,
    geocoder: {
        show: true,
        autoComplete: false,
        autoNavigate: false
    },
    doIdentify: true
};


var mapLayers = [
        {
            name: "Map Layers",
            url: "http://gisdev2.patrickco.com/arcgis/rest/services/Telug/AppService_Cust_Sales/MapServer",
            opacity: 1
        }
    ];

var idents = [

        {
            layerName: "Customers",
            layerContent: "Last Name: ${CUO1LASTNA} <br>" +
            "First Name: ${CUO1FIRSTN} <br>"
        }
    ];



    var gridAttributes = {
    "headers": [
        {
            "label": "Last Name",
            "value": "CUO1LASTNA",
            "isLink": false
        },
        {
            "label": "First Name",
            "value": "CUO1FIRSTN",
            "isLink": false
        }
    ]
    };