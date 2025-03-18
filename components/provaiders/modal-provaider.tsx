'use client';
import { useEffect, useState } from 'react';
import InviteModal from '@/components/modals/invite-modal';
import CreateServerModal from '@/components/modals/create-server-modal';
import EditServerModal from '@/components/modals/edit-server-modal';
import MemberModal from '@/components/modals/members-modal';

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
    </>
  );
};
