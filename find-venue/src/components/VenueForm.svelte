<script>
    import {push} from "svelte-spa-router";
    import {createEventDispatcher, getContext, onMount} from "svelte";
    import {parseJwt} from "../utils/UserUtils.js";
    import {user, venues} from "../stores.js";

    const venueService = getContext("VenueService");
    let title;
    let description;
    let latitude;
    let longitude;
    let selectedCategories;
    let errorMessage;
    let categories;
    onMount(async () => {
        categories = await venueService.getCategories();
    });
    async function addVenue() {
        let userDetails = parseJwt($user.token);
        let creator = userDetails.id;
        let success = await venueService.createVenue(title, description, latitude, longitude, creator, selectedCategories);
        if (success) {
            venues.set(await venueService.getVenues());
            await push("/dashboard");
        } else {
            title = "";
            description = "";
            latitude = "";
            longitude = "";
            selectedCategories = [];
            errorMessage = "Invalid Credentials";
        }

    }
</script>
<form on:submit|preventDefault={addVenue}>
    <div class="field">
        <label class="label" for="venueTitle">Venue Name</label>
        <input id="venueTitle" class="input" bind:value={title} type="text" placeholder="Enter name of venue..."
               name="title">
    </div>
    <div class="field">
        <label class="label" for="venueDescription">Description</label>
        <div class="control">
            <textarea id="venueDescription" bind:value={description} name="description" class="textarea"
                      placeholder="Enter description..."></textarea>
        </div>
    </div>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label class="label" for="venueLat">Latitude</label>
                <p class="control has-icons-left">
                    <input id="venueLat" bind:value={latitude} name="latitude" class="input" type="text"
                           placeholder="Latitude...">
                    <span class="icon is-small is-left">
                <i class="fa-solid fa-location-crosshairs"></i>
            </span>
                </p>
            </div>
            <div class="field">
                <label class="label" for="venueLong">Longitude</label>
                <p class="control has-icons-left">
                    <input id="venueLong" bind:value={longitude} name="longitude" class="input" type="text"
                           placeholder="Longitude...">
                    <span class="icon is-small is-left">
                        <i class="fa-solid fa-location-crosshairs"></i>
                    </span>
                </p>
            </div>
        </div>
    </div>
    <div class="field">
        <label class="label" for="venueCategory">Category</label>
        <div class="control">
            <div class="select is-multiple">
                <select multiple name="categories" bind:value={selectedCategories} id="venueCategory">
                    {#if categories}
                        {#each categories as category}
                            <option value="{category._id}">{category.title}</option>
                        {/each}
                    {/if}
                </select>
            </div>
        </div>
    </div>
    <button class="button is-link">Add Venue</button>

    {#if errorMessage}
        <div id="errorBox" class="notification is-danger">
            <button class="delete" type="button"
                    onclick="document.getElementById('errorBox').style.display='none'"></button>
            {errorMessage}
        </div>
    {/if}
</form>