<script>
    import {getContext, onMount} from "svelte";
    import {user} from "../stores.js";
    import {push, replace} from "svelte-spa-router";
    import {parseJwt} from "../utils/UserUtils.js";

    const userService = getContext("UserService");
    let firstname = "";
    let lastname = "";
    let errorMessage = "";
    onMount(async () => {
        if (!$user.token) replace("/login");
    })


    async function changeName() {
        let userId = parseJwt($user.token).id;
        let success = await userService.updateName(userId, firstname, lastname);
        if (success) await push("/profile");
        else errorMessage = "Could not update name";
    }

</script>
<form on:submit|preventDefault={changeName}>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label for="firstname" class="label">First Name</label>
                <input bind:value={firstname} class="input" id="firstname" type="text" name="firstname">
            </div>
            <div class="field">
                <label for="lastname" class="label">Last Name </label>
                <input bind:value={lastname} class="input" id="lastname" type="text" name="lastname">
            </div>
        </div>

    </div>
    <button class="button is-info">Submit Changes</button>
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