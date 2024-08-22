import { create } from "zustand";

interface CategoryStore {
  selectedCategory: string;
  setSelectedCategorie: (cat: string) => void;
}

const useCategorie = create<CategoryStore>((set) => ({
  selectedCategory: "all",
  setSelectedCategorie: (cate) => set({ selectedCategory: cate }),
}));

export default useCategorie;
