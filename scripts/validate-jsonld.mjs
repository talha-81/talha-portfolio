import { readFileSync } from "node:fs";

const index = JSON.parse(readFileSync(new URL("./schema-org-index.json", import.meta.url), "utf8"));
const dataTypes = new Set(index.dataTypes);
const banned = new Set([
  "email",
  "telephone",
  "alumniOf",
  "addressLocality",
  "addressRegion",
  "streetAddress",
  "postalCode",
]);

function ancestors(type, seen = new Set()) {
  if (seen.has(type)) return seen;
  if (!index.types[type]) throw new Error(`Unknown schema.org type: ${type}`);
  seen.add(type);
  for (const parent of index.types[type].parents) ancestors(parent, seen);
  return seen;
}

function allowedProps(type) {
  const props = new Set(["@type", "@id"]);
  for (const name of ancestors(type)) {
    for (const prop of index.types[name].props) props.add(prop);
  }
  return props;
}

function valueAllowed(prop, value) {
  const range = index.ranges[prop];
  if (!range) return false;
  if (Array.isArray(value)) return value.every((item) => valueAllowed(prop, item));
  if (typeof value === "string") {
    if (range.some((item) => ["Text", "URL", "Date", "DateTime", "Time"].includes(item))) return true;
    return /^https?:\/\//.test(value) && range.some((item) => !dataTypes.has(item));
  }
  if (typeof value === "number") return range.some((item) => ["Integer", "Number", "Float", "Text"].includes(item));
  if (typeof value === "boolean") return range.includes("Boolean");
  if (value && typeof value === "object") {
    if (value["@id"] && !value["@type"]) return range.some((item) => !dataTypes.has(item));
    const types = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]];
    return types.some((type) => {
      if (!type || !index.types[type]) return false;
      const family = ancestors(type);
      return range.some((item) => family.has(item));
    });
  }
  return false;
}

function checkNode(node, path) {
  const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
  if (!types[0]) throw new Error(`${path} is missing @type`);
  const props = new Set();
  for (const type of types) {
    for (const prop of allowedProps(type)) props.add(prop);
  }
  for (const [key, value] of Object.entries(node)) {
    if (banned.has(key)) throw new Error(`${path}.${key} is not allowed on this site`);
    if (!props.has(key)) throw new Error(`${path}.${key} is not a schema.org property of ${types.join(", ")}`);
    if (key === "@type" || key === "@id") continue;
    if (!valueAllowed(key, value)) throw new Error(`${path}.${key} has a value outside the schema.org range`);
    const children = Array.isArray(value) ? value : [value];
    for (const [index, child] of children.entries()) {
      if (child && typeof child === "object" && child["@type"]) {
        checkNode(child, `${path}.${key}[${index}]`);
      }
    }
  }
}

export function validateJsonLd(data, label = "json-ld") {
  JSON.parse(JSON.stringify(data));
  if (data["@context"] !== "https://schema.org") throw new Error(`${label}: @context must be https://schema.org`);
  if (!Array.isArray(data["@graph"]) || data["@graph"].length === 0) throw new Error(`${label}: @graph is empty`);
  data["@graph"].forEach((node, index) => checkNode(node, `${label}.@graph[${index}]`));

  const person = data["@graph"].find((node) => node["@type"] === "Person");
  const website = data["@graph"].find((node) => node["@type"] === "WebSite");
  const service = data["@graph"].find((node) => node["@type"] === "ProfessionalService");
  if (!person || !website || !service) throw new Error(`${label}: Person, WebSite, and ProfessionalService are required`);
  if (person["@id"] !== "https://talha-ai.netlify.app/#person") throw new Error(`${label}: Person @id`);
  if (website["@id"] !== "https://talha-ai.netlify.app/#website") throw new Error(`${label}: WebSite @id`);
  if (website.publisher?.["@id"] !== person["@id"] || website.about?.["@id"] !== person["@id"]) {
    throw new Error(`${label}: WebSite publisher and about must point at the Person`);
  }
  if (service.founder?.["@id"] !== person["@id"]) throw new Error(`${label}: ProfessionalService must reference the Person`);
  if (JSON.stringify(person.jobTitle) !== JSON.stringify(["Software Engineer", "Agentic AI Engineer"])) {
    throw new Error(`${label}: jobTitle`);
  }
  if (person.worksFor?.name !== "Nayel Solutions" || person.worksFor?.url !== "https://www.nayelsolutions.com/") {
    throw new Error(`${label}: worksFor`);
  }
  if (person.address?.addressCountry !== "PK" || person.address?.["@type"] !== "PostalAddress") {
    throw new Error(`${label}: address`);
  }
  const serialized = JSON.stringify(data);
  if (!serialized.includes("Nayel Solutions")) throw new Error(`${label}: worksFor name missing`);
  if ((serialized.match(/Nayel/g) ?? []).length !== 1) throw new Error(`${label}: Nayel must appear only as the employer name`);
}
