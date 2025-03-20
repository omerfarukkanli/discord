import ChatHeader from '@/components/chat/chat-header';
import ChatInput from '@/components/chat/chat-input';
import ChatMessages from '@/components/chat/chat-messages';
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
      <ChatMessages
        member={member}
        name={channel.name}
        type='channel'
        apiUrl='/api/messages'
        socketUrl='/api/socket/messages'
        socketQuery={{
          channelId: channelId,
          serverId: channel.serverId,
        }}
        paramKey='channelId'
        paramValue={channel.id}
        chatId={channel.id}
      />
      <ChatInput
        apiUrl='/api/socket/messages'
        query={{
          channelId: channelId,
          serverId: channel.serverId,
        }}
        name={channel.name}
        type='channel'
      />
    </div>
  );
};

export default ChannelIdPage;
