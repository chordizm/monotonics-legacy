import { AppShell } from "..";
import { Datasets, View } from ".";

export const Monotonics = (_: {}): JSX.Element => {
  return (
    <AppShell navbar={<Datasets />}>
      <View />
    </AppShell>
  );
};
