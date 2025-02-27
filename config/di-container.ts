export class DIContainer {
  private static instance: DIContainer;
  private container: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  register(key: string, implementation: any): void {
    this.container.set(key, implementation);
  }

  get<T>(key: string): T {
    const implementation = this.container.get(key);
    if (!implementation) {
      throw new Error(`No implementation found for ${key}`);
    }
    return implementation;
  }
}
