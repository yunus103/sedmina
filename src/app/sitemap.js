import servicesData from "../data/services";
import projectsData from "../data/projects.json";
import blogData from "../data/blog.json";

export default function sitemap() {
  const baseUrl = "https://sedmina.com";

  // Static pages
  const routes = [
    "",
    "/hakkimizda",
    "/hizmetler",
    "/calismalar",
    "/blog",
    "/iletisim",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic pages
  const services = servicesData.services.map((service) => ({
    url: `${baseUrl}/hizmetler/${service.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const projects = projectsData.projects.map((project) => ({
    url: `${baseUrl}/calismalar/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const posts = blogData.posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...routes, ...services, ...projects, ...posts];
}
