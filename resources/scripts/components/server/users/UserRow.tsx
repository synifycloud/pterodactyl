import React, { useState } from 'react';
import { Subuser } from '@/state/server/subusers';
import RemoveSubuserButton from '@/components/server/users/RemoveSubuserButton';
import EditSubuserModal from '@/components/server/users/EditSubuserModal';
import Can from '@/components/elements/Can';
import { useStoreState } from 'easy-peasy';
import tw from 'twin.macro';
import GreyRowBox from '@/components/elements/GreyRowBox';
import { Lock, Pencil, Unlock } from 'lucide-react';

interface Props {
    subuser: Subuser;
}

export default ({ subuser }: Props) => {
    const uuid = useStoreState((state) => state.user!.data!.uuid);
    const [visible, setVisible] = useState(false);

    return (
        <GreyRowBox css={tw`mb-2`}>
            <EditSubuserModal subuser={subuser} visible={visible} onModalDismissed={() => setVisible(false)} />
            <div
                css={tw`w-10 h-10 rounded-full bg-white border-2 border-neutral-200 dark:border-neutral-800 overflow-hidden hidden md:block`}
            >
                <img css={tw`w-full h-full`} src={`${subuser.image}?s=400`} />
            </div>
            <div css={tw`ml-4 flex-1 overflow-hidden`}>
                <p css={tw`text-sm truncate text-neutral-800 dark:text-neutral-100`}>{subuser.email}</p>
            </div>
            <div css={tw`ml-4`}>
                <p css={tw`font-medium mb-1 flex justify-center`}>
                    {subuser.twoFactorEnabled ? (
                        <Lock size={16} css={tw`text-neutral-500 dark:text-neutral-400`} />
                    ) : (
                        <Unlock size={16} css={tw`text-red-400 dark:text-red-600`} />
                    )}
                </p>
                <p css={tw`text-2xs text-neutral-500 uppercase hidden md:block`}>2FA Enabled</p>
            </div>
            <div css={tw`ml-4 hidden md:block`}>
                <p css={tw`font-medium text-center text-neutral-700 dark:text-neutral-200`}>
                    {subuser.permissions.filter((permission) => permission !== 'websocket.connect').length}
                </p>
                <p css={tw`text-2xs text-neutral-500 uppercase`}>Permissions</p>
            </div>
            {subuser.uuid !== uuid && (
                <>
                    <Can action={'user.update'}>
                        <button
                            type={'button'}
                            aria-label={'Edit subuser'}
                            css={tw`block text-sm p-1 md:p-2 text-neutral-500 hover:text-neutral-700 hover:dark:text-neutral-100 transition-colors duration-150 mx-4`}
                            onClick={() => setVisible(true)}
                        >
                            <Pencil width={16} />
                        </button>
                    </Can>
                    <Can action={'user.delete'}>
                        <RemoveSubuserButton subuser={subuser} />
                    </Can>
                </>
            )}
        </GreyRowBox>
    );
};
