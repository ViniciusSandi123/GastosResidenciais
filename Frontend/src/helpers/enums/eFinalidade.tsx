export const eFinalidade = {
  Despesa: 1,
  Receita: 2,
  Ambos: 3,
} as const;

export type eFinalidade = (typeof eFinalidade)[keyof typeof eFinalidade];
