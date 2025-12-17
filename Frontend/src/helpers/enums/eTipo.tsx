export const eTipo = {
  Despesa: 1,
  Receita: 2,
} as const;

export type eTipo = (typeof eTipo)[keyof typeof eTipo];

export const eTipoDescricao: Record<eTipo, string> = {
  [eTipo.Despesa]: "Despesa",
  [eTipo.Receita]: "Receita",
};
