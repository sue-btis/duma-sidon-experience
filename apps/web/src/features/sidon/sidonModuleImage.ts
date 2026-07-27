export type SidonModuleContext = "retail" | "industrial";

export function getSidonModuleImage(module: string, context: SidonModuleContext) {
  return `/home/worlds/sidon/modulos-imagenes/${module}-${context}.png`;
}
