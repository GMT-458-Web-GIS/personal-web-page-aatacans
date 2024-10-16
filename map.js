let map; 

const createMap = () => {
    if (!map) { 
        map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                }),
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([35.0, 39.0]),
                zoom: 6,
            }),
        });

        cities.forEach(city => {
            const marker = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat(city.coordinates)),
                name: city.name,
            });

            const vectorSource = new ol.source.Vector({
                features: [marker],
            });

            const markerVectorLayer = new ol.layer.Vector({
                source: vectorSource,
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        src: 'https://openlayers.org/en/v6.8.1/examples/data/icon.png',
                    }),
                }),
            });

            map.addLayer(markerVectorLayer);
        });
    }
};

document.getElementById('logo').addEventListener('click', (event) => {
    event.preventDefault(); 
    const mapDiv = document.getElementById('map');

    if (mapDiv.style.display === 'none' || mapDiv.style.display === '') {
        mapDiv.style.display = 'block'; 
        createMap(); 
    } else {
        mapDiv.style.display = 'none'; 
    }
});
