import ChatHeader from '@/components/chat/chat-header';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { RedirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const { serverId, channelId } = await params;

  const profile = await currentProfile();

  if (!profile) return <RedirectToSignIn />;

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) redirect('/');

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader
        serverId={serverId}
        name={channel.name}
        type='channel'
        imageUrl={profile.imageUrl}
      />
    </div>
  );
};

export default ChannelIdPage;
