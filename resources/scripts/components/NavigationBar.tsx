import * as React from 'react';
import { useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { useLocation, useParams } from 'react-router';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import tw, { theme } from 'twin.macro';
import styled from 'styled-components/macro';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import Avatar from '@/components/Avatar';
import routes from '@/routers/routes';
import { Layers, LogOut, Settings } from 'lucide-react';

const RightNavigation = styled.div`
    & > a,
    & > button,
    & > .navigation-link {
        ${tw`flex items-center h-full no-underline text-neutral-700 dark:text-neutral-300 px-6 cursor-pointer transition-all duration-150`};

        &:active,
        &:hover {
            ${tw`text-black dark:text-white bg-neutral-300 dark:bg-neutral-800`};
        }

        &:active,
        &:hover,
        &.active {
            box-shadow: inset 0 -2px ${theme`colors.indigo.600`.toString()};
        }
    }
`;

export default () => {
    //const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error this is valid
            window.location = '/';
        });
    };

    const location = useLocation();
    const id = useParams<{ id: string }>().id;

    return (
        <div
            className={`fixed left-0 top-0 z-20 w-full overflow-x-auto bg-white text-neutral-900 shadow-md dark:border-b dark:border-neutral-600/20 dark:bg-neutral-900 dark:text-neutral-200 ${(location.pathname.startsWith('/account') || location.pathname.startsWith('/server')) && 'pl-[60px] duration-300 xl:pl-[240px]'}`}
        >
            <SpinnerOverlay visible={isLoggingOut} />
            <div className={'mx-auto flex h-[3.5rem] w-full items-center'}>
                <div id={'logo'} className={'flex-1'}>
                    <Switch location={location}>
                        {routes.server.map(({ path, header }) => (
                            <Route key={path} path={`/server/${id}${path}`} exact>
                                <h1 className='select-none px-4 font-header text-2xl no-underline transition-colors duration-150'>
                                    {header}
                                </h1>
                            </Route>
                        ))}
                        {routes.account.map(({ path, name }) => (
                            <Route key={path} path={`/account${path}`} exact>
                                <h1 className='select-none px-4 font-header text-2xl no-underline transition-colors duration-150'>
                                    {name}
                                </h1>
                            </Route>
                        ))}
                        <Route path={'/'} exact>
                            <h1 className='select-none px-4 font-header text-2xl no-underline transition-colors duration-150'>
                                Dashboard
                            </h1>
                        </Route>
                    </Switch>
                </div>
                <RightNavigation className={'flex h-full items-center justify-center'}>
                    <SearchContainer />
                    <Tooltip placement={'bottom'} content={'Dashboard'}>
                        <NavLink to={'/'} exact>
                            <Layers width={20} />
                        </NavLink>
                    </Tooltip>
                    {rootAdmin && (
                        <Tooltip placement={'bottom'} content={'Admin'}>
                            <a href={'/admin'} rel={'noreferrer'}>
                                <Settings width={20} />
                            </a>
                        </Tooltip>
                    )}
                    <Tooltip placement={'bottom'} content={'Account Settings'}>
                        <NavLink to={'/account'}>
                            <span className={'flex h-5 w-5 items-center'}>
                                <Avatar.User />
                            </span>
                        </NavLink>
                    </Tooltip>
                    <Tooltip placement={'bottom'} content={'Sign Out'}>
                        <button onClick={onTriggerLogout}>
                            <LogOut width={20} />
                        </button>
                    </Tooltip>
                </RightNavigation>
            </div>
        </div>
    );
};
