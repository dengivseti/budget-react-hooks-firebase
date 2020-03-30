import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './pages/Home'
import { Add } from './pages/Add'
import { Edit } from './pages/Edit'
import { Auth } from './pages/Auth'
import { History } from './pages/History'


export const useRoutes = isAuthentication => {

    if (isAuthentication) {
        return (
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/add" component={Add} />
                <Route path="/history" component={History} />
                <Route path="/edit/:id" component={Edit} />
                <Redirect to="/"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact component={Auth}/>
            <Redirect to="/"/>
        </Switch>
    )
}