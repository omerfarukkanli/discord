import { useEffect, useState } from 'react';

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  bottomRef,
  chatRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const topDv = chatRef.current;

    const handleScrolll = () => {
      const scrollTop = topDv?.scrollTop;
      if (scrollTop === 0 && shouldLoadMore) loadMore();
    };
    topDv?.addEventListener('scroll', handleScrolll);
    return () => topDv?.removeEventListener('scroll', handleScrolll);
  }, [shouldLoadMore, loadMore, chatRef]);

  useEffect(() => {
    const bottomDv = bottomRef.current;
    const topDv = chatRef.current;

    const shouldAutoscroll = () => {
      if (!hasInitialized && bottomDv) {
        setHasInitialized(true);
        return true;
      }

      if (!topDv) return false;

      const distanceFromBottom =
        topDv.scrollHeight - topDv.scrollTop - topDv.clientHeight;

      return distanceFromBottom <= 100;
    };

    if (shouldAutoscroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 100);
    }
  }, [count, bottomRef, chatRef, hasInitialized, setHasInitialized]);
};
