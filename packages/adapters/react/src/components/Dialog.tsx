import React from "react";
import { Modal, Flex, Center, Divider, ScrollArea } from "@mantine/core";

export type DialogProps = React.PropsWithChildren<{
  open: boolean;
  icon?: React.ReactNode;
  title: React.ReactNode;
  onClose: () => void;
}>;

export const Dialog = (props: DialogProps) => {
  const { open, icon, title, children, onClose } = props;
  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={
        <Flex>
          <Center>{icon}</Center>
          <Center ml="md">{title}</Center>
        </Flex>
      }
      centered
      size="md"
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Divider mb="sm" />
      {children}
    </Modal>
  );
};
