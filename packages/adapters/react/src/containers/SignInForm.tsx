import { Form } from "..";

export type SignInFormValues = { email: string; password: string };

export type SignInFormProps = {
  onSubmit?: (values: SignInFormValues) => void;
};

export const SignInForm = ({ onSubmit }: SignInFormProps): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Form
        inputs={[
          {
            name: "email",
            label: "E-mail",
            type: "email",
            validate: (value) => (value === "" ? "E-mail is required" : null),
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            validate: (value) => (value === "" ? "Password is required" : null),
          },
        ]}
        onSubmit={(values) => {
          onSubmit?.({
            email: values["email"].toString(),
            password: values["password"].toString(),
          });
        }}
      >
        Sign in
      </Form>
    </div>
  );
};
