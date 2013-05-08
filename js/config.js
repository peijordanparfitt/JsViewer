﻿var mapConfig = {
    initialCenter: [-81.3794, 28.5381],
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

var initialCenter = [-81.3794, 28.5381];
var intialZoom = 10;

var mapLayers = [
        {
            name: "Map Layers",
            url: "http://192.168.7.114/arcgis/rest/services/FiberNet/Base/MapServer",
            opacity: 1,
        }
    ];

var idents = [
        {   
            layerName: "OrlandoSplicesPt",
            layerContent:"NAME: ${ORL-EN-00096} <br>" + 
            "EA2: ${FLORIDA} <br>" + 
            "NAME_1: ${Seminole} <br>" + 
            "COUNTY_KEY: ${COUNTY_KEY} <br>"
        },
        {
            layerName: "OrlandoSlacksPt",
            layerContent: "NAME: ${NAME} <br>" + 
            "EA2: ${EA2} <br>" + 
            "LOCATEID: ${LOCATEID} <br>" + 
            "OWNER: ${OWNER} <br>" + 
            "MEDIUM: ${MEDIUM} <br>" + 
            "MANUFACTUR: ${MANUFACTUR} <br>"
        },
        {
            layerName: "OrlandoAPPt",
            layerContent: "NAME: ${NAME} <br>" + 
            "ADDRESSNOT: ${ADDRESSNOT} <br>" +
            "PLACEMENT: ${PLACEMENT} <br>" + 
            "OWNER: ${OWNER} <br>" + 
            "EA2: ${EA2} <br>" + 
            "NAME_1: ${NAME_1} <br>"
        },
        {
            layerName: "OrlandoMetro",
            layerContent: "NAME: ${NAME} <br>" +
            "PLACEMENT: ${PLACEMENT} <br>" +
            "EA2: ${EA2} <br>" +
            "OWNER: ${OWNER} <br>" +
            "MEDIUM: ${MEDIUM} <br>" +
            "MANUFACTUR: ${MANUFACTUR} <br>"
        }
    ];



