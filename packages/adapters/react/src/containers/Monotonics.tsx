import { AppShell } from "..";
import { Datasets, View } from ".";

export const Monotonics = (_: {}): JSX.Element => {
  return (
    <AppShell
      title="MonoTonics"
      navbar={{
        sections: [
          {
            title: "Datasets",
            component: <Datasets />,
          },
        ],
      }}
    >
      <View />
    </AppShell>
  );
};
