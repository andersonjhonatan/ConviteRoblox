import type { MetadataRoute } from "next";
import { invitationConfig as config } from "./invitation-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${config.site.url}/sitemap.xml`,
  };
}
