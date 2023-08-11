import express from "express";
import next from "next";
import http from "http";
import os from "os";
import path from "path";
import RED from "node-red";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import { LocalSettings } from "@node-red/runtime";
import {
  Adapters,
  AddData,
  UpdateData,
  CreateDataset,
  DataRepository,
  DatasetRepository,
  GetDataByDatasetId,
  GetDataset,
  GetDatasets,
  GetRawData,
  GetTasks,
  Services,
  TaskRepository,
  TaskRunner,
  UseCases,
} from "@monotonics/core";
import {
  NodeRedTaskDatabaseAdapter,
  NodeRedTaskRunner,
} from "@monotonics/adapter_node-red";
import {
  SQLiteDataDatabaseAdapter,
  SQLiteDatasetDatabaseAdapter,
} from "@monotonics/adapter_prisma";

const dev = process.env.NODE_ENV !== "production";
const app = express();
const nextApp = next({ dev });
const server = http.createServer(app);

const settings: LocalSettings = {
  uiPort: +(process.env.PORT || 1880),
  uiHost: process.env.HOST || "localhost",
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  userDir: path.join(os.homedir(), ".monotonics"),
  //    functionGlobalContext: { context },
};

const prisma = new PrismaClient();

const adapters: Adapters = {
  gateways: {
    taskRunner: new NodeRedTaskRunner(RED.events),
    data: new SQLiteDataDatabaseAdapter(prisma),
    dataset: new SQLiteDatasetDatabaseAdapter(prisma),
    task: new NodeRedTaskDatabaseAdapter(RED),
  },
  controllers: {},
  presenters: {},
};
const services: Services = {
  taskRunner: new TaskRunner(adapters),
  repositories: {
    data: new DataRepository(adapters),
    dataset: new DatasetRepository(adapters),
    task: new TaskRepository(adapters),
  },
};
const usecases: UseCases = {
  addData: new AddData(services),
  createDataset: new CreateDataset(services),
  getDataByDatasetId: new GetDataByDatasetId(services),
  updateData: new UpdateData(services),
  getDatasets: new GetDatasets(services),
  getDataset: new GetDataset(services),
  getRawData: new GetRawData(services),
  getTasks: new GetTasks(services),
};

RED.init(server, settings);
app.use("/red", RED.httpAdmin);
app.use("/api", RED.httpNode);
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb" }));

const handle = nextApp.getRequestHandler();
app.all(
  "*",
  (req, res, next) => {
    (req as any).usecases = usecases;
    next();
  },
  (req, res) => {
    return handle(req, res);
  }
);

const port = process.env.PORT || 3000;

Promise.all([RED.start(), nextApp.prepare()]).then(() => {
  server.listen(port, () => {
    console.log("listening on *:", port);
  });
});
