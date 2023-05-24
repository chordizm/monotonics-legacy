// NodeRedTaskRunner implements TaskRunner
import { Node, NodeRedApp } from "node-red";
import { DatabaseGateway, Query, Task } from "@monotonics/core";
import { TASK_TRIGGER_NODE_NAME } from "../nodes";

export class NodeRedTaskDatabaseAdapter implements DatabaseGateway<Task> {
  constructor(private readonly red: NodeRedApp) {}

  async add(): Promise<Task> {
    return Promise.reject("Not supported");
  }
  async get(query?: Query<Task>): Promise<Task[]> {
    const tasks: Task[] = [];
    (this.red.nodes as any).eachNode((node: Node & { mimeType: string }) => {
      if (node.type === TASK_TRIGGER_NODE_NAME) {
        tasks.push({
          id: node.id,
          mimeType: node.mimeType,
          name: node.name ?? "",
        });
      }
    });
    return tasks;
  }
  async update(): Promise<Task> {
    return Promise.reject("Not supported");
  }
  async delete(): Promise<void> {
    return Promise.reject("Not supported");
  }
}
