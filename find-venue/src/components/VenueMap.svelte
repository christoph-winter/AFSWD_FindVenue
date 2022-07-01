<script>
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from '../services/leaflet-map';
    import {getContext, onMount} from "svelte";
    import {categories, currentLocation, venues} from "../stores.js";

    const venueService = getContext("VenueService");

    export let id;
    export let activeLayer = "Terrain";
    export let zoom = 8;
    export let height = 800;
    export let hasLayerControl = true;
    const mapConfig = {
        location: {lat: $currentLocation.lat, lng: $currentLocation.long},
        zoom: zoom,
        minZoom: 1,
    };
    let map;
    onMount(async () => {
        venues.set(await venueService.getVenues());
        categories.set(await venueService.getCategories());
        map = new LeafletMap(id, mapConfig, activeLayer);
        map.showZoomControl();


    });
    $:{
        if (map) {
            map.moveTo(zoom, {lat: $currentLocation.lat, lng: $currentLocation.long});
            $categories.forEach(category => {
                if (category) {
                    map.addLayerGroup(category.title);
                }
            });
        }
    }

    $: if (map) {
        $venues.forEach(venue => {
            addVenueMarker(venue);
        });

        function addVenueMarker(venue) {
            map.addMarker({lat: venue.latitude, lng: venue.longitude}, `<strong>${venue.title}</strong>`,
                venue.categories.map(function (item) {
                    return item["title"];
                }), () => {
                    currentLocation.set({lat: venue.latitude, long: venue.longitude})
                });
        }

        if (hasLayerControl) map.showLayerControl();
    }

</script>

<div class="box" id={id} style="height:{height}px">
</div>