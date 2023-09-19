import { HasherGateway } from "@monotonics/core";

export class DefaultHasherAdapter implements HasherGateway {
  async hash(plain: string): Promise<string> {
    return plain;
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain === hash;
  }
}
