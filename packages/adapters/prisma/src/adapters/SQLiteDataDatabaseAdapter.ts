import { Data, DatabaseGateway, Query } from "@monotonics/core";
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

  async add(entity: Omit<Data, "id">): Promise<Data> {
    const record = await this.prisma.data.create({
      data: {
        ...entity,
        params: JSON.stringify(entity.params),
      },
    });
    const data: Data = {
      id: record.id,
      date: record.date,
      datasetId: record.datasetId,
      name: record.name,
      raw: record.raw,
      mimeType: record.mimeType,
      params: JSON.parse(record.params),
    };
    return data;
  }
  async get(query?: Query<Data>): Promise<Data[]> {
    const records = await this.prisma.data.findMany({
      where: query && convertDataQueryToPrismaQuery(query),
    });
    const data: Data[] = records.map((d) => ({
      id: d.id,
      date: d.date,
      datasetId: d.datasetId,
      name: d.name,
      raw: d.raw,
      mimeType: d.mimeType,
      params: JSON.parse(d.params),
    }));
    return data;
  }

  async update(entity: Data): Promise<Data> {
    const record = await this.prisma.data.update({
      where: { id: entity.id },
      data: {
        ...entity,
        params: JSON.stringify(entity.params),
      },
    });
    const data: Data = {
      id: record.id,
      date: record.date,
      datasetId: record.datasetId,
      name: record.name,
      mimeType: record.mimeType,
      raw: record.raw,
      params: record.params as any,
    };
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.data.delete({
      where: { id },
    });
  }
}
