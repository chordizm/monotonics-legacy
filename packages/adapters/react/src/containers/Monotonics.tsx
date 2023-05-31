import { AppShell } from "..";
import { Datasets, View } from ".";

export const Monotonics = (_: {}): JSX.Element => {
  return (
    <AppShell
      title={
        <p style={{ userSelect: "none", padding: 0, margin: 0 }}>MonoTonics</p>
      }
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
