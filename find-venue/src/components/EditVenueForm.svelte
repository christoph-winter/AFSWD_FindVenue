<script>
    import {push} from "svelte-spa-router";
    import {getContext, onMount} from 'svelte'

    export let venueId;

    const venueService = getContext("VenueService");
    let venue;
    let categories;
    let title;
    let description;
    let latitude;
    let longitude;
    let selectedCategories;
    let errorMessage;

    onMount(async () => {
        venue = await venueService.getVenue(venueId);
        title = venue.title;
        description = venue.description;
        latitude = venue.latitude;
        longitude = venue.longitude;
        selectedCategories = venue.categories.map(function (item) {
            return item["_id"];
        });
        categories = await venueService.getCategories();
    });

    async function updateVenue() {
        let updatedVenue = {
            title: title,
            description: description,
            latitude: latitude,
            longitude: longitude,
            categories: selectedCategories,
        }
        let success = await venueService.updateVenue(venueId, updatedVenue);
        if (success) {
            await push("/dashboard")
        } else errorMessage = "Error could not update Venue";
    }
</script>
{#if venue}
    <form on:submit|preventDefault={updateVenue}>
        <div class="field">
            <label class="label">Venue Name</label>
            <input class="input" type="text" bind:value={title} name="title">
        </div>
        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <textarea name="description" class="textarea" bind:value="{description}"></textarea>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-body">
                <div class="field">
                    <label class="label">Latitude</label>
                    <p class="control has-icons-left">
                        <input name="latitude" class="input" type="text" bind:value="{latitude}">
                        <span class="icon is-small is-left">
                <i class="fa-solid fa-location-crosshairs"></i>
            </span>
                    </p>
                </div>
                <div class="field">
                    <label class="label">Longitude</label>
                    <p class="control has-icons-left">
                        <input name="longitude" class="input" type="text" bind:value="{longitude}">
                        <span class="icon is-small is-left">
                        <i class="fa-solid fa-location-crosshairs"></i>
                    </span>
                    </p>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Category</label>
            <div class="control">
                <div class="select is-multiple">
                    <select multiple name="categories" bind:value={selectedCategories}>
                        {#if categories}
                            {#each categories as category}
                                <option value="{category._id}"
                                        selected={selectedCategories.includes(category._id)}>{category.title}</option>
                            {/each}
                        {/if}
                    </select>
                </div>
            </div>
        </div>
        <button class="button is-link">Edit Venue</button>

        {#if errorMessage}
            <div id="errorBox" class="notification is-danger">
                <button class="delete" type="button"
                        onclick="document.getElementById('errorBox').style.display='none'"></button>
                {errorMessage}
            </div>
        {/if}

    </form>
{/if}