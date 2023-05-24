import os from "os";
import path from "path";
import { Server, IncomingMessage, ServerResponse } from "http";
import { LocalSettings } from "@node-red/runtime";
import RED from "node-red";
import { UseCases } from "@monotonics/core";
import registerMonotonicNodeTypes from "./nodes";

export * from "./adapters";

export const init = <
  Request extends typeof IncomingMessage,
  Response extends typeof ServerResponse
>(
  server: Server<Request, Response>,
  settings: LocalSettings,
  usecases: UseCases
) => {
  const _settings = {
    ...settings,
    functionGlobalContext: { ...settings.functionGlobalContext, usecases },
    userDir: path.join(os.homedir(), ".monotonics"),
  };
  RED.init(server, settings);
};

export default function (RED: any) {
  registerMonotonicNodeTypes(RED);
}
