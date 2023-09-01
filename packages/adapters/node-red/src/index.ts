import os from "os";
import path from "path";
import { Server, IncomingMessage, ServerResponse } from "http";
import { LocalSettings } from "@node-red/runtime";
import RED from "node-red";
import { UseCases } from "@monotonics/core";
import registerMonotonicNodeTypes from "./nodes";

export * from "./adapters";

const defaultSettings: LocalSettings = {
  uiPort: +(process.env.PORT || 1880),
  uiHost: process.env.HOST || "localhost",
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  userDir: path.join(os.homedir(), ".monotonics"),
};

export const init = <
  Request extends typeof IncomingMessage,
  Response extends typeof ServerResponse
>(
  server: Server<Request, Response>,
  useCases: UseCases,
  settings?: LocalSettings
) => {
  const _settings = {
    ...defaultSettings,
    ...settings,
    functionGlobalContext: { ...settings?.functionGlobalContext, useCases },
  };
  RED.init(server, _settings);
};

export default function (RED: any) {
  registerMonotonicNodeTypes(RED);
}
