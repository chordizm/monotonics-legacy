import { Identified, Identity } from "../domain";

export type Filter<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends any[]
      ? Filter<T[K][0]>
      : Filter<T[K]>
    : {
        $eq?: T[K];
        $gt?: T[K];
        $gte?: T[K];
        $lt?: T[K];
        $lte?: T[K];
        $regex?: T[K];
      };
};

export type Order<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends any[]
      ? Filter<T[K][0]>
      : Filter<T[K]>
    : "asc" | "desc";
};

export type Query<T extends Identified> = Partial<{
  filter: Filter<T>;
  order: Order<T>;
  count: number;
}>;

export type TaskRunnerGateway = {
  run: (taskId: Identity, dataId: Identity) => Promise<void>;
};

export type HasherGateway = {
  hash: (plain: string) => Promise<string>;
  compare: (plain: string, hash: string) => Promise<boolean>;
};

export type BlobStorageGateway = {
  createWriteStream: (id: Identity) => Promise<NodeJS.WritableStream>;
  createReadStream: (
    id: Identity
  ) => Promise<{ mimeType: string; stream: NodeJS.ReadableStream }>;
};

export type DatabaseGateway<T extends Identified> = {
  add: (entity: Omit<T, "id">) => Promise<Identity>;
  get: (query?: Query<T>) => Promise<T[]>;
  update: (
    entity: { id: Identity } & Partial<Omit<T, "id">>
  ) => Promise<Identity>;
  delete: (id: Identity) => Promise<void>;
};
