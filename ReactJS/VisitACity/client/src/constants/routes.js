export const routes = {
    'home': '/',
    'homeWithQuery': "/:cityName?/:radioOption?",
    'myPlans': '/myPlans',
    'createPlan': '/createPlan',
    'attraction-details': '/attractions/:attractionId',
    'attraction-edit': '/admin/attractions/edit/:attractionId',
    'attraction-create': '/admin/attractions/create',
    'restaurant-create': '/admin/restaurants/create',
    'plan-details': '/myPlans/:planId',
    'login': '/login',
    'register': '/register',
    'logout': '/logout',
    'city-create': '/admin/cities/create',
    'country-create': '/admin/countries/create',
    'unauthorized': '/error/unauthorized'
}