import {
  NodeAPI,
  Node,
  NodeDef,
  NodeMessage,
  NodeMessageInFlow,
} from "node-red";
import { UseCases, Identity } from "@monotonics/core";

export const TASK_TRIGGER_NODE_NAME = "@monotonics/task";
export type TaskNodePayload = {
  id: Identity;
};

type TaskNodeProps = NodeDef & {};

export default function (RED: NodeAPI) {
  function TaskTriggerNode(this: Node, props: TaskNodeProps) {
    RED.nodes.createNode(this, props);
    const node = this;
    const trigger = (
      msg: NodeMessageInFlow,
      send?: (
        msg: NodeMessage | (NodeMessage | NodeMessage[] | null)[]
      ) => void,
      done?: (err?: Error | undefined) => void
    ) => {
      const payload = msg.payload as TaskNodePayload;
      if (!payload)
        return done?.(new Error("Payload is required for task trigger"));
      (
        (RED.settings.functionGlobalContext as any)?.usecases as UseCases
      )?.getRawData
        .execute(payload.id)
        .then((data) => {
          send?.({
            payload: { ...payload, size: data.length, blob: data },
          });
          done?.();
        });
    };

    RED.events.on(node.id, trigger);

    node.on("input", trigger);

    node.on("close", function () {
      RED.events.removeListener(node.id, trigger);
    });
  }
  RED.nodes.registerType(TASK_TRIGGER_NODE_NAME, TaskTriggerNode);
}
