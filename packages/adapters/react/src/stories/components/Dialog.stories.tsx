import { Dialog } from "@/components";

export default {
  title: "Components/Dialog",
  component: Dialog,
};

export const Open = {
  args: {
    open: true,
    title: "Dialog Title",
    children: "Dialog Content",
  },
};
