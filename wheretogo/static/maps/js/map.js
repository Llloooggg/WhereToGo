const copy = "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osm = L.tileLayer(url, { attribution: copy });
const map = L.map("map", { layers: [osm], minZoom: 5 });
map.
    locate()
    .on("locationfound", (e) => map.setView(e.latlng, 12))
    .on("locationerror", () => map.setView([0, 0], 5));


async function loadFacilities() {
    const facilities_url = `/api/facilities/?in_bbox=${map.getBounds().toBBoxString()}`
    const response = await fetch(facilities_url)
    const geojson = await response.json()
    return geojson
}

async function renderFacilities() {
    const facilities = await loadFacilities();
    L.geoJSON(facilities, {
        onEachFeature: function (feature) {

            var facilityMarkerStyle = L.Icon.extend({
                options: {
                    iconSize: [20, 20],
                }
            });

            var facilityMarker = new facilityMarkerStyle({ iconUrl: document.getElementById("facilityMarkerURL").innerHTML });

            var lat = feature.geometry.coordinates[1];
            var lon = feature.geometry.coordinates[0];

            L.marker([lat, lon], { icon: facilityMarker }).bindPopup(feature.properties.name).addTo(map);
        }
    });
}

map.on("moveend", renderFacilities);


var clickMarker;

map.on("click", function (e) {
    const { lat, lng } = e.latlng;

    const get_addr_api = `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=18&format=jsonv2`;

    fetchAddressData(get_addr_api).then((data) => {
        var { city, house_number, road } = data.address;

        if (clickMarker != undefined) {
            map.removeLayer(clickMarker);
        };

        clickMarker = L.marker([data.lat, data.lon],).addTo(map);

        var popupText = '<p>' + city + ', ' + road
        if (house_number) {
            popupText += ', ' + house_number
        }
        popupText += '</p>'

        clickMarker.bindPopup(popupText).openPopup();

    });

    async function fetchAddressData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(err);
        }
    };
})
