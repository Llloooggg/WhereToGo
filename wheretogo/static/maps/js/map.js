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
    L.geoJSON(facilities)
        .bindPopup((layer) => layer.feature.properties.name)
        .addTo(map);
}

map.on("moveend", renderFacilities);


map.on("click", function (e) {
    const { lat, lng } = e.latlng;

    const get_addr_api = `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=18&format=jsonv2`;


    fetchAddressData(get_addr_api).then((data) => {
        const { country, state, city, house_number, road } = data.address;
        console.log(country + ', ' + state + ', ' + city + ', ' + road + ', ' + house_number);

        const get_long_api = `https://nominatim.openstreetmap.org/search.php?q=${road + ' ' + house_number + ' ' + city}&format=jsonv2&limit=1&addressdetails=1`;

        fetchLatLonData(get_long_api).then((data) => {
            const { country, state, city, house_number, road } = data[0].address;
            console.log(country + ', ' + state + ', ' + city + ', ' + road + ', ' + house_number);
        });

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

    async function fetchLatLonData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(err);
        }
    }
})
