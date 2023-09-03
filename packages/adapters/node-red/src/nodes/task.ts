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
    console.log("[Node-RED TaskNode] Created.", node);
    const trigger = async (
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
      const useCases = (RED.settings.functionGlobalContext as any)
        ?.useCases as UseCases;
      if (!useCases)
        return done?.(new Error("UseCases not found in functionGlobalContext"));
      const data = await useCases.getDataById.execute({
        id: payload.id,
      });
      if (!data)
        return done?.(new Error(`Data not found for id ${payload.id}`));
      const { mimeType, stream } = await useCases?.getBlobStreamById.execute({
        id: payload.id,
      });
      const dataset = await useCases.getDataset.execute({
        id: data.datasetId,
      });
      node.send?.({
        payload: { ...payload, stream, mimeType, params: dataset.params },
      });
      console.log("[Node-RED TaskNode] Done.");
      done?.();
    };

    RED.events.on(node.id, trigger);

    node.on("input", trigger);

    node.on("close", function () {
      RED.events.removeListener(node.id, trigger);
    });
  }
  RED.nodes.registerType(TASK_TRIGGER_NODE_NAME, TaskNode);
}
