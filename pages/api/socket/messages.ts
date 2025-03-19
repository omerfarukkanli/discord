import { currentProfilePages } from '@/lib/current-profile-pages';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  try {
    const proifle = await currentProfilePages(req);
    const { content, fileUrl } = req.body;
    const { channelId, serverId } = req.query;
    if (!proifle) return res.status(401).json({ error: 'Unauthorized' });
    if (!channelId || !serverId)
      return res
        .status(400)
        .json({ error: 'Channel and Server ID are required' });

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: proifle.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) return res.status(404).json({ error: 'Server not found' });

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });
    if (!channel) return res.status(404).json({ error: 'Channel not found' });

    const member = server.members.find(
      (member) => member.profileId === proifle.id
    );
    if (!member) return res.status(404).json({ error: 'Member not found' });

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channel.id as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            Profile: true,
          },
        },
      },
    });

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('[MESSAGES_POST]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
