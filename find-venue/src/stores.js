import {writable} from "svelte/store";

export const user = writable({
    email: "",
    token: "",
});
export const currentLocation = writable({
    lat: 49.01930808084343,
    long: 12.106906822910224,
});
export const venues = writable([]);
export const categories = writable([]);
export const users = writable([]);