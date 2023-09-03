import { Select, TextInput, Button, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

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
  onChange?: (values: { [key: string]: string | number }) => void;
  onSubmit: (values: { [key: string]: string | number }) => void;
}>;

export const Form = (props: FormProps) => {
  const { inputs, onSubmit, onChange, children } = props;
  const form = useForm({
    initialValues: Object.fromEntries(
      inputs.map((input) => [input.name, input.initialValue ?? ""])
    ),
    validate: Object.fromEntries(
      inputs.map((input) => [input.name, input.validate])
    ),
  });
  useEffect(() => {
    const values = Object.fromEntries(
      Object.keys(form.values).map((key) => [
        key,
        inputs.some((x) => x.name === key) ? form.values[key] : undefined,
      ])
    );
    const errors = Object.fromEntries(
      Object.keys(form.errors).map((key) => [
        key,
        inputs.some((x) => x.name === key) ? form.errors[key] : undefined,
      ])
    );
    form.setValues(values);
    form.setErrors(errors);
  }, [inputs]);
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        const _values = Object.fromEntries(
          Object.keys(values)
            .filter((x) => inputs.some((y) => y.name === x))
            .map((x) => [x, values[x]])
        );
        onSubmit(_values);
      })}
    >
      {inputs.map((input) =>
        input.type === "text" ? (
          <TextInput
            key={input.label}
            name={input.name}
            label={input.label}
            value={form.values[input.name]}
            onChange={(event) => {
              form.setFieldValue(input.name, event.currentTarget.value);
              onChange?.({ [input.name]: event.currentTarget.value });
            }}
            description={input.description}
            error={form.errors[input.name]}
            style={{ marginBottom: 15 }}
          />
        ) : (
          <Select
            key={input.label}
            name={input.name}
            label={input.label}
            value={form.values[input.name]?.toString()}
            onChange={(value) => {
              value && form.setFieldValue(input.name, value);
              value && onChange?.({ [input.name]: value });
            }}
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
