import express, { Router } from "express";

const router = express.Router();

export function WS(path: string) {
  return (constructor) => {
    Object.entries(constructor.prototype.wsPaths).forEach(
      ([methodPath, struct]: any[]) => {
        //todo : switch-case statement for all request types
        const completePath = `${path}${methodPath}`;
        if (struct.type == "GET") {
          router.get(completePath, (req, res) => {
            res.send(struct.descriptor.value());
          });
        } else if (struct.type === "POST") {
          router.post(completePath, (req, res) => {
            res.send(struct.descriptor.value());
          });
        }
      }
    );
  };
}

export function Path(path: string, type: string) {
  return (target, propertyKey, descriptor) => {
    if (target.wsPaths == null) {
      target.wsPaths = {};
    }
    target.wsPaths[path] = { type, descriptor };
  };
}

//TODO : use enums
export function GET(path: string) {
  return Path(path, "GET");
}
export function POST(path: string) {
  return Path(path, "POST");
}
export function DELETE(path: string) {
  return Path(path, "DELETE");
}
export function PUT(path: string) {
  return Path(path, "PUT");
}

@WS("/test")
export class TestWebService {
  @GET("/test")
  public test() {
    return "test";
  }
  @POST("/test2")
  public test2() {
    return "test2";
  }
}

export default router;
