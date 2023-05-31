import { Select, TextInput, Button, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

export type Input = {
  type: "text" | "select";
  initialValue?: string | number;
  label: string;
  options?: { value: string; label: string }[];
  description?: string;
  validate: (value: string | number) => string | null;
};

export type FormProps = React.PropsWithChildren<{
  inputs: Input[];
  onSubmit: (values: { [key: string]: string | number }) => void;
}>;

export const Form = (props: FormProps) => {
  const { inputs, onSubmit, children } = props;
  const form = useForm({
    initialValues: Object.fromEntries(
      inputs.map((input) => [input.label, input.initialValue ?? ""])
    ),
    validate: Object.fromEntries(
      inputs.map((input) => [input.label, input.validate])
    ),
  });
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      {inputs.map((input) =>
        input.type === "text" ? (
          <TextInput
            key={input.label}
            label={input.label}
            value={form.values[input.label]}
            onChange={(event) =>
              form.setFieldValue(input.label, event.currentTarget.value)
            }
            description={input.description}
            error={form.errors[input.label]}
            style={{ marginBottom: 15 }}
          />
        ) : (
          <Select
            key={input.label}
            label={input.label}
            value={form.values[input.label].toString()}
            onChange={(value) =>
              value && form.setFieldValue(input.label, value)
            }
            description={input.description}
            data={input?.options ?? []}
            error={form.errors[input.label]}
            style={{ marginBottom: 15 }}
          />
        )
      )}
      <Center>
        <Button type="submit" variant="light" color="blue">
          {children}
        </Button>
      </Center>
    </form>
  );
};
