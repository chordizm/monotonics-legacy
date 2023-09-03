export type Role = "admin" | "user";
export type Identity = string;
export type Identified = { id: Identity };
export type Entity<T> = Identified & T;

export type Dataset = Entity<{
  taskId: Identity;
  name: string;
  description: string;
  params: Record<string, unknown>;
}>;

export type Item = Record<string, unknown> & {
  labels: string[];
};

export type Index = Entity<{
  date: Date;
  datasetId: Identity;
  name: string;
  mimeType: string;
}>;

export type Data = Index & {
  status: "pending" | "processing" | "done" | "error";
  items: Item[];
  params: Record<string, unknown>;
};

export type Input = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  default?: string | number | boolean;
  options?: {
    label: string;
    value: string;
  }[];
};

export type TaskOptions = {
  inputs: Input[];
  labels: string[];
  readonly?: boolean;
};

export type Task = Entity<{
  name: string;
  mimeType: string;
  options: TaskOptions;
}>;

export type User = Entity<{ name: string; role: Role }>;
export type Tag = Entity<{ name: string }>;
export type Point = { x: number; y: number };
