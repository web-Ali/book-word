import React, {Fragment} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {MAIN_ROUTE} from "../../routing/consts";
import {authRoutes,publicRoutes,noAuthRoutes} from "../../routing/routes";
import ScrollToTop from "./ScrollToTop";

const AppRouter = () => {
    const auth = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return (
        <Fragment>
            <ScrollToTop />

            <Switch>
                {auth &&  username  && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} />
                )}
                {!auth &&  !username && noAuthRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )}
                <Redirect to={MAIN_ROUTE}/>
            </Switch>
        </Fragment>
    );
};

export default AppRouter;

// let mapStateToProps = (state) => {
//     return {
//         token: state.ChapterReducer.token,
//         username: state.ChapterReducer.username,
//         isFetching: state.ChapterReducer.isFetching
//     }
// }
//
// export default connect(mapStateToProps, { postLogin})(AppRouter)
