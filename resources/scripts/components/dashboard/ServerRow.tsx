import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Server } from '@/api/server/getServer';
import getServerResourceUsage, { ServerPowerState, ServerStats } from '@/api/server/getServerResourceUsage';
import { bytesToString, ip, mbToBytes } from '@/lib/formatters';
import tw from 'twin.macro';
import GreyRowBox from '@/components/elements/GreyRowBox';
import Spinner from '@/components/elements/Spinner';
import styled from 'styled-components/macro';
import { Cpu, EthernetPort, HardDrive, Server as LucideServer, MemoryStick } from 'lucide-react';

// Determines if the current value is in an alarm threshold so we can show it in red rather
// than the more faded default style.
const isAlarmState = (current: number, limit: number): boolean => limit > 0 && current / (limit * 1024 * 1024) >= 0.9;

const IconDescription = styled.p<{ $alarm: boolean }>`
    ${tw`text-sm ml-2 flex items-center`};
    ${(props) => (props.$alarm ? tw`text-red-400 dark:text-red-300` : tw`text-neutral-600 dark:text-neutral-400`)};
`;

const StatusIndicatorBox = styled(GreyRowBox)<{ $status: ServerPowerState | undefined }>`
    ${tw`grid gap-4 relative h-full grid-rows-4 rounded-lg`};

    & .status-bar {
        ${tw`h-2 absolute bottom-0 z-20 rounded-full m-1 opacity-50 transition-all duration-150`};
        width: calc(100% - 0.5rem);
    }

    &:hover .status-bar {
        ${tw`opacity-75`};
    }
`;

type Timer = ReturnType<typeof setInterval>;

export default ({ server, className }: { server: Server; className?: string }) => {
    const interval = useRef<Timer>(null) as React.MutableRefObject<Timer>;
    const [isSuspended, setIsSuspended] = useState(server.status === 'suspended');
    const [stats, setStats] = useState<ServerStats | null>(null);

    const getStats = () =>
        getServerResourceUsage(server.uuid)
            .then((data) => setStats(data))
            .catch((error) => console.error(error));

    useEffect(() => {
        setIsSuspended(stats?.isSuspended || server.status === 'suspended');
    }, [stats?.isSuspended, server.status]);

    useEffect(() => {
        // Don't waste a HTTP request if there is nothing important to show to the user because
        // the server is suspended.
        if (isSuspended) return;

        getStats().then(() => {
            interval.current = setInterval(() => getStats(), 30000);
        });

        return () => {
            interval.current && clearInterval(interval.current);
        };
    }, [isSuspended]);

    const alarms = { cpu: false, memory: false, disk: false };
    if (stats) {
        alarms.cpu = server.limits.cpu === 0 ? false : stats.cpuUsagePercent >= server.limits.cpu * 0.9;
        alarms.memory = isAlarmState(stats.memoryUsageInBytes, server.limits.memory);
        alarms.disk = server.limits.disk === 0 ? false : isAlarmState(stats.diskUsageInBytes, server.limits.disk);
    }

    const diskLimit = server.limits.disk !== 0 ? bytesToString(mbToBytes(server.limits.disk)) : 'Unlimited';
    const memoryLimit = server.limits.memory !== 0 ? bytesToString(mbToBytes(server.limits.memory)) : 'Unlimited';
    const cpuLimit = server.limits.cpu !== 0 ? server.limits.cpu + ' %' : 'Unlimited';

    return (
        <StatusIndicatorBox as={Link} to={`/server/${server.id}`} className={className} $status={stats?.status}>
            <div className='flex h-full items-start justify-between'>
                <div>
                    <div className={'mr-4 flex items-center gap-2'}>
                        <LucideServer width={20} />
                        <p css={tw`text-lg break-words`}>{server.name}</p>
                    </div>
                    <div className='mt-4'>
                        {!!server.description && (
                            <p css={tw`text-sm text-neutral-300 break-words line-clamp-2`}>{server.description}</p>
                        )}
                    </div>
                </div>
                <div className='flex items-center'>
                    <EthernetPort width={18} css={tw`text-neutral-500`} />
                    <p css={tw`text-sm text-neutral-600 dark:text-neutral-400 ml-2`}>
                        {server.allocations
                            .filter((alloc) => alloc.isDefault)
                            .map((allocation) => (
                                <React.Fragment key={allocation.ip + allocation.port.toString()}>
                                    {allocation.alias || ip(allocation.ip)}:{allocation.port}
                                </React.Fragment>
                            ))}
                    </p>
                </div>
            </div>
            <div css={tw`row-span-3 flex flex-col gap-4`}>
                {!stats || isSuspended ? (
                    isSuspended ? (
                        <div css={tw`flex-1 text-center`}>
                            <span css={tw`bg-red-500 rounded px-2 py-1 text-red-100 text-xs`}>
                                {server.status === 'suspended' ? 'Suspended' : 'Connection Error'}
                            </span>
                        </div>
                    ) : server.isTransferring || server.status ? (
                        <div css={tw`flex-1 text-center`}>
                            <span
                                css={tw`bg-neutral-200 dark:bg-neutral-700 rounded px-2 py-1 text-neutral-700 dark:text-neutral-100 text-xs`}
                            >
                                {server.isTransferring
                                    ? 'Transferring'
                                    : server.status === 'installing'
                                      ? 'Installing'
                                      : server.status === 'restoring_backup'
                                        ? 'Restoring Backup'
                                        : 'Unavailable'}
                            </span>
                        </div>
                    ) : (
                        <Spinner size={'small'} />
                    )
                ) : (
                    <React.Fragment>
                        <div>
                            <div css={tw`flex justify-between`}>
                                <div css={tw`flex justify-center`}>
                                    <Cpu className={`${alarms.cpu ? 'text-red-400' : 'text-neutral-500'}`} />
                                    <IconDescription $alarm={alarms.cpu}>
                                        {stats.cpuUsagePercent.toFixed(2)} %
                                    </IconDescription>
                                </div>
                                <p css={tw`text-xs text-neutral-600 mt-1`}>of {cpuLimit}</p>
                            </div>
                            <div className='mt-1 h-4 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700'>
                                <div
                                    className={
                                        'h-full rounded-full ' +
                                        (alarms.cpu ? 'bg-red-600 dark:bg-red-500' : 'bg-indigo-500 dark:bg-indigo-400')
                                    }
                                    style={{
                                        width:
                                            server.limits.cpu === 0
                                                ? '0%'
                                                : `${(stats.cpuUsagePercent / server.limits.cpu) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div css={tw`flex justify-between`}>
                                <div css={tw`flex justify-center`}>
                                    <MemoryStick className={`${alarms.memory ? 'text-red-400' : 'text-neutral-500'}`} />
                                    <IconDescription $alarm={alarms.memory}>
                                        {bytesToString(stats.memoryUsageInBytes)}
                                    </IconDescription>
                                </div>
                                <p css={tw`text-xs text-neutral-600 mt-1`}>of {memoryLimit}</p>
                            </div>
                            <div className='mt-1 h-4 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700'>
                                <div
                                    className={
                                        'h-full rounded-full ' +
                                        (alarms.memory
                                            ? 'bg-red-500 dark:bg-red-400'
                                            : 'bg-indigo-500 dark:bg-indigo-400')
                                    }
                                    style={{
                                        width:
                                            server.limits.memory === 0
                                                ? '0%'
                                                : `${(stats.memoryUsageInBytes / mbToBytes(server.limits.memory)) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div css={tw`flex justify-between`}>
                                <div css={tw`flex justify-center`}>
                                    <HardDrive className={`${alarms.disk ? 'text-red-400' : 'text-neutral-500'}`} />
                                    <IconDescription $alarm={alarms.disk}>
                                        {bytesToString(stats.diskUsageInBytes)}
                                    </IconDescription>
                                </div>
                                <p css={tw`text-xs text-neutral-600 mt-1`}>of {diskLimit}</p>
                            </div>
                            <div className='mt-1 h-4 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700'>
                                <div
                                    className={
                                        'h-full rounded-full ' +
                                        (alarms.disk
                                            ? 'bg-red-500 dark:bg-red-400'
                                            : 'bg-indigo-500 dark:bg-indigo-400')
                                    }
                                    style={{
                                        width:
                                            server.limits.disk === 0
                                                ? '0%'
                                                : `${(stats.diskUsageInBytes / mbToBytes(server.limits.disk)) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
            <div
                className={
                    'status-bar ' +
                    (stats?.status === 'running'
                        ? 'bg-green-600 dark:bg-green-500'
                        : stats?.status === 'offline'
                          ? 'bg-red-600 dark:bg-red-500'
                          : 'bg-yellow-600 dark:bg-yellow-500')
                }
            />
        </StatusIndicatorBox>
    );
};
