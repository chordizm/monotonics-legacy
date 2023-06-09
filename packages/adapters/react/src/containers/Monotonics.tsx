import { AppShell } from "..";
import { Datasets,Tasks, View } from ".";

export const Monotonics = (_: {}): JSX.Element => {
  return (
    <AppShell navbar={[<Datasets />,<Tasks/>]}>
      <View />
    </AppShell>
  );
};
