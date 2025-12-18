export const eFinalidade = {
  Despesa: 1,
  Receita: 2,
  Ambos: 3,
} as const;

export type eFinalidade = (typeof eFinalidade)[keyof typeof eFinalidade];
export const eFinalidadeDescricao: Record<eFinalidade, string> = {
  [eFinalidade.Despesa]: "Despesa",
  [eFinalidade.Receita]: "Receita",
  [eFinalidade.Ambos]: "Ambos",
};
