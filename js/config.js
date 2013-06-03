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



        var gridLayout = [[
		{ 'field': 'OBJECTID', 'width': '5%' },
		{ 'name': 'Business Name', 'field': 'CUO1LASTNA' , 'width': '20%' },
		{ 'name': 'Customer Status', 'field': 'CustomerStatus', 'width': '25%' },
		{ 'name': 'Has Phone', 'field': 'HasPhone', 'width': '25%' },
		{ 'name': 'Has Video', 'field': 'HasVideo', 'width': '25%' }
	]];
    