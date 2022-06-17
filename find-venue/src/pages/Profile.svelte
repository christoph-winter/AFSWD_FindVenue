<script>
    import {getContext, onMount} from 'svelte'
    import {user} from "../stores.js";
    import {parseJwt} from "../utils/UserUtils.js";
    import {replace} from "svelte-spa-router";

    const userService = getContext("UserService");
    let loggedInUser;
    let userDetails = null;
    $: {
        userDetails = $user.token ? parseJwt($user.token) : null;
        if (userDetails !== null) {
            (async () => {
                loggedInUser = await userService.getUser(userDetails.id);
            })();
        }
    }
    onMount(async () => {
        if (!$user.email) {
            await replace("/login");
        }
    });
    let firstname;
    let lastname;
    let username;
    let email;
    let password;

    async function changeUser() {
        userService.changeUser({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
        })
    }

</script>
<div class="box">

    {#if loggedInUser}
        <form on:submit|preventDefault={changeUser}>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <label class="label">First Name:</label>
                        <p>{loggedInUser.firstname}</p>
                    </div>
                    <div class="field">
                        <label class="label">Last Name:</label>
                        <p>{loggedInUser.lastname}</p>
                    </div>
                </div>


            </div>
            <a href="/#/profile/changename" class="button is-info">ChangeName</a>
            <div class="field mt-6">
                <label class="label">Email:</label>
                <p>{loggedInUser.email}</p>
            </div>
            <div class="field mt-6">
                <label class="label">Username:</label>
                <p>{loggedInUser.username}</p>
            </div>

            <a class="button is-info mt-6" href="/#/profile/changepassword">Change Password</a>


        </form>
    {/if}
</div>
