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
    <div class="box box-link-hover-shadow">
        <a class="button is-danger" href="/#/venues/addvenue">
            Add New Venue
        </a>
    </div>
<div class="columns">
    <div class="column">
    <ListVenues/>
    </div>
    <div class="column">
        <VenueMap id="dashboard-map"/>
    </div>
</div>
