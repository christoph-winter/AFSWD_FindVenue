<script>
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";

    let email = ""
    let password = "";
    let errorMessage = "";

    const userService = getContext("UserService");

    async function login() {
        let success = await userService.login(email, password);
        if (success) {
            await push("/dashboard");
        } else {
            email = "";
            password = "";
            errorMessage = "Invalid Credentials";
        }
    }
</script>
<form on:submit|preventDefault={login}>

    <div class="field">
        <label class="label" for="email">Email</label>
        <div class="control has-icons-left">
            <input bind:value={email} class="input" id="email" type="text" placeholder="Enter email..." name="email">
            <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
        </span>
        </div>
    </div>
    <div class="field">
        <label class="label" for="password">Password</label>
        <div class="control has-icons-left">
            <input bind:value={password} class="input" id="password" type="password" placeholder="Enter Password..."
                   name="password">
            <span class="icon is-small is-left">
            <i class="fa-solid fa-key"></i>
        </span>
        </div>
    </div>
    <div class="field is-grouped">
        <button class="button is-link">Log in</button>
    </div>
    {#if errorMessage}
        <div id="errorBox" class="notification is-danger">
            <button class="delete" type="button"
                    onclick="document.getElementById('errorBox').style.display='none'"></button>
            <div>
                {errorMessage}
            </div>

        </div>
    {/if}
</form>
