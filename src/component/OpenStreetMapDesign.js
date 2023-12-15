// 2.5D
export const Esri_WorldImagery = {
    url : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
	attribution : 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
};

// Default OpenStreetMap
// test
export const OpenStreetMap_Mapnik = {
    url : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};