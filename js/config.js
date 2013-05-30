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

var mapServiceList = {
    "service":
						[
							{
							    "ServiceName": "Household",
                                "ServiceId": "Household",
							    "ServiceUrl": "http://server.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Average_Household_Size/MapServer",
							    "ServiceType": "ArcGISDynamicMapServiceLayer",
							    "ServiceOptions": ""
							},
                            {
                                "ServiceName": "Plant Infrastructure",
                                "ServiceId": "PlantInfrastructure",
                                "ServiceUrl": "http://gisdev2.patrickco.com/arcgis/rest/services/Telug/MapService_PlantInfrastructure/MapServer",
                                "ServiceType": "ArcGISDynamicMapServiceLayer",
                                "ServiceOptions": ""
                            },
							{
							    "ServiceName": "Customers",
                                "ServiceId": "Customers",
							    "ServiceUrl": "http://gisdev2.patrickco.com/arcgis/rest/services/Telug/MapService_CustomersDisplay/MapServer",
							    "ServiceType": "ArcGISDynamicMapServiceLayer",
							    "ServiceOptions": ""
                            },
                            {
                                "ServiceName": "Base",
                                "ServiceId": "Base",
							    "ServiceUrl": "http://gisdev2.patrickco.com/arcgis/rest/services/Telug/MapService_Base/MapServer",
							    "ServiceType": "ArcGISDynamicMapServiceLayer",
							    "ServiceOptions": ""
                            }
						]
};

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
            "Location: ${LOCATIONCI} <br>"
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
            "Location: ${LOCATIONCI} <br>"
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
            "Location: ${LOCATIONCI} <br>"

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