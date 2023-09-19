import { User, Query, Identity, DatabaseGateway } from "@monotonics/core";
import { PrismaClient } from "@prisma/client";

const convertUserQueryToPrismaQuery = (query: Query<User>) => {
  const prismaQuery: any = {};
  if (query?.filter?.id?.$eq !== undefined) {
    prismaQuery.id = query.filter.id.$eq;
  }
  if (query?.filter?.name?.$eq !== undefined) {
    prismaQuery.name = query.filter.name.$eq;
  }
  return prismaQuery;
};

export class SQLiteUserDatabaseAdapter implements DatabaseGateway<User> {
  constructor(private readonly prisma: PrismaClient) {}

  async add(entity: Omit<User, "id">): Promise<Identity> {
    const record = await this.prisma.user.create({
      data: {
        ...entity,
      },
    });
    return record.id;
  }

  async get(query?: Query<User>): Promise<User[]> {
    const records = await this.prisma.user.findMany({
      where: query && convertUserQueryToPrismaQuery(query),
    });
    const users: User[] = records.map((d: any) => ({
      id: d.id,
      name: d.name,
      email: d.email,
      roleId: d.roleId,
      status: d.status,
      password: d.password,
    }));
    return users;
  }

  async update(
    entity: { id: Identity } & Partial<Omit<User, "id">>
  ): Promise<Identity> {
    const record = await this.prisma.user.update({
      where: { id: entity.id },
      data: {
        ...entity,
      },
    });
    return record.id;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
