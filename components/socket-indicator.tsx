'use client';

import { useSocket } from '@/components/provaiders/socket-provaider';
import { Badge } from '@/components/ui/badge';

export const SockerIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant='outline' className='bg-yellow-600 text-white border-none'>
        Fallback: Polling every 1 s
      </Badge>
    );
  }
  return (
    <Badge variant='outline' className='bg-emerald-600 text-white border-none'>
      Live: Real-time updates
    </Badge>
  );
};
