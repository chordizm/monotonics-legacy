import { AddDataUseCase } from "./AddDataUseCase";
import { CreateDatasetUseCase } from "./CreateDatasetUseCase";
import { GetBlobStreamByIdUseCase } from "./GetBlobStreamByIdUseCase";
import { GetDataByDatasetIdUseCase } from "./GetDataByDatasetIdUseCase";
import { GetDataByIdUseCase } from "./GetDataByIdUseCase";
import { GetDatasetsUseCase } from "./GetDatasetsUseCase";
import { GetDatasetUseCase } from "./GetDatasetUseCase";
import { GetTasksUseCase } from "./GetTasksUseCase";
import { RunTaskUseCase } from "./RunTaskUseCase";
import { UpdateDataUseCase } from "./UpdateDataUseCase";
import { GetUsersUseCase } from "./GetUsersUseCase";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";
import { GetRoleByIdUseCase } from "./GetRoleByIdUseCase";
import { GetRolesUseCase } from "./GetRolesUseCase";
import { SignInUseCase } from "./SignInUseCase";
import { CreateRoleUseCase } from "./CreateRoleUseCase";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { GetPermissionsUseCase } from "./GetPermissionsUseCase";
import { GetUserByEmailUseCase } from "./GetUserByEmailUseCase";
export {
  default as AddData,
  AddDataUseCase,
  AddDataUseCaseInput,
} from "./AddDataUseCase";
export {
  default as CreateDataset,
  CreateDatasetUseCase,
} from "./CreateDatasetUseCase";
export {
  default as GetBlobStreamById,
  GetBlobStreamByIdUseCase,
  GetBlobStreamByIdUseCaseInput,
} from "./GetBlobStreamByIdUseCase";
export {
  default as GetDataByDatasetId,
  GetDataByDatasetIdUseCase,
} from "./GetDataByDatasetIdUseCase";
export {
  default as GetDataById,
  GetDataByIdUseCase,
  GetDataByIdUseCaseInput,
} from "./GetDataByIdUseCase";
export {
  default as GetDatasets,
  GetDatasetsUseCase,
} from "./GetDatasetsUseCase";
export {
  default as GetDataset,
  GetDatasetUseCase,
  GetDatasetUseCaseInput,
} from "./GetDatasetUseCase";
export { default as GetRawData } from "./GetDataByIdUseCase";
export {
  default as GetTasks,
  GetTasksUseCase,
  GetTasksUseCaseInput,
} from "./GetTasksUseCase";
export {
  default as RunTask,
  RunTaskUseCase,
  RunTaskUseCaseInput,
} from "./RunTaskUseCase";
export {
  default as UpdateData,
  UpdateDataUseCase,
  UpdateDataUseCaseInput,
} from "./UpdateDataUseCase";
export {
  default as SignIn,
  SignInUseCase,
  SignInUseCaseInput,
} from "./SignInUseCase";
export { default as CreateUser, CreateUserUseCase } from "./CreateUserUseCase";
export { default as CreateRole, CreateRoleUseCase } from "./CreateRoleUseCase";
export { default as GetUsers, GetUsersUseCase } from "./GetUsersUseCase";
export { default as GetRoles, GetRolesUseCase } from "./GetRolesUseCase";
export {
  default as GetPermissions,
  GetPermissionsUseCase,
} from "./GetPermissionsUseCase";
export {
  default as GetUserByEmail,
  GetUserByEmailUseCase,
} from "./GetUserByEmailUseCase";

export type UseCase<Input, Output> = {
  execute: (input: Input) => Output;
};

export type AsyncUseCase<Input, Output> = UseCase<Input, Promise<Output>>;

export type UseCases = {
  signIn: SignInUseCase;
  addData: AddDataUseCase;
  createDataset: CreateDatasetUseCase;
  getDataByDatasetId: GetDataByDatasetIdUseCase;
  getDatasets: GetDatasetsUseCase;
  getDataset: GetDatasetUseCase;
  getDataById: GetDataByIdUseCase;
  getBlobStreamById: GetBlobStreamByIdUseCase;
  getTasks: GetTasksUseCase;
  runTask: RunTaskUseCase;
  updateData: UpdateDataUseCase;
  getUsers: GetUsersUseCase;
  getUserById: GetUserByIdUseCase;
  getRoleById: GetRoleByIdUseCase;
  getRoles: GetRolesUseCase;
  createRole: CreateRoleUseCase;
  createUser: CreateUserUseCase;
  getPermissions: GetPermissionsUseCase;
  getUserByEmail: GetUserByEmailUseCase;
};

const buildDefaultUseCase: (name: string) => UseCase<any, any> = (name) => ({
  execute: () => {
    throw new Error(`Use case ${name} is not implemented.`);
  },
});

export const useCases: UseCases = {
  signIn: buildDefaultUseCase("signIn"),
  addData: buildDefaultUseCase("addData"),
  createDataset: buildDefaultUseCase("createDataset"),
  getDataByDatasetId: buildDefaultUseCase("getDataByDatasetId"),
  getDatasets: buildDefaultUseCase("getDatasets"),
  getDataset: buildDefaultUseCase("getDataset"),
  getDataById: buildDefaultUseCase("getDataById"),
  getBlobStreamById: buildDefaultUseCase("getBlobStreamById"),
  getTasks: buildDefaultUseCase("getTasks"),
  runTask: buildDefaultUseCase("runTask"),
  updateData: buildDefaultUseCase("updateData"),
  getUsers: buildDefaultUseCase("getUsers"),
  getUserById: buildDefaultUseCase("getUserById"),
  getRoleById: buildDefaultUseCase("getRoleById"),
  getRoles: buildDefaultUseCase("getRoles"),
  createRole: buildDefaultUseCase("createRole"),
  createUser: buildDefaultUseCase("createUser"),
  getPermissions: buildDefaultUseCase("getPermissions"),
  getUserByEmail: buildDefaultUseCase("getUserByEmail"),
};
