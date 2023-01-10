import { HomePage } from "./view/home.jsx";
import { ToyIndex } from "./view/toy-index.jsx";
import { ToyDetails } from "./view/toy-details.jsx";
import { ToyEdit } from "./view/toy-edit.jsx";
import { About } from "./view/about.jsx";

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
    
]