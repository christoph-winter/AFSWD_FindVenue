<script>
    import ListVenues from "../components/ListVenues.svelte";
    import {onMount} from "svelte";
    import {user} from "../stores.js";
    import {replace} from "svelte-spa-router";

    onMount(async () => {
        if (!$user.email)
            await replace("/login")
    });
</script>

<section class="section">
    <ListVenues/>
</section>
