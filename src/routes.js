/*!


=========================================================
* Mentr Website - v1.0.0
=========================================================

* Copyright 2019 Mentr Team 

* Coded by Mentr Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


*/
import React from 'react';
import Index from "./views/Index.jsx";
import Profile from "./views/examples/Profile.jsx";
import Register from "./views/examples/Register.jsx";
import Login from "./views/examples/Login.jsx";
import Tables from "./views/examples/Tables.jsx";
import MentorDetails from "./components/Mentor/MentorDetails.jsx";
import Clubs from "./components/Clubs/Clubs.jsx";
import ClubDetails from './components/Clubs/ClubDetails'
import Election from './components/Election/Election'
import LunchMenu from './components/LunchMenu/LunchMenu'
import Stewards from './components/Stewards/Stewards'
import Calendar from './components/Calendar/Calendar'
import Landing from './components/Landing/Landing'
import Notifications from './components/Notifications/Notifications'
import UserProfile from './views/examples/UserProfile.jsx';
import ChatRoom from './components/Chat/chat';

var routes = [{
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Index,
        layout: "/admin"
    },
    {
        path: "/stewards",
        name: "Stewards Announcements",
        icon: "ni ni-album-2 text-purple",
        component: Stewards,
        layout: "/admin"
    },
    // {
    //     path: "/notifications",
    //     name: "Notifications",
    //     icon: "fa fa-bell text-primary",
    //     component: Notifications,
    //     layout: "/admin"
    // },
    {
        path: "/landing",
        name: "Landing",
        icon: "ni ni-send text-green",
        component: Landing,
        layout: "/admin"
    },
    // {
    //     path: "/lunch",
    //     name: "Lunch Menu",
    //     icon: "ni ni-basket text-warning",
    //     component: LunchMenu,
    //     layout: "/admin"
    // },
    {
        path: "/user-profile",
        name: "User Profile",
        icon: "ni ni-single-02 text-yellow",
        component: UserProfile,
        layout: "/admin"
    },

    {
        path: "/chat-room",
        name: "CHAT ROOM",
        icon: "ni ni-single-02 text-yellow",
        component: ChatRoom,
        layout: "/admin"
    },

    {
        path: "/profile/:id",
        name: "Profile",
        icon: "",
        component: Profile,
        layout: "/admin"
    },
    {
        path: "/mentor/:id",
        name: "MentorDetails",
        icon: "ni ni-bullet-list-67 text-red",
        component: MentorDetails,
        layout: "/admin"
    },
    {
        path: "/mentor",
        name: "Mentor",
        icon: "ni ni-bullet-list-67 text-red",
        component: Tables,
        layout: "/admin"
    },

    {
        path: "/clubs/:id",
        name: "ClubDetails",
        icon: "ni ni-bullet-list-67 text-red",
        component: ClubDetails,
        layout: "/admin"
    },

    // {
    //     path: "/clubs",
    //     name: "Houses",
    //     icon: "ni ni-atom text-red",
    //     component: Clubs,
    //     layout: "/admin"
    // },
    // {
    //     path: "/calendar",
    //     name: "Community Service",
    //     icon: "ni ni-calendar-grid-58 text-yellow",
    //     component: Calendar,
    //     layout: "/admin"
    // },
    // {
    //     path: "/election",
    //     name: "Polls",
    //     icon: "ni ni-chart-bar-32 text-green",
    //     component: Election,
    //     layout: "/admin"
    // },
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth"
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: Register,
        layout: "/auth"
    }
];
export default routes;