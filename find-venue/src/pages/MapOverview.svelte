<script>
    import ListVenues from "../components/ListVenues.svelte";
    import {onMount} from "svelte";
    import {user} from "../stores.js";
    import {replace} from "svelte-spa-router";
    import VenueMap from "../components/VenueMap.svelte";

    onMount(async () => {
        if (!$user.email)
            await replace("/login")
    });
</script>
<div class="tile is-ancestor">
    <div class="tile is-ancestor">
        <div class="tile">
            <div class="tile">
                <div class="tile is-parent">
                    <div class="tile is-child">
                        <VenueMap id="map-main" zoom="{5}" height="{800}" hasLayerControl="{false}"/>
                    </div>
                </div>
            </div>

        </div>
        <div class="tile is-parent is-vertical">
            <div class="tile is-child">
                <div class="content">
                    <VenueMap id="map-zoom" zoom="{16}" height="480" activeLayer="Satellite" hasLayerControl="{false}"/>
                </div>
            </div>
            <div class="tile is-child">
                <VenueMap id="map-secondary" zoom="{12}" height="300" activeLayer="Terrain" hasLayerControl="{false}"/>
            </div>
        </div>
    </div>
</div>
