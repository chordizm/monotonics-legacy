export type Role = "admin" | "user";
export type Identity = string;
export type Identified = { id: Identity };
export type Entity<T> = Identified & T;

export type Dataset = Entity<{
  taskId: Identity;
  name: string;
  description: string;
}>;
export type Data = Entity<{
  date: Date;
  datasetId: Identity;
  name: string;
  mimeType: string;
  raw: Buffer;
  params: Record<string, unknown>;
}>;
export type Task = Entity<{ name: string; mimeType: string }>;

export type User = Entity<{ name: string; role: Role }>;
export type Tag = Entity<{ name: string }>;
export type Point = { x: number; y: number };
export type Segment = {
  points: Point[];
  params: Record<string, unknown>;
};
export type ImageData = {
  segments: Segment[];
  params: Record<string, unknown>;
};
