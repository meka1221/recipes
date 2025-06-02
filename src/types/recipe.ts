export type Recipe = {
  id: number;
  title: string;
  image: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  // Добавьте другие поля по необходимости
};
