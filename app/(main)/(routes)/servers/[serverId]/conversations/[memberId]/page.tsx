import ChatHeader from '@/components/chat/chat-header';
import { getOrCreateConversation } from '@/lib/conversation';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { RedirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface MemberIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  };
}
const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const { serverId, memberId } = await params;
  const profile = await currentProfile();
  if (!profile) return <RedirectToSignIn />;

  const currentMember = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
    include: {
      Profile: true,
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
        imageUrl={otherMember.Profile.imageUrl}
        serverId={serverId}
        name={otherMember.Profile.name}
        type='conversation'
      />
    </div>
  );
};

export default MemberIdPage;
