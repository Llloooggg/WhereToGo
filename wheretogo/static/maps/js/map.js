const copy = "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osm = L.tileLayer(url, { attribution: copy });
const map = L.map("map", { layers: [osm], minZoom: 5 });
map.
    locate()
    .on("locationfound", (e) => map.setView(e.latlng, 8))
    .on("locationerror", () => map.setView([0, 0], 5));

async function load_facilities() {
    const facilities_url = `/api/facilities/?in_bbox=${map.getBounds().toBBoxString()}`
    const response = await fetch(facilities_url)
    const geojson = await response.json()
    return geojson
}

async function render_facilities() {
    const facilities = await load_facilities();
    L.geoJSON(facilities)
        .bindPopup((layer) => layer.feature.properties.name)
        .addTo(map);
}

map.on("moveend", render_facilities);
