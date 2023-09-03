import { Data, DatabaseGateway, Identity, Query } from "@monotonics/core";
import { PrismaClient } from "@prisma/client";

const convertDataQueryToPrismaQuery = (query: Query<Data>) => {
  const prismaQuery: any = {};
  if (query?.filter?.id?.$eq !== undefined) {
    prismaQuery.id = query.filter.id.$eq;
  }
  if (query?.filter?.datasetId?.$eq !== undefined) {
    prismaQuery.datasetId = query.filter.datasetId.$eq;
  }
  return prismaQuery;
};

export class SQLiteDataDatabaseAdapter implements DatabaseGateway<Data> {
  constructor(private readonly prisma: PrismaClient) {}

  async add(entity: Omit<Data, "id">): Promise<Identity> {
    console.log("SQLiteDataDatabaseAdapter.add", JSON.stringify(entity));
    const record = await this.prisma.data.create({
      data: {
        ...entity,
        items: JSON.stringify(entity.items),
        params: JSON.stringify(entity.params),
        status: "pending",
      },
    });
    return record.id;
  }
  async get(query?: Query<Data>): Promise<Data[]> {
    console.log("SQLiteDataDatabaseAdapter.get", JSON.stringify(query));
    const records = await this.prisma.data.findMany({
      where: query && convertDataQueryToPrismaQuery(query),
    });
    const data: Data[] = records.map((d: any) => ({
      id: d.id,
      date: d.date,
      datasetId: d.datasetId,
      name: d.name,
      mimeType: d.mimeType,
      params: JSON.parse(d.params),
      items: JSON.parse(d.items),
      status: d.status,
    }));
    return data;
  }

  async update(
    entity: { id: Identity } & Partial<Omit<Data, "id">>
  ): Promise<Identity> {
    console.log("SQLiteDataDatabaseAdapter.update", JSON.stringify(entity));
    const data: any = {};
    if (entity.items) {
      data["items"] = JSON.stringify(entity.items);
    }
    if (entity.params) {
      data["params"] = JSON.stringify(entity.params);
    }
    if (entity.status) {
      data["status"] = entity.status;
    }

    const record = await this.prisma.data.update({
      where: { id: entity.id },
      data,
    });
    return record.id;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.data.delete({
      where: { id },
    });
  }
}
