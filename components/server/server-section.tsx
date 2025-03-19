'use client';
import { ServerWithMembersWithProfiles } from '@/types';
import { ChannelType, MemberRole } from '@prisma/client';
import React from 'react';
import { ActoionTooltip } from '@/components/action-tooltip';
import { Plus, Settings } from 'lucide-react';
import { useModalStore } from '@/hooks/use-modal-store';

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: 'channels' | 'members';
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

const ServerSection = ({
  label,
  channelType,
  sectionType,
  role,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModalStore();

  return (
    <div className='flex items-center justify-between py-2'>
      <p className='text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400'>
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActoionTooltip label='Create Channel' side='top'>
          <button
            onClick={() => onOpen('createChannel', { channelType })}
            className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
          >
            <Plus className='h-4 w-4' />
          </button>
        </ActoionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActoionTooltip label='Manage Members' side='top'>
          <button
            onClick={() => onOpen('members', { server })}
            className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
          >
            <Settings className='h-4 w-4' />
          </button>
        </ActoionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
