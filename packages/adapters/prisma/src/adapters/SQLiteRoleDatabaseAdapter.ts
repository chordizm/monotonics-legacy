import { Role, DatabaseGateway, Query, Identity } from "@monotonics/core";
import { PrismaClient } from "@prisma/client";

const convertRoleQueryToPrismaQuery = (query: Query<Role>) => {
  const prismaQuery: any = {};
  if (query?.filter?.id?.$eq !== undefined) {
    prismaQuery.id = query.filter.id.$eq;
  }
  if (query?.filter?.name?.$eq !== undefined) {
    prismaQuery.name = query.filter.name.$eq;
  }
  return prismaQuery;
};

export class SQLiteRoleDatabaseAdapter implements DatabaseGateway<Role> {
  constructor(private readonly prisma: PrismaClient) {}

  async add(entity: Omit<Role, "id">): Promise<Identity> {
    const record = await this.prisma.role.create({
      data: {
        ...entity,
        permissions: entity.permissions.join(","),
      },
    });
    return record.id;
  }

  async get(query?: Query<Role>): Promise<Role[]> {
    const records = await this.prisma.role.findMany({
      where: query && convertRoleQueryToPrismaQuery(query),
    });
    const roles: Role[] = records.map((d: any) => ({
      id: d.id,
      name: d.name,
      permissions: (d.permissions as string).split(","),
    }));
    return roles;
  }

  async update(
    entity: { id: Identity } & Partial<Omit<Role, "id">>
  ): Promise<Identity> {
    const record = await this.prisma.role.update({
      where: { id: entity.id },
      data: {
        ...entity,
        permissions: entity.permissions?.join(","),
      },
    });
    return record.id;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.role.delete({
      where: { id },
    });
  }
}
