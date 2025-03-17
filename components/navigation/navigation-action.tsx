'use client';
import { Plus } from 'lucide-react';
import { ActoionTooltip } from '@/components/action-tooltip';
import { useModalStore } from '@/hooks/use-modal-store';
const NavigationAction = () => {
  const { onOpen } = useModalStore();

  return (
    <div>
      <ActoionTooltip side='right' align='center' label='Add a Server'>
        <button
          onClick={() => onOpen('createServer')}
          className='group flex items-center'
        >
          <div className='flex mx-3 h-[48px] w-[48px] rounded-[24px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-500 group-hover:rounded-[16px]'>
            <Plus
              className='text-emerald-500 group-hover:text-white transition'
              size={25}
            />
          </div>
        </button>
      </ActoionTooltip>
    </div>
  );
};

export default NavigationAction;
