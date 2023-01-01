import { ITSBeam, TSBeam } from "./TSBeam";

export class TSBeamContainer {
  private static dependencies: { [key: string]: ITSBeam } = {};

  private static addDependency({ key, object }) {
    this.dependencies[key] = object;
  }

  public static getDependency(key: string, constructor: any): ITSBeam {
    if (this.dependencies[key] == null) {
      this.addDependency({ key, object: new constructor() });
    }
    return this.dependencies[key];
  }
}

export function Autowired(classTemplate: any, key?: string) {
  return function (target: ITSBeam, propertyKey: string) {
    const getter = () => {
      return TSBeamContainer.getDependency(key, classTemplate);
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
    });
  };
}
