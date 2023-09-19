import express from "express";
import next from "next";
import http from "http";
import RED from "node-red";
import bodyParser from "body-parser";
import os from "os";
import path from "path";
import { PrismaClient } from "@prisma/client";
import {
  Adapters,
  AddData,
  UpdateData,
  CreateDataset,
  DataRepository,
  DatasetRepository,
  GetDataByDatasetId,
  GetBlobStreamById,
  GetDataset,
  GetDatasets,
  GetTasks,
  Services,
  TaskRepository,
  TaskRunner,
  RunTask,
  useCases,
  GetDataById,
  FileSystemBlobStorageAdapter,
  BlobStorage,
  UserRepository,
  RoleRepository,
  CreateRole,
  CreateUser,
  SignIn,
  GetUsers,
  GetRoles,
  GetPermissions,
  GetUserByEmail,
} from "@monotonics/core";
import {
  NodeRedTaskDatabaseAdapter,
  NodeRedTaskRunner,
  init as initNodeRed,
} from "@monotonics/adapter_node-red";
import {
  SQLiteDataDatabaseAdapter,
  SQLiteDatasetDatabaseAdapter,
  SQLiteRoleDatabaseAdapter,
  SQLiteUserDatabaseAdapter,
} from "@monotonics/adapter_prisma";
import { DefaultHasherAdapter } from "./adapters/DefaultHasherAdapter";

const dev = process.env.NODE_ENV !== "production";
const app = express();
const nextApp = next({ dev });
const server = http.createServer(app);
const nodeRedApp = express();

initNodeRed(server, useCases);

const prisma = new PrismaClient();

const defaultBlobStoragePath = path.join(os.homedir(), ".monotonics", "blobs");

const adapters: Adapters = {
  gateways: {
    hasher: new DefaultHasherAdapter(),
    taskRunner: new NodeRedTaskRunner(RED.events),
    blobStorage: new FileSystemBlobStorageAdapter(defaultBlobStoragePath),
    data: new SQLiteDataDatabaseAdapter(prisma),
    dataset: new SQLiteDatasetDatabaseAdapter(prisma),
    task: new NodeRedTaskDatabaseAdapter(RED),
    user: new SQLiteUserDatabaseAdapter(prisma),
    role: new SQLiteRoleDatabaseAdapter(prisma),
  },
};
const services: Services = {
  taskRunner: new TaskRunner(adapters),
  blobStorage: new BlobStorage(adapters),
  repositories: {
    data: new DataRepository(adapters),
    dataset: new DatasetRepository(adapters),
    task: new TaskRepository(adapters),
    user: new UserRepository(adapters),
    role: new RoleRepository(adapters),
  },
};
useCases.addData = new AddData(services);
useCases.createDataset = new CreateDataset(services);
useCases.getUsers = new GetUsers(services);
useCases.getDataByDatasetId = new GetDataByDatasetId(services);
useCases.getBlobStreamById = new GetBlobStreamById(services);
useCases.updateData = new UpdateData(services);
useCases.getDatasets = new GetDatasets(services);
useCases.getDataset = new GetDataset(services);
useCases.getDataById = new GetDataById(services);
useCases.getTasks = new GetTasks(services);
useCases.runTask = new RunTask(services);
useCases.createRole = new CreateRole(services);
useCases.createUser = new CreateUser(services);
useCases.signIn = new SignIn(services);
useCases.getRoles = new GetRoles(services);
useCases.getPermissions = new GetPermissions(services);
useCases.getUserByEmail = new GetUserByEmail(services);

nodeRedApp.use("/", RED.httpAdmin);
app.use("/api", RED.httpNode);
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb" }));

const handle = nextApp.getRequestHandler();
app.all("*", (req, res) => {
  (req as any).useCases = useCases;
  return handle(req, res);
});

const port = process.env.PORT || 3000;

const initialize = async () => {
  const roles = await useCases.getRoles.execute({});
  console.log(roles);
  let roleId = "";
  if (roles.length === 0) {
    roleId = await useCases.createRole.execute({
      name: "admin",
      permissions: ["*"],
    });
  } else {
    roleId = roles.find((r) => r.name === "admin")!.id;
  }
  const users = await useCases.getUsers.execute({});
  console.log(users);
  if (users.length === 0) {
    await useCases.createUser.execute({
      roleId,
      name: "admin",
      email: "admin@monotonics.dev",
      password: "password",
      status: "active",
    });
  }
};

initialize().then(() => {
  console.log("[MonoTonics] Initialize completed.");
  Promise.all([RED.start(), nextApp.prepare()]).then(() => {
    server.listen(port, () => {
      console.log("listening on *:", port);
    });
    nodeRedApp.listen(1880, () => {
      console.log("listening on *:", 1880);
    });
  });
});
