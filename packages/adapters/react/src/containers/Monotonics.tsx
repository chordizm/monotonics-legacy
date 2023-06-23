import { AppShell } from "..";
import { CreateDatasetButton, Datasets, View } from ".";
import { IconDatabase } from "@tabler/icons-react";

export const Monotonics = (_: {}): JSX.Element => {
  return (
    <AppShell
      navbar={{
        title: "Dataset",
        icon: <IconDatabase size="1rem" />,
        action: <CreateDatasetButton />,
        content: <Datasets />,
      }}
    >
      <View />
    </AppShell>
  );
};
