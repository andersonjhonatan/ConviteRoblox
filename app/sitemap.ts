import type { MetadataRoute } from "next";
import { invitationConfig as config } from "./invitation-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: config.site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${config.site.url}/privacidade`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
