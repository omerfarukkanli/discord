import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import NavigationSidebar from '@/components/navigation/navigation-sidebar';
import ServerSidebar from '@/components/server/server-sidebar';

const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='p-0 gap-0 m-0 w-[calc(15rem+72px)]'>
        <div className='h-full w-[72px] flex-col fixed inset-y-0'>
          <NavigationSidebar />
        </div>
        <div className='h-full ml-[72px] w-60 flex flex-col fixed inset-y-0'>
          <ServerSidebar serverId={serverId} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileToggle;
