import React, { lazy } from 'react';
import ServerConsole from '@/components/server/console/ServerConsoleContainer';
import DatabasesContainer from '@/components/server/databases/DatabasesContainer';
import ScheduleContainer from '@/components/server/schedules/ScheduleContainer';
import UsersContainer from '@/components/server/users/UsersContainer';
import BackupContainer from '@/components/server/backups/BackupContainer';
import NetworkContainer from '@/components/server/network/NetworkContainer';
import StartupContainer from '@/components/server/startup/StartupContainer';
import FileManagerContainer from '@/components/server/files/FileManagerContainer';
import SettingsContainer from '@/components/server/settings/SettingsContainer';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import ActivityLogContainer from '@/components/dashboard/activity/ActivityLogContainer';
import ServerActivityLogContainer from '@/components/server/ServerActivityLogContainer';
import {
    CalendarDays,
    CloudCog,
    CloudUploadIcon,
    Database,
    File,
    History,
    KeyRound,
    Network,
    Rocket,
    Settings,
    SquareChevronRight,
    User,
} from 'lucide-react';

// Each of the router files is already code split out appropriately — so
// all of the items above will only be loaded in when that router is loaded.
//
// These specific lazy loaded routes are to avoid loading in heavy screens
// for the server dashboard when they're only needed for specific instances.
const FileEditContainer = lazy(() => import('@/components/server/files/FileEditContainer'));
const ScheduleEditContainer = lazy(() => import('@/components/server/schedules/ScheduleEditContainer'));

interface RouteDefinition {
    path: string;
    // If undefined is passed this route is still rendered into the router itself
    // but no navigation link is displayed in the sub-navigation menu.
    name: string | undefined;
    component: React.ComponentType;
    exact?: boolean;
    icon?: React.ComponentType;
}

interface ServerRouteDefinition extends RouteDefinition {
    permission: string | string[] | null;
    header: string;
}

interface Routes {
    // All of the routes available under "/account"
    account: RouteDefinition[];
    // All of the routes available under "/server/:id"
    server: ServerRouteDefinition[];
}

export default {
    account: [
        {
            path: '/',
            name: 'Account',
            component: AccountOverviewContainer,
            exact: true,
            icon: User,
        },
        {
            path: '/api',
            name: 'API Keys',
            component: AccountApiContainer,
            icon: CloudCog,
        },
        {
            path: '/ssh',
            name: 'SSH Keys',
            component: AccountSSHContainer,
            icon: KeyRound,
        },
        {
            path: '/activity',
            name: 'Activity',
            component: ActivityLogContainer,
            icon: History,
        },
    ],
    server: [
        {
            path: '/',
            permission: null,
            name: 'Console',
            header: 'Console',
            component: ServerConsole,
            exact: true,
            icon: SquareChevronRight,
        },
        {
            path: '/files',
            permission: 'file.*',
            name: 'Files',
            header: 'Files',
            component: FileManagerContainer,
            icon: File,
        },
        {
            path: '/files/:action(edit|new)',
            permission: 'file.*',
            name: undefined,
            header: 'File Editor',
            component: FileEditContainer,
        },
        {
            path: '/databases',
            permission: 'database.*',
            name: 'Databases',
            header: 'Databases',
            component: DatabasesContainer,
            icon: Database,
        },
        {
            path: '/schedules',
            permission: 'schedule.*',
            name: 'Schedules',
            header: 'Schedules',
            component: ScheduleContainer,
            icon: CalendarDays,
        },
        {
            path: '/schedules/:id',
            permission: 'schedule.*',
            name: undefined,
            header: 'Edit Schedule',
            component: ScheduleEditContainer,
        },
        {
            path: '/users',
            permission: 'user.*',
            name: 'Users',
            header: 'Users',
            component: UsersContainer,
            icon: User,
        },
        {
            path: '/backups',
            permission: 'backup.*',
            name: 'Backups',
            header: 'Backups',
            component: BackupContainer,
            icon: CloudUploadIcon,
        },
        {
            path: '/network',
            permission: 'allocation.*',
            name: 'Network',
            header: 'Network',
            component: NetworkContainer,
            icon: Network,
        },
        {
            path: '/startup',
            permission: 'startup.*',
            name: 'Startup',
            header: 'Startup',
            component: StartupContainer,
            icon: Rocket,
        },
        {
            path: '/settings',
            permission: ['settings.*', 'file.sftp'],
            name: 'Settings',
            header: 'Settings',
            component: SettingsContainer,
            icon: Settings,
        },
        {
            path: '/activity',
            permission: 'activity.*',
            name: 'Activity',
            header: 'Activity',
            component: ServerActivityLogContainer,
            icon: History,
        },
    ],
} as Routes;
