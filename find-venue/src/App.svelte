<script>
    import {UserService} from "./services/UserService.js"
    import Login from "./pages/Login.svelte"
    import Signup from "./pages/Signup.svelte"
    import Router from "svelte-spa-router";
    import Dashboard from "./pages/Dashboard.svelte";
    import Welcome from "./pages/Welcome.svelte";
    import AddNewPOI from "./pages/AddNewVenue.svelte";
    import Profile from "./pages/Profile.svelte";
    import EditPOI from "./pages/EditVenue.svelte";
    import NavigationBar from "./components/NavigationBar.svelte";
    import {setContext} from "svelte";
    import {VenueService} from "./services/VenueService.js";
    import AdminDashboard from "./pages/AdminSettings.svelte";
    import ChangeName from "./components/ChangeName.svelte";
    import ChangePassword from "./components/ChangePassword.svelte";
    import MapOverview from "./pages/MapOverview.svelte";
    import AdminAnalytics from "./pages/AdminAnalytics.svelte";

    setContext("UserService", new UserService("http://localhost:4000"));
    setContext("VenueService", new VenueService("http://localhost:4000"));
    let routes;

    routes = {
        "/": Welcome,
        "/login": Login,
        "/logout": Welcome,
        "/signup": Signup,
        "/dashboard": Dashboard,
        "/venues/addvenue": AddNewPOI,
        "/profile": Profile,
        "/profile/changename": ChangeName,
        "/profile/changepassword": ChangePassword,
        "/venues/edit*": EditPOI,
        "/admin/settings": AdminDashboard,
        "/admin/analytics": AdminAnalytics,
        "/map": MapOverview,
    }

</script>

<div class="container">
    <div class="box">
        <NavigationBar/>
    </div>
    <Router {routes}/>
</div>