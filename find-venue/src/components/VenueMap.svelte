<script>
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from '../services/leaflet-map';
    import {getContext, onMount} from "svelte";

    const venueService = getContext("VenueService");

    export let id;
    export let activeLayer = "Terrain";
    export let zoom = 8;
        export let height = 800;
    const mapConfig = {
        location: {lat: 49.01930808084343, lng: 12.106906822910224},
        zoom: zoom,
        minZoom: 1,
    };

    onMount(async () => {
        const map = new LeafletMap(id, mapConfig, activeLayer);
        map.showZoomControl();

        const venues = await venueService.getVenues();
        const categories = await venueService.getCategories();
        categories.forEach(category => {
            if(category) {
                map.addLayerGroup(category.title);
            }
        });
        venues.forEach(venue => {
            addVenueMarker(venue);
        });
        function addVenueMarker(venue) {
            map.addMarker({lat: venue.latitude, lng: venue.longitude}, venue.title, venue.categories.map(function(item) { return item["title"]; }));
        }
        map.showLayerControl();
    });
</script>

<div class="box" id={id} style="height:{height}px">
</div>