import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import TransitionRouter from '@/TransitionRouter';
import SubNavigation from '@/components/elements/SubNavigation';
import { useLocation } from 'react-router';
import Spinner from '@/components/elements/Spinner';
import routes from '@/routers/routes';

export default () => {
    const location = useLocation();

    return (
        <>
            {location.pathname.startsWith('/account') && (
                <SubNavigation>
                    {routes.account
                        .filter((route) => !!route.name)
                        .map(({ path, name, exact = false, icon }) => (
                            <NavLink key={path} to={`/account/${path}`.replace('//', '/')} exact={exact}>
                                {icon && React.createElement(icon)}
                                <span>{name}</span>
                            </NavLink>
                        ))}
                </SubNavigation>
            )}
            <div
                className={`grid ${location.pathname.startsWith('/account') && 'pl-[60px] duration-300 xl:pl-[240px]'} w-full pt-14`}
            >
                <NavigationBar />
                <TransitionRouter>
                    <React.Suspense fallback={<Spinner centered />}>
                        <Switch location={location}>
                            <Route path={'/'} exact>
                                <DashboardContainer />
                            </Route>
                            {routes.account.map(({ path, component: Component }) => (
                                <Route key={path} path={`/account/${path}`.replace('//', '/')} exact>
                                    <Component />
                                </Route>
                            ))}
                            <Route path={'*'}>
                                <NotFound />
                            </Route>
                        </Switch>
                    </React.Suspense>
                </TransitionRouter>
            </div>
        </>
    );
};
