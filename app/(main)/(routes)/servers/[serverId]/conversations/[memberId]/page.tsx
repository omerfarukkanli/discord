import ChatHeader from '@/components/chat/chat-header';
import ChatInput from '@/components/chat/chat-input';
import ChatMessages from '@/components/chat/chat-messages';
import { MediaRoom } from '@/components/media-room';
import { getOrCreateConversation } from '@/lib/conversation';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface MemberIdPageProps {
  params: Promise<{
    serverId: string;
    memberId: string;
  }>;
  searchParams: Promise<{
    video?: boolean;
  }>;
}
const MemberIdPage = async ({ params, searchParams }: MemberIdPageProps) => {
  const { serverId, memberId } = await params;
  const { video } = await searchParams;
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();
  if (!profile) return redirectToSignIn();

  const currentMember = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });
  if (!currentMember) redirect('/');

  const conversation = await getOrCreateConversation(
    currentMember.id,
    memberId
  );

  if (!conversation) redirect(`/servers/${serverId}`);

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        serverId={serverId}
        name={otherMember.profile.name}
        type='conversation'
      />
      {video && (
        <MediaRoom chatId={conversation.id} video={true} audio={true} />
      )}
      {!video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type='conversation'
            apiUrl='/api/direct-messages'
            socketUrl='/api/socket/direct-messages'
            paramKey='conversationId'
            paramValue={conversation.id}
            socketQuery={{
              conversationId: conversation.id,
            }}
          />

          <ChatInput
            name={otherMember.profile.name}
            type='conversation'
            apiUrl='/api/socket/direct-messages'
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
  );
};

export default MemberIdPage;
