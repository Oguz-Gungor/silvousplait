import { Observer } from "../util/Observer";
import { Autowired, TSBeamContainer } from "../util/TSBeamContainer";

export class TestService2 {
  @Autowired(Observer)
  private static observer: Observer;

  @Autowired(Observer, "instance2")
  private static observer2: Observer;

  public static testMethod() {
    this.observer.notify(
      { action: "test" },
      "message1",
      "message2",
      "message3",
      "message4"
    );
    this.observer2.notify(
      { action: "test" },
      "message1",
      "message2",
      "message3",
      "message4"
    );
  }
}
