import { HomePage } from "./view/home.jsx";
import { ToyIndex } from "./view/toy-index.jsx";
import { ToyDetails } from "./view/toy-details.jsx";
import { ToyEdit } from "./view/toy-edit.jsx";
import { About } from "./view/about.jsx";
import { Profile } from "./view/profile.jsx";
import { Reviews } from "./view/reviews.jsx";

export default [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/toy',
        component: ToyIndex,
    },
    {
        path: '/toy/:toyId',
        component: ToyDetails,
    },
    {
        path: '/toy/edit',
        component: ToyEdit,
    },
    {
        path: '/toy/edit/:toyId',
        component: ToyEdit,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/reviews',
        component: Reviews,
    } 
]