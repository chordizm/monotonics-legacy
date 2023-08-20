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
  console.log("[Adapter Node-RED] Registering TaskNode");
  function TaskNode(this: Node, props: TaskNodeProps) {
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
      console.log("TaskNode", payload);
      if (!payload)
        return done?.(new Error("Payload is required for task trigger"));
      (
        (RED.settings.functionGlobalContext as any)?.usecases as UseCases
      )?.getDataUrlById
        .execute({
          id: payload.id,
        })
        .then((dataUrl) => {
          if (dataUrl.length === 0) {
            console.log(
              `[Node-RED TaskNode] No data found for task ${payload.id}`
            );
            return done?.(new Error(`No data found for task ${payload.id}`));
          }
          console.log(`[Node-RED TaskNode] Data URL: ${dataUrl.length} chars`);
          node.send?.({
            payload: { ...payload, dataUrl },
          });
          console.log("[Node-RED TaskNode] Sent.");
          done?.();
        });
    };

    RED.events.on(node.id, trigger);

    node.on("input", trigger);

    node.on("close", function () {
      RED.events.removeListener(node.id, trigger);
    });
  }
  RED.nodes.registerType(TASK_TRIGGER_NODE_NAME, TaskNode);
}
