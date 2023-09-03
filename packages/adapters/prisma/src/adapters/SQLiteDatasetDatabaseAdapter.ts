import { Dataset, DatabaseGateway, Query, Identity } from "@monotonics/core";
import { PrismaClient } from "@prisma/client";

const convertDatasetQueryToPrismaQuery = (query: Query<Dataset>) => {
  const prismaQuery: any = {};
  if (query?.filter?.id?.$eq !== undefined) {
    prismaQuery.id = query.filter.id.$eq;
  }
  if (query?.filter?.name?.$eq !== undefined) {
    prismaQuery.name = query.filter.name.$eq;
  }
  if (query?.filter?.description?.$eq !== undefined) {
    prismaQuery.description = query.filter.description.$eq;
  }
  return prismaQuery;
};

export class SQLiteDatasetDatabaseAdapter implements DatabaseGateway<Dataset> {
  constructor(private readonly prisma: PrismaClient) {}
  async add(entity: Omit<Dataset, "id">): Promise<Identity> {
    console.log("SQLiteDatasetDatabaseAdapter.add", JSON.stringify(entity));
    const record = await this.prisma.dataset.create({
      data: {
        taskId: entity.taskId,
        name: entity.name,
        description: entity.description,
        params: JSON.stringify(entity.params),
      },
    });
    return record.id;
  }
  async get(query?: Query<Dataset>): Promise<Dataset[]> {
    console.log("SQLiteDatasetDatabaseAdapter.get", JSON.stringify(query));
    const records = await this.prisma.dataset.findMany({
      where: query && convertDatasetQueryToPrismaQuery(query),
    });
    const datasets: Dataset[] = records.map((d: any) => ({
      id: d.id,
      name: d.name,
      taskId: d.taskId,
      mimeType: d.mimeType,
      description: d.description,
      params: JSON.parse(d.params),
    }));
    return datasets;
  }
  async update(
    entity: { id: Identity } & Partial<Omit<Dataset, "id">>
  ): Promise<Identity> {
    console.log("SQLiteDatasetDatabaseAdapter.update", JSON.stringify(entity));
    const record = await this.prisma.dataset.update({
      where: { id: entity.id },
      data: {
        name: entity.name,
        description: entity.description,
        params: entity.params ? JSON.stringify(entity.params) : undefined,
      },
    });
    return record.id;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.dataset.delete({ where: { id } });
  }
}
