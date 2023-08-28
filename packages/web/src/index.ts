import express from "express";
import next from "next";
import http from "http";
import RED from "node-red";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
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
  GetTasks,
  Services,
  TaskRepository,
  TaskRunner,
  RunTask,
  useCases,
  GetDataById,
} from "@monotonics/core";
import {
  NodeRedTaskDatabaseAdapter,
  NodeRedTaskRunner,
  init as initNodeRed,
} from "@monotonics/adapter_node-red";
import {
  SQLiteDataDatabaseAdapter,
  SQLiteDatasetDatabaseAdapter,
} from "@monotonics/adapter_prisma";

const dev = process.env.NODE_ENV !== "production";
const app = express();
const nextApp = next({ dev });
const server = http.createServer(app);

initNodeRed(server, useCases);

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
useCases.addData = new AddData(services);
useCases.createDataset = new CreateDataset(services);
useCases.getDataByDatasetId = new GetDataByDatasetId(services);
useCases.updateData = new UpdateData(services);
useCases.getDatasets = new GetDatasets(services);
useCases.getDataset = new GetDataset(services);
useCases.getDataById = new GetDataById(services);
useCases.getTasks = new GetTasks(services);
useCases.runTask = new RunTask(services);

app.use("/red", RED.httpAdmin);
app.use("/api", RED.httpNode);
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb" }));

const handle = nextApp.getRequestHandler();
app.all(
  "*",
  (req, res, next) => {
    (req as any).usecases = useCases;
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
