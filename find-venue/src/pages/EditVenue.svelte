<script>

    import EditVenueForm from "../components/EditVenueForm.svelte";
    import VenueImages from "../components/VenueImages.svelte";

    const urlSearchParams = new URLSearchParams(window.location.hash.split('?')[1]);
    let venueId;
    if (urlSearchParams.has("id")) {
        venueId = urlSearchParams.get("id");
    }


</script>
<div class="box">
    <div class="columns">
        <div class="column">
            <EditVenueForm {venueId}/>
        </div>
        <!--
            <div class = "column">
                <VenueImages {venueId}/>
            </div>
        -->
    </div>
</div>