import { NodeAPI, Node, NodeDef } from "node-red";
import { Data, UseCases } from "@monotonics/core";

export const ADD_DATA_NODE_NAME = "@monotonics/add-data";
export type AddDataPayload = {
  data: Omit<Data, "id">;
  stream: NodeJS.ReadableStream;
};

type AddDataNodeProps = NodeDef & {};

export default function (RED: NodeAPI) {
  console.log("[Adapter Node-RED] Registering AddDataNode");
  function AddDataNode(this: Node, props: AddDataNodeProps) {
    RED.nodes.createNode(this, props);
    const node = this;
    node.on("input", (msg, send, done) => {
      const payload = msg.payload as AddDataPayload;
      (
        (RED.settings.functionGlobalContext as any)?.useCases as UseCases
      )?.addData
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
  RED.nodes.registerType(ADD_DATA_NODE_NAME, AddDataNode);
}
