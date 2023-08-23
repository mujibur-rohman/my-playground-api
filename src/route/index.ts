import { Application, Router } from "express";
import AuthRouter from "./auth.route";

const _routes: Array<[string, Router]> = [["/auth", AuthRouter]];

const router: (app: Application) => void = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};

export default router;
