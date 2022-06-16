<script>

    export let venueId;
    import {getContext, onMount} from 'svelte'

    const venueService = getContext("VenueService");
    let venue;

    onMount(async () => {
        venueId = $page.pageId
        venue = await venueService.getVenue(venueId);
    });

    const fileInput = document.querySelector(".file-input");
    fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
            const fileName = document.querySelector(".file-name");
            fileName.textContent = fileInput.files[0].name;
        }
    };
</script>
<h2>Images</h2>
<div class="card">
    {#if venue.images}

        {#each venue.images as image}
            <div class="card-image">
                <figure class="image is-256x256">

                    <img src={image.src}>

                </figure>
            </div>
        {/each}
    {/if}
    <div class="card-content">
        <form action="/dashboard/{venue._id}/uploadimage" method="POST" enctype="multipart/form-data">
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