import { reactive } from 'vue';
export const store = reactive({
    selected_types: [],
    cart: [],
    count_dishes: 0,
    isThereRestaurant: true,
    restaurantDetailsId: undefined,
})