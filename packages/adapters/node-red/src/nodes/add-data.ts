import { NodeAPI, Node, NodeDef } from "node-red";
import { Data, UseCases } from "@monotonics/core";

export const ADD_DATA_NODE_NAME = "@monotonics/add-data";
export type AddDataPayload = Omit<Data, "id">;

type AddDataNodeProps = NodeDef & {};

export default function (RED: NodeAPI) {
  function AddDataNode(this: Node, props: AddDataNodeProps) {
    RED.nodes.createNode(this, props);
    const node = this;
    node.on("input", (msg, send, done) => {
      const payload = msg.payload as AddDataPayload;
      (
        (RED.settings.functionGlobalContext as any)?.usecases as UseCases
      )?.addData
        .execute(payload)
        .then((id) => {
          send({
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
