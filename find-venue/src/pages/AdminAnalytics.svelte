<script>
    import Chart from "svelte-frappe-charts"
    import {getContext, onMount} from "svelte";
    const userService = getContext("UserService");
    const venueService = getContext("VenueService");
    let users = [];
    let venues = [];
    let creators=[];
    let categories=[];
    onMount( async ()=>{
        users = await userService.getAllUsers();
        categories = await venueService.getCategories()
           categories = categories.map(function(item) { return {title: item["title"], count: 0} });
        venues = await venueService.getVenues();
        creators = [];
        venues.forEach(venue => {
            if(venue.creator){
                if(!creators.includes(venue.creator._id)) creators.push(venue.creator._id);
            }
            if(venue.categories){
                venue.categories.forEach((category) => {
                    categories.find((o,i) => {
                        if(o.title === category.title){
                            categories[i].count = categories[i].count + 1;
                        }
                    });
                });
            }
        })

    })

    let contributionData;
    let categoryData;
    $:{
        let usersCount = users.length;
        let contributingUsers = creators.length;

        contributionData = {
            labels: ['contributing users', 'non-contributing users'],
            datasets: [
                {
                    values: [contributingUsers, usersCount - contributingUsers]
                }
            ]
        };
        categoryData = {
            labels: categories.map(function(item) { return item["title"] }),
            datasets: [
                {
                    values: categories.map(function(item) { return item["count"] })
                }
            ]
        };
    }
</script>
<div class="box">
<div class="columns">
    <div class="column has-text-centered">
        <h1 class="title is-4">Contributing Users</h1>
        <Chart data={contributionData} type="pie"/>
    </div>
    <div class="column has-text-centered">
        <h1 class="title is-4">Number of Venues Categories</h1>
        <Chart data={categoryData} type="bar"/>
    </div>
</div>
</div>