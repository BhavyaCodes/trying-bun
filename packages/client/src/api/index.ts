import {
  SlashNumberApiType,
  SlashAllApiType,
} from "@fibonacci-calculator/server";
import { hc } from "hono/client";

export const slashNumberApi = hc<SlashNumberApiType>("/api");
export const slashAllApi = hc<SlashAllApiType>("/api");
