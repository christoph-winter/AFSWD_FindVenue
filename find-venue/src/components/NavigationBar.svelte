<script>
    import {user} from "../stores.js";
    import {parseJwt} from "../utils/UserUtils.js";
    import {getContext} from "svelte";
    import {push} from "svelte-spa-router";

    const userService = getContext("UserService");

    let userDetails;

    $: userDetails = $user.token ? parseJwt($user.token) : null;

    async function logout() {
        await userService.logout();
        await push("/")
    }

</script>
<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/#/dashboard" width="170" height="35">
            <p class="title">
                <i class="fa-solid fa-earth-americas" style="color:rgb(201, 6, 6)"></i>
                FindVenue
            </p>
        </a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
    <div class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item" href="/#/dashboard">
                Venues
            </a>
            <a class="navbar-item" href="/#/map">
                Map
            </a>
            {#if userDetails}
                {#if userDetails.isadmin}
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link" href="/#/admin/dashboard">
                            Admin
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item" href="/#/admin/dashboard">
                                Settings
                            </a>
                            <a class="navbar-item" href="/#/admin/settings">
                                Analytics
                            </a>
                        </div>
                    </div>
                {/if}
            {/if}
            <a class="navbar-item" href="/#/profile">
                Profile
            </a>
        </div>

        <div class="navbar-end">
            <div class="navbar-item is-vcentered has-text-centered">
                {#if userDetails}
                    <div class="column">
                        <p class="title is-6">
                            <a href="/#/profile">
                                <i class="fa-solid fa-user-large" style="color: rgb(82,82,82)"></i>
                                {userDetails.username}
                            </a>
                        </p>
                        <p class="subtitle is-5  ">
                            <a class="button is-info is-inverted is-small" on:click={logout}>
                                Log out
                            </a>
                        </p>
                    </div>
                {:else}


                    <div class="buttons">
                        <a class="button is-link is-light is-rounded" href="/#/login">
                            Log in
                        </a>
                        <a class="button is-light is-rounded" href="/#/signup">
                            <strong>Sign up</strong>
                        </a>

                    </div>
                {/if}
            </div>
        </div>
    </div>
</nav>