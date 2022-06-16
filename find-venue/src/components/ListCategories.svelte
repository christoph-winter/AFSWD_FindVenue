<script>
    import {getContext, onMount} from 'svelte'

    const venueService = getContext("VenueService");
    let categories = [];
    onMount(async () => {
        categories = await venueService.getCategories();
    });
    let title = "";
    let description = "";
    let errorMessage = "";

    async function addCategory() {

        let success = await venueService.createCategory(title, description);
        if (success) {
            categories = await venueService.getCategories();
        } else {
            title = "";
            description = "";
            errorMessage = "Error creating new category";
        }
    }
</script>
<div class="box box-link-hover-shadow">
    <p class="title is-4">Categories</p>

    <table class="table">
        <thead>
        <th class="is-size-5 has-text-weight-bold is-uppercase is-underlined">Title</th>
        <th class="is-size-5 has-text-weight-bold is-uppercase is-underlined">Description</th>
        </thead>
        {#each categories as category}
            <tbody>
            <tr>
                <td>
                    <p class="is-size-6 has-text-weight-bold">{category.title}</p>
                </td>
                <td>
                    <p>{category.description}</p>
                </td>
            </tr>
            </tbody>
        {/each}
    </table>
    <section>
        <form on:submit|preventDefault={addCategory}>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <label class="label" for="title">Title</label>
                        <input bind:value={title} id="title" class="input" type="text" placeholder="Enter title"
                               name="title">
                    </div>
                    <div class="field">
                        <label class="label" for="description">Description </label>
                        <input bind:value={description} id="description" class="input" type="text"
                               placeholder="Enter description" name="description">
                    </div>

                </div>
            </div>
            <button class="button is-danger">Add new Category</button>
        </form>
        {#if errorMessage}
            <div id="errorBox" class="notification is-danger">
                <button class="delete" type="button"
                        onclick="document.getElementById('errorBox').style.display='none'"></button>
                <div class="section">
                    {errorMessage}
                </div>

            </div>
        {/if}
    </section>
</div>