import { currentProfilePages } from '@/lib/current-profile-pages';
import { db } from '@/lib/db';
import { NextApiResponseServerIo } from '@/types';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  try {
    const proifle = await currentProfilePages(req);
    const { content, fileUrl, fileType } = req.body;
    const { conversationId } = req.query;
    if (!proifle) return res.status(401).json({ error: 'Unauthorized' });
    if (!conversationId)
      return res
        .status(400)
        .json({ error: 'Channel and Server ID are required' });

    if (!content)
      return res.status(400).json({ error: 'Message content is required' });

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              profileId: proifle.id,
            },
          },
          {
            memberTwo: {
              profileId: proifle.id,
            },
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!conversation)
      return res.status(404).json({ error: 'Conversation not found' });

    const member =
      conversation.memberOne.profileId === proifle.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) return res.status(404).json({ error: 'Member not found' });

    const message = await db.directMessage.create({
      data: {
        content,
        fileUrl,
        fileType,
        conversationId: conversationId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.error('[DIRECT_MESSAGES_POST]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
