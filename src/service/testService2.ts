import { Observer } from "../util/Observer";
import { Autowired } from "../util/TSBeamContainer";

export class TestService2 {
  @Autowired(Observer)
  private static observer;

  @Autowired(Observer, "instance2")
  private static observer2;

  public static testMethod() {
    console.log("observer from testservice 2 : " + this.observer.count);
    console.log("observer2 from testservice 2 : " + this.observer2.count);
  }
}
