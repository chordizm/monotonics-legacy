import { Dataset, DatabaseGateway, Query } from "@monotonics/core";
import { PrismaClient } from "@prisma/client";

const convertDatasetQueryToPrismaQuery = (query: Query<Dataset>) => {
  const prismaQuery: any = {};
  if (query?.filter?.id?.$eq !== undefined) {
    prismaQuery.id = query.filter.id.$eq;
  }
  if (query?.filter?.name?.$eq !== undefined) {
    prismaQuery.name = query.filter.name.$eq;
  }
  if (query?.filter?.taskId?.$eq !== undefined) {
    prismaQuery.taskId = query.filter.taskId.$eq;
  }
  if (query?.filter?.description?.$eq !== undefined) {
    prismaQuery.description = query.filter.description.$eq;
  }
  return prismaQuery;
};

export class SQLiteDatasetDatabaseAdapter implements DatabaseGateway<Dataset> {
  constructor(private readonly prisma: PrismaClient) {}
  async add(entity: Omit<Dataset, "id">): Promise<Dataset> {
    const record = await this.prisma.dataset.create({
      data: {
        name: entity.name,
        taskId: entity.taskId,
        description: entity.description,
      },
    });
    const dataset: Dataset = {
      id: record.id,
      name: record.name,
      taskId: record.taskId,
      description: record.description,
    };
    return dataset;
  }
  async get(query?: Query<Dataset>): Promise<Dataset[]> {
    const records = await this.prisma.dataset.findMany({
      where: query && convertDatasetQueryToPrismaQuery(query),
    });
    const datasets: Dataset[] = records.map((d: any) => ({
      id: d.id,
      name: d.name,
      taskId: d.taskId,
      description: d.description,
    }));
    return datasets;
  }
  async update(entity: Dataset): Promise<Dataset> {
    const record = await this.prisma.dataset.update({
      where: { id: entity.id },
      data: {
        name: entity.name,
        taskId: entity.taskId,
        description: entity.description,
      },
    });
    const dataset: Dataset = {
      id: record.id,
      name: record.name,
      taskId: record.taskId,
      description: record.description,
    };
    return dataset;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.dataset.delete({ where: { id } });
  }
}
