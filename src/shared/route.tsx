import About from './About';
import Home from './Home';

const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/about",
        exact: true,
        component: About,
        loadData: About.loadData,
    }
];

export default routes;