<script>
    import Chart from "svelte-frappe-charts"
    import {getContext, onMount} from "svelte";
    import {categories, users, venues} from "../stores.js";

    const userService = getContext("UserService");
    const venueService = getContext("VenueService");
    let selectedUser;
    let creators = [];
    let categoryCount = [];
    onMount(async () => {
        users.set(await userService.getAllUsers());
        categories.set(await venueService.getCategories());
        venues.set(await venueService.getVenues());

    });
    $: {
        if ($users.length !== 0 && $categories.length !== 0 && $venues.length !== 0) {
            categoryCount = $categories.map(function (item) {
                return {title: item["title"], count: 0, userCount: 0,}
            });
            $venues.forEach(venue => {
                if (venue.creator) {
                    if (!creators.includes(venue.creator._id)) creators.push(venue.creator._id);
                }
                if (venue.categories) {
                    venue.categories.forEach((category) => {
                        categoryCount.find((o, i) => {
                            if (o.title === category.title) {
                                categoryCount[i].count = categoryCount[i].count + 1;
                                if (venue.creator && selectedUser) {
                                    if (venue.creator._id === selectedUser)
                                        categoryCount[i].userCount = categoryCount[i].userCount + 1;
                                }
                            }
                        });
                    });
                }
            });
        }
    }
    let contributionData;
    let categoryData;
    let contributionUserToCategoryData;
    $:{
        if (creators && creators.length !== 0 && $users.length !== 0) {
            let usersCount = $users.length;
            let contributingUsers = creators.length;

            contributionData = {
                labels: ['contributing users', 'non-contributing users'],
                datasets: [
                    {
                        values: [contributingUsers, usersCount - contributingUsers]
                    }
                ]
            };
        }

        if (categoryCount.length !== 0) {

            categoryData = {
                labels: categoryCount.map(function (item) {
                    return item["title"]
                }),
                datasets: [
                    {
                        values: categoryCount.map(function (item) {
                            return item["count"]
                        })
                    }
                ]
            };

            contributionUserToCategoryData = {
                labels: categoryCount.map(function (item) {
                    return item["title"]
                }),
                datasets: [
                    {
                        values: categoryCount.map(function (item) {
                            return item["userCount"]
                        })
                    }
                ]
            };
        }
    }
</script>
<div class="box">
    <div class="columns">
        <div class="column has-text-centered">
            <h1 class="title is-4">Contributing Users</h1>
            <Chart data={contributionData} type="donut"/>
        </div>
        <div class="column has-text-centered">
            <h1 class="title is-4">Number of Venues Categories</h1>
            <Chart data={categoryData} type="bar"/>
        </div>
    </div>
    <h1 class="title is-4">User Contribution to Category</h1>
    <div class="columns">

        <div class="column is-one-fifth">
            <div class="select is-link">
                <select bind:value={selectedUser}>
                    {#each $users as user}
                        <option value="{user._id}">{user.username}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="column">
            <div class="column">
                <Chart data={contributionUserToCategoryData} type="bar"/>
            </div>
        </div>
    </div>
</div>