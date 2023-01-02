
export class TSBeamContainer {
  private static dependencies: { [key: string]: any } = {};

  private static addDependency({ key, object }) {
    this.dependencies[key] = object;
  }

  //for test purposes, will be removed later
  public static getDependencies() {
    return this.dependencies;
  }

  public static getDependency(key: string, constructor: any): any {
    const dependencyKey = key ?? constructor.name;
    if (this.dependencies[dependencyKey] == null) {
      this.addDependency({ key: dependencyKey, object: new constructor() });
    }
    return this.dependencies[dependencyKey];
  }
}

export function Autowired(classTemplate: any, key?: string) {
  return function (target: any, propertyKey: string) {
    const getter = () => {
      return TSBeamContainer.getDependency(
        key,
        classTemplate
      );
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
    });
  };
}
