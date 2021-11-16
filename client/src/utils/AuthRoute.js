import React, { useState, useContext } from "react";
import { Component } from "react";
import { AuthContext } from "../context/auth";
import { Route, Navigate, Outlet } from "react-router-dom";

function PrivateOutlet() {
    const { user } = useContext(AuthContext);
    return user ? <Outlet /> : <Navigate to={'/login'}/>;
}


//router v5 的写法
const AuthRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route {...rest} render={(props) => user ? <Navigate to={'/'}/> : <Component {...props}/>}/>
    )
}

export { PrivateOutlet, AuthRoute };