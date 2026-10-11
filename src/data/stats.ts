import { projects } from "./projects.ts";

/**
 * Figures shown on the site.
 * `projectsDelivered` follows the projects actually rendered.
 * `satisfiedClients` stays null until a real number is provided. The UI hides it.
 */
export const stats = {
  yearsExperience: "5+",
  projectsDelivered: projects.length,
  satisfiedClients: null as number | null,
};
