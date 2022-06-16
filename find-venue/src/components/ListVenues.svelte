<script>
    import {getContext, onMount} from 'svelte'
    import {user} from "../stores.js";
    import {parseJwt} from "../utils/UserUtils.js";

    const venueService = getContext("VenueService");
    let venues = [];
    let userDetails = {};
    onMount(async () => {
        venues = await venueService.getVenues();
        if ($user.token) userDetails = parseJwt($user.token);
    });

</script>
<div class="box box-link-hover-shadow">
    <a class="button is-danger" href="/#/venues/addvenue">
        Add New Venue
    </a>
</div>
{#each venues as venue}
    <div class="box box-link-hover-shadow">
        <h2 class="title" style="color:rgb(201, 6, 6)">
            {venue.title}
        </h2>
        <h3 class="subtitle heading">
            {#each venue.categories as category}
                <strong>[{category.title}] </strong>
            {/each}
        </h3>
        <div class="columns">
            <div class="column">
                <p class="title is-6">Description:</p>

                {venue.description}

            </div>
        </div>
        <div class="columns mt-2">
            <div class="column">
                <p class="title is-6">Latitude:</p>
                {venue.latitude}
            </div>
            <div class="column">
                <p class="title is-6">Longitude:</p>
                {venue.longitude}
            </div>
        </div>
        <div class="columns">
            <div class="column">
                {#if venue.creator}
                    <p class="title is-6">Author:</p>

                    {venue.creator.username}
                {/if}
            </div>
            {#if  venue.creator?._id === userDetails.id || userDetails.isadmin}
                <div class="column">
                    <a href="/#/venues/edit?id={venue._id}">
                        <button class="button is-pulled-right">
                    <span class="icon is-small">
                        <i class="fa-solid fa-pen"></i>
                    </span>
                        </button>
                    </a>
                </div>
            {/if}
        </div>
    </div>


{/each}