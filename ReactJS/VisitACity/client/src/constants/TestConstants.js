export const testAttraction = {
    "_id": "62cde487-6b82-468f-bdbf-fcfe2d7c779b",
    "name": "Dolphinarium",
    "address": "Saltanat primorski park",
    "attractionUrl": "https://dolphinariumvarna.bg/",
    "type": "DayTours",
    "price": 25,
    "city": "Varna",
    "country": "Bulgaria",
    "image": "https://res.cloudinary.com/dllgr6ope/image/upload/v1678911306/62cde487-6b82-468f-bdbf-fcfe2d7c779b_vajldw.jpg",
    "description": "Yes, you can swim with dolphins. Dolphins can have fun.",
    "userReviews": []
}
export const testAttractionWthUserReviews = {
    "_id": "62cde487-6b82-468f-bdbf-fcfe2d7c779b",
    "name": "Dolphinarium",
    "address": "Saltanat primorski park",
    "attractionUrl": "https://dolphinariumvarna.bg/",
    "type": "DayTours",
    "price": 25,
    "city": "Varna",
    "country": "Bulgaria",
    "image": "https://res.cloudinary.com/dllgr6ope/image/upload/v1678911306/62cde487-6b82-468f-bdbf-fcfe2d7c779b_vajldw.jpg",
    "description": "Yes, you can swim with dolphins. Dolphins can have fun.",
    "userReviews": ["fistId"]
}
export const testUser = {
    "_id": "fsdfsdfsdfsdfsd",
    "email": "visitacity@abv.bg",
    "accessToken": "fdsf-sdfsdfsd-sdfsdfds"
}

export const testRestaurant = {
    "_id": "62cde487-6b82-468f-bdbf-fcfe2d7c779a",
    "name": "Raffy",
    "phoneNumber": "055555555",
    "address": "Nqkyde v Plovdiv i v Sofia",
    "restaurantUrl": "https://raffy.bg/",
    "city": "Sofia",
    "country": "Bulgaria",
    "image": "https://res.cloudinary.com/dllgr6ope/image/upload/v1679918510/xshq17zgkrmhbjtbl61z.jpg",
    "comments": []
}
export const testRestaurantWithComments = {
    "_id": "62cde487-6b82-468f-bdbf-fcfe2d7c779a",
    "name": "Raffy",
    "phoneNumber": "055555555",
    "address": "Nqkyde v Plovdiv i v Sofia",
    "restaurantUrl": "https://raffy.bg/",
    "city": "Sofia",
    "country": "Bulgaria",
    "image": "https://res.cloudinary.com/dllgr6ope/image/upload/v1679918510/xshq17zgkrmhbjtbl61z.jpg",
    "comments": []
}
export const testPlan = {
    "_ownerId": "5ff2179a-5d27-4061-bd3d-b2c830708cab",
        "fromDate": "2023-04-08",
        "toDate": "2023-04-09",
        "country": "Bulgaria",
        "city": "Sofia",
        "attractions": ["62cde487-6b82-468f-bdbf-fcfe2d7c779b"],
        "restaurants": ["62cde487-6b82-468f-bdbf-fcfe2d7c779a"],
        "_createdOn": 1680943875473,
        "_id": "9619c141-6b59-4802-9a3f-c887437387ca"
}
export const emptyTestPlan = {
    "_ownerId": "5ff2179a-5d27-4061-bd3d-b2c830708cab",
        "fromDate": "2023-04-08",
        "toDate": "2023-04-09",
        "country": "Bulgaria",
        "city": "Sofia",
        "attractions": [],
        "restaurants": [],
        "_createdOn": 1680943875473,
        "_id": "9619c141-6b59-4802-9a3f-c887437387ca"
}

export const testComment = {
    "_id": "62cde487-6b82-468f-bdbf-dfsfsdfsf",
    "_ownerId": "fsdfsdfsdfsdfsd",
    "comment": "bes place ever",
    "restaurantId": "62cde487-6b82-468f-bdbf-fcfe2d7c779a",
    "userEmail": "visitacity@abv.bg",
}

export const testCountries = [{
    "_id": "1",
    "name": "Bulgaria",
    "cities": [
        "Sofia",
        "Plovdiv",
        "Varna",
        "Tryavna",
        "Hisarya",
        "Velingrad",
        "Burgas"
    ]
},
{
    "_id": "2",
    "name": "Croatia",
    "cities": []
}, {
    "_id": "3",
    "name": "USA",
    "cities": []
},{
    "_id": "4",
    "name": "Thailand",
    "cities": [
        "Patong"
    ]
}]