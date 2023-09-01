import { NodeAPI, Node, NodeDef } from "node-red";
import { Data, UseCases } from "@monotonics/core";

export const UPDATE_DATA_NODE_NAME = "@monotonics/update-data";
export type UpdateDataPayload = {
  id: Data["id"];
  items: Data["items"];
  params: Data["params"];
};

type UpdateDataNodeProps = NodeDef & {};

export default function (RED: NodeAPI) {
  function UpdateDataNode(this: Node, props: UpdateDataNodeProps) {
    console.log("[Adapter Node-RED] Registering UpdateDataNode");
    RED.nodes.createNode(this, props);
    const node = this;
    node.on("input", (msg, send, done) => {
      const payload = msg.payload as UpdateDataPayload;
      (
        (RED.settings.functionGlobalContext as any)?.useCases as UseCases
      )?.updateData
        .execute(payload)
        .then((id) => {
          node.send({
            payload: {
              id,
            },
          });
          done();
        });
    });
  }
  RED.nodes.registerType(UPDATE_DATA_NODE_NAME, UpdateDataNode);
}
