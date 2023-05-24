export { TASK_TRIGGER_NODE_NAME } from "./task";
export { ADD_DATA_NODE_NAME } from "./add-data";
import registerTaskNodeType from "./task";
import registerAddDataNodeType from "./add-data";
import { NodeAPI } from "node-red";

export default function (RED: NodeAPI) {
  registerTaskNodeType(RED);
  registerAddDataNodeType(RED);
}
