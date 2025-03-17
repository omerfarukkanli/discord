'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ActionToolTipProps {
  label: string;
  children: React.ReactNode;
  side?: 'top' | 'left' | 'bottom' | 'right';
  align?: 'start' | 'center' | 'end';
}

export const ActoionTooltip = ({
  label,
  children,
  align,
  side,
}: ActionToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className=' font-semibold text-sm capitalize'>
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
