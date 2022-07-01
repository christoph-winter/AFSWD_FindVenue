<script>
    import {getContext, onMount} from 'svelte'
    import {users} from "../stores.js";

    const userService = getContext("UserService");
    onMount(async () => {

        users.set(await userService.getAllUsers());
    });

    async function deleteUser(userId) {
        await userService.deleteUser(userId);
        $users = await userService.getAllUsers();
    }

    async function setAdmin(userId) {
        if (await userService.setAdmin(userId))
            users.set(await userService.getAllUsers());
    }
</script>
{#each $users as user}
    <div class="box box-link-hover-shadow">
        <h4 class="title">
            {user.firstname} {user.lastname}
        </h4>
        <div class="columns">
            <div class="column">
                <p class="title is-6">Username:</p>

                {user.username}

            </div>
        </div>
        <div class="columns mt-2">
            <div class="column">
                <p class="title is-6">Email:</p>
                {user.email}
            </div>
        </div>

        <div class="columns">
            <div class="column">
                {#if user.isadmin}
                    <p class="title is-5" style="color: red">ADMIN USER</p>
                {:else}
                    <form on:submit|preventDefault={() => setAdmin(user._id)}>
                        <button class="button is-info">Set Admin</button>
                    </form>
                {/if}
            </div>
            <div class="column">
                <form on:submit|preventDefault={() => deleteUser(user._id)}>
                    <button class="button is-danger">Delete User</button>
                </form>
            </div>


        </div>


    </div>

{/each}