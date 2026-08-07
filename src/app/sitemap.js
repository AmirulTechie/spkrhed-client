import { WORK_PROJECTS } from "@/data/work";
import { SITE_URL } from "@/lib/site-config";

const STATIC_ROUTES = ["", "/about", "/services", "/work", "/contact"];

export default function sitemap() {
  const lastModified = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
  }));

  const workEntries = WORK_PROJECTS.map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified,
  }));

  return [...staticEntries, ...workEntries];
}
