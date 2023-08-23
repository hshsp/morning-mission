import { rest } from "msw";
import { login } from "./data/login";
import { allPlans, mine, mineHistory, otherPlans } from "./data/plan";

export const handlers = [
  rest.post("/user/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(login));
  }),
  rest.post("/plan", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/plan/today/allUser", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(allPlans));
  }),
  rest.get("/plan/today/others", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(otherPlans));
  }),
  rest.get("/plan/today/mine", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mine));
  }),
  rest.get("/plan/history/mine", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mineHistory));
  }),
  rest.patch("/plan/today/mine", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete("/plan/:planId", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.patch("/user/pw", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
