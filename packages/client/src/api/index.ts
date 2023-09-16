import { SlashNumberApiType } from "@fibonacci-calculator/server";
import { hc } from "hono/client";

export const slashNumberApi = hc<SlashNumberApiType>("/api");
