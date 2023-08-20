import { ActionIcon } from "@mantine/core";

export type IconButtonProps = {
  size?: number | string;
  radius?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const IconButton = (props: IconButtonProps) => {
  const { size, children, radius, style, onClick } = props;
  return (
    <ActionIcon
      size={size}
      radius={radius ?? 0}
      style={style}
      onClick={onClick}
    >
      {children}
    </ActionIcon>
  );
};
