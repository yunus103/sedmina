// Reusable objects
import seo from "./objects/seo";
import processStep from "./objects/processStep";
import stat from "./objects/stat";
import value from "./objects/value";
import timelineItem from "./objects/timelineItem";
import projectResult from "./objects/projectResult";

// Singletons
import siteSettings from "./singletons/siteSettings";
import homePage from "./singletons/homePage";
import aboutPage from "./singletons/aboutPage";
import contactPage from "./singletons/contactPage";

// Documents
import service from "./documents/service";
import subService from "./documents/subService";
import project from "./documents/project";
import blogPost from "./documents/blogPost";
import blogKategorisi from "./documents/category";
import reference from "./documents/reference";

// Singleton type names — used for desk structure
export const singletonTypes = [
  "siteAyarlari",
  "anaSayfa",
  "hakkimizdaSayfasi",
  "iletisimSayfasi",
];

export const schemaTypes = [
  // Objects (must come first as they are referenced by others)
  seo,
  processStep,
  stat,
  value,
  timelineItem,
  projectResult,

  // Singletons
  siteSettings,
  homePage,
  aboutPage,
  contactPage,

  // Documents
  service,
  subService,
  project,
  blogPost,
  blogKategorisi,
  reference,
];
