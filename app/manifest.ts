import type { MetadataRoute } from "next";
import { invitationConfig as config } from "./invitation-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: config.site.title,
    short_name: "Convite Roblox",
    description: config.site.description,
    start_url: "/",
    display: "standalone",
    background_color: config.site.themeColor,
    theme_color: config.site.themeColor,
    lang: "pt-BR",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
