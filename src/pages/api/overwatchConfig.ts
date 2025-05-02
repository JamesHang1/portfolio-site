// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Config } from "@/src/globals/types";
import overwatchConfig from "./json/overwatch-config.json";
import marvelRivalsConfig from "./json/marvel-rivals-config.json";
import apexLegendsConfig from "./json/apex-legends-config.json";
import valorantConfig from "./json/valorant-config.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Config>
) {
  const referer = new URL(req.headers.referer || "");
  const configId = referer.searchParams.get("config");
  console.log({ configId });

  let config: Config = overwatchConfig;
  if (configId === "marvelrivals") {
    config = marvelRivalsConfig;
  } else if (configId === "apexlegends") {
    config = apexLegendsConfig;
  } else if (configId === "valorant") {
    config = valorantConfig;
  }

  setTimeout(() => res.status(200).json(config), 500);
}
