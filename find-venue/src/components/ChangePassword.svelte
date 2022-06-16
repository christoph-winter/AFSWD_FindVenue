<script>
    import {getContext, onMount} from "svelte";
    import {parseJwt} from "../utils/UserUtils.js";
    import {user} from "../stores.js";
    import {push, replace} from "svelte-spa-router";

    const userService = getContext("UserService");

    onMount(async () => {
        if (!$user.email) {
            await replace("/login");
        }
    });
    let password = "";
    let errorMessage = "";

    async function changePassword() {
        let userId = parseJwt($user.token).id


        let success = await userService.updatePassword(userId, password);
        if (success) await push("/profile");
        else errorMessage = "Could not update password";
    }
</script>
<form on:submit|preventDefault={changePassword}>


    <div class="field">
        <label for="password" class="label">New Password</label>
        <input bind:value={password} class="input" id="password" type="password" placeholder="Enter new password..."
               name="firstname">
    </div>
    <button class="button is-info">Submit</button>
</form>
{#if errorMessage}
    <div id="errorBox" class="notification is-danger">
        <button class="delete" type="button"
                onclick="document.getElementById('errorBox').style.display='none'"></button>
        <div>
            {errorMessage}
        </div>

    </div>
{/if}