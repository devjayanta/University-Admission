'use client';
import { Loader, Modal, Center } from '@mantine/core';

export default function GLoader({ opened }) {
  return (
    <Modal
      opened={opened}
      onClose={() => {}}
      withCloseButton={false}
      centered
      size="auto"
      overlayProps={{ opacity: 0.2, blur: 2 }}
    >
      <Center>
        <Loader color="indigo" size="lg" type="bars"/>
      </Center>
    </Modal>
  );
}
