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
            name: "Customers",
            url: "http://gisdev2.patrickco.com/arcgis/rest/services/Telug/MapService_CustomersDisplay/MapServer",
            opacity: 1
        },
        {
            name: "Base",
            url: "http://gisdev2.patrickco.com/arcgis/rest/services/Telug/MapService_Base/MapServer",
            opacity: 1
        },
        {
            name: "Plant Infrastructur",
            url: "http://gisdev2.patrickco.com/arcgis/rest/services/Telug/MapService_PlantInfrastructure/MapServer",
            opacity: 1
        }
    ];

var idents = [

        {
            layerName: "Active Commercial Accounts",
            layerContent:
            "Business Name: ${CUO1LASTNA} <br>" +
            "Customer Status: ${CustomerStatus} <br>" +
            "Has Phone: ${HasPhone} <br>" +
            "Has Video: ${HasVideo} <br>" +
        	"Has Data: ${HasData} <br>" +
            "Distance to Customer: ${DistToCustomer} <br>" +
            "Distance to Fiber: ${DistToFiber} <br>" +
            "Distance to Tower Locations: ${DistToTowerLocations} <br>" +
            "Distance to Fiber Customer: ${DistToFiberCustomer} <br>" +
            "Street Num: ${STREETNUMB} <br>" +
            "Street Name: ${STREETNAME} <br>" +
            "Last Name: ${LOCATIONCI} <br>"
        },
        {
            layerName: "Commercial Prospects (Green)",
            layerContent:
            "Business Name: ${CUO1LASTNA} <br>" +
            "Customer Status: ${CustomerStatus} <br>" +
            "Has Phone: ${HasPhone} <br>" +
            "Has Video: ${HasVideo} <br>" +
        	"Has Data: ${HasData} <br>" +
            "Distance to Customer: ${DistToCustomer} <br>" +
            "Distance to Fiber: ${DistToFiber} <br>" +
            "Distance to Tower Locations: ${DistToTowerLocations} <br>" +
            "Distance to Fiber Customer: ${DistToFiberCustomer} <br>" +
            "Street Num: ${STREETNUMB} <br>" +
            "Street Name: ${STREETNAME} <br>" +
            "Last Name: ${LOCATIONCI} <br>"
        },
        {        
            layerName: "Commercial Prospects (Yellow)",
            layerContent:
            "Business Name: ${CUO1LASTNA} <br>" +
            "Customer Status: ${CustomerStatus} <br>" +
            "Has Phone: ${HasPhone} <br>" +
            "Has Video: ${HasVideo} <br>" +
        	"Has Data: ${HasData} <br>" +
            "Distance to Customer: ${DistToCustomer} <br>" +
            "Distance to Fiber: ${DistToFiber} <br>" +
            "Distance to Tower Locations: ${DistToTowerLocations} <br>" +
            "Distance to Fiber Customer: ${DistToFiberCustomer} <br>" +
            "Street Num: ${STREETNUMB} <br>" +
            "Street Name: ${STREETNAME} <br>" +
            "Last Name: ${LOCATIONCI} <br>"

        }
    ];
    


    var gridAttributes = {
    "headers": [
        {
        	"label": "Business Name",
            "value" : "CUO1LASTNA",
            "isLink": false
        },
        {
        	"label": "Customer Status",
            "value": "CustomerStatus",
            "isLink": false
        },
        {
            "label": "Has Phone",
            "value": "HasPhone",
            "isLink": false
        },
        {
            "label": "Has Video",
            "value": "HasVideo",
            "isLink": false
        },
        {
        	"label": "Has Data",
            "value": "HasData",
            "isLink": false
        }

    ]
    };