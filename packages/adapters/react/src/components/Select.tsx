import { Select as MantineSelect } from "@mantine/core";

export type SelectProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
};

export const Select = (props: SelectProps) => {
  const { label, value, onChange, options } = props;
  return (
    <MantineSelect
      label={label}
      value={value}
      data={options.map((option) => ({
        value: option.value,
        label: option.label,
      }))}
      onChange={(value) => {
        if (value) onChange?.(value);
      }}
    />
  );
};
