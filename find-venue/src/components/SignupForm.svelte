<script lang="ts">
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";

    let firstname = "";
    let lastname = "";
    let username = "";
    let email = "";
    let password = "";
    let errorMessage = "";

    const userService = getContext("UserService");

    async function signup() {
        let success = await userService.signup(firstname, lastname, email, username, password)
        if (success) {
            push("/");
        } else {
            errorMessage = "Error Trying to sign up";
        }
    }
</script>
<div class="box box-link-hover-shadow">
    <form on:submit|preventDefault={signup}>
        <div class="field is-horizontal">
            <div class="field-body">
                <div class="field">
                    <label for="firstname" class="label">First Name</label>
                    <input bind:value={firstname} class="input" id="firstname" type="text"
                           placeholder="Enter first name" name="firstname">
                </div>
                <div class="field">
                    <label for="lastname" class="label">Last Name </label>
                    <input bind:value={lastname} class="input" id="lastname" type="text" placeholder="Enter last name"
                           name="lastname">
                </div>
            </div>
        </div>
        <div class="field">
            <label for="email" class="label">Email</label>
            <input bind:value={email} class="input" id="email" type="text" placeholder="Enter email" name="email">
        </div>
        <div class="field">
            <label for="username" class="label">Username</label>
            <input bind:value={username} class="input" id="username" type="text" placeholder="Choose username"
                   name="username">
        </div>
        <div class="field">
            <label for="password" class="label">Password</label>
            <input bind:value={password} class="input" id="password" type="password" placeholder="Enter Password"
                   name="password">
        </div>
        <div class="field is-grouped">
            <button class="button is-link">Sign Up</button>
        </div>
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

</div>
