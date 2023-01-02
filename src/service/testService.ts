import { Observer } from "../util/Observer";
import { Autowired } from "../util/TSBeamContainer";

export class TestService {
  @Autowired(Observer)
  private static observer: Observer;

  public static testMethod() {
    this.observer.addListener("test", (...messages) =>
      console.log(...messages)
    );
    console.log("observer from test service : " + this.observer);
  }
}
