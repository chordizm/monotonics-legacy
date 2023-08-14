import { Select, TextInput, Button, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

export type Input = {
  type: "text" | "select";
  name: string;
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
      inputs.map((input) => [input.name, input.initialValue ?? ""])
    ),
    validate: Object.fromEntries(
      inputs.map((input) => [input.name, input.validate])
    ),
  });
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      {inputs.map((input) =>
        input.type === "text" ? (
          <TextInput
            key={input.label}
            name={input.name}
            label={input.label}
            value={form.values[input.name]}
            onChange={(event) =>
              form.setFieldValue(input.name, event.currentTarget.value)
            }
            description={input.description}
            error={form.errors[input.name]}
            style={{ marginBottom: 15 }}
          />
        ) : (
          <Select
            key={input.label}
            name={input.name}
            label={input.label}
            value={form.values[input.name].toString()}
            onChange={(value) => value && form.setFieldValue(input.name, value)}
            description={input.description}
            data={input?.options ?? []}
            error={form.errors[input.name]}
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
