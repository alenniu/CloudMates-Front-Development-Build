/*!


=========================================================
* Mentr Website - v1.0.0
=========================================================

* Copyright 2019 Mentr Team 

* Coded by Mentr Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./layouts/Admin.jsx";
import AuthLayout from "./layouts/Auth.jsx";
import 'semantic-ui-css/semantic.min.css';

import'./assets/css/indexPage.css';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCpshjn88VZBl65UrCzdwJJ76cginLshlE",
  authDomain: "cloudmates.firebaseapp.com",
  databaseURL: "https://cloudmates.firebaseio.com/",
  projectId: "cloudmates",
  storageBucket: "cloudmates.appspot.com",
  messagingSenderId: "944216554117",
  appId: "1:944216554117:web:0b75dc550b552694cd47ec",
  measurementId: "G-VHDYENG384"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Redirect from="/" to="/admin/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
