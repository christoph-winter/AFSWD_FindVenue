<script>

    export let venueId;
    import {getContext, onMount} from 'svelte'

    const venueService = getContext("VenueService");
    let venue;

    onMount(async () => {
        venue = await venueService.getVenue(venueId);
    });

    async function uploadImage(){

    }
</script>
<h2>Images</h2>
<div class="card">
    {#if venue.images}

        {#each venue.images as image}
            <div class="level">
                <figure class="image is-128x128">

                    <img src={image.src}>

                </figure>
            </div>
        {/each}
    {/if}
    <div class="card-content">
        <form on:submit|preventDefault={uploadImage}>
            <div id="file-select" class="file has-name is-fullwidth">
                <label class="file-label"> <input class="file-input" name="imagefile" type="file"
                                                  accept="image/png, image/jpeg">
                    <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
           </span>
                    <span class="file-name"></span>
                </label>
                <button type="submit" class="button is-info">Upload</button>
            </div>
        </form>
    </div>
</div>