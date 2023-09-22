import { NodeAPI, Node, NodeDef } from "node-red";
import { Data } from "@monotonics/core";

export const HTTP_REQUEST_NODE_NAME = "@monotonics/http-request";
export type HttpRequestPayload = {
  id: Data["id"];
  mimeType: Data["mimeType"];
  stream: NodeJS.ReadableStream;
};

type HttpRequestNodeProps = NodeDef & {};

export default function (RED: NodeAPI) {
  function HttpRequestNode(this: Node, props: HttpRequestNodeProps) {
    console.log("[Adapter Node-RED] Registering HttpRequestNode");
    RED.nodes.createNode(this, props);
    const node = this;
    node.on("input", async (msg, send, done) => {
      const { id, stream, mimeType } = msg.payload as HttpRequestPayload;
      // Convert stream to buffer
      const chunks: Uint8Array[] = [];
      stream.on("data", (chunk) => {
        chunks.push(chunk);
      });
      stream.on("end", async () => {
        console.log("[Node-RED HttpRequestNode] Stream ended");
        const buffer = Buffer.concat(chunks);
        console.log(
          "[Node-RED HttpRequestNode] Buffer loaded",
          `${buffer.length} bytes`
        );
        // Buffer to blob
        const file = new Blob([buffer], { type: mimeType });
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", id);
        console.log(
          "[Node-RED HttpRequestNode] Sending request",
          `URL: ${(props as any).url}`
        );
        const payload = await fetch((props as any).url, {
          method: "POST",
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //     accept: "application/json",
          //   },
          //   mode: "cors",
          body: formData,
        })
          .then((res) => {
            console.log("[Node-RED HttpRequestNode] Fetch response", res);
            return res.json();
          })
          .then(
            (json) =>
              json as {
                id: Data["id"];
                items: Data["items"];
                params: Data["params"];
                status: Data["status"];
              }[]
          )
          .catch((err) => {
            console.log("[Node-RED HttpRequestNode] Fetch error", err);
            return {
              id,
              status: "error",
            };
          });
        node.send({
          payload,
        });
        done();
      });
      stream.on("error", (err) => {
        console.log("[Node-RED HttpRequestNode] Stream error", err);
        node.send({
          payload: {
            id,
            status: "error",
          },
        });
        done(err);
      });
    });
  }
  RED.nodes.registerType(HTTP_REQUEST_NODE_NAME, HttpRequestNode);
}
