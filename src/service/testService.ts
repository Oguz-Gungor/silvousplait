import { Observer } from "../util/Observer";
import { Autowired } from "../util/TSBeamContainer";

export class TestService {
  @Autowired(Observer)
  private static observer;

  public static testMethod() {
    console.log("observer from test service : " + this.observer.count);
    this.observer.addCounter();
  }
}
