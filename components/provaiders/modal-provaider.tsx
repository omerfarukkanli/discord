'use client';
import { useEffect, useState } from 'react';
import InviteModal from '@/components/modals/invite-modal';
import CreateServerModal from '@/components/modals/create-server-modal';
import EditServerModal from '@/components/modals/edit-server-modal';
import MemberModal from '@/components/modals/members-modal';
import CreateChannelModal from '@/components/modals/create-channel-modal';
import LeaveServerModal from '@/components/modals/leave-server-modal';
import DeleteServerModal from '@/components/modals/delete-server-modal';
import DeleteChannelModal from '@/components/modals/delete-channel-modal';
import EditChannelModal from '@/components/modals/edit-channel-modal';

export const ModalProvider = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemberModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  );
};
