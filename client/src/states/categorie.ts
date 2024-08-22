import { create } from "zustand";

interface CategoryStore {
  selectedCategory: string | null;
  setSelectedCategorie: (cat: string | null) => void;
}

const useCategorie = create<CategoryStore>((set) => ({
  selectedCategory: "all",
  setSelectedCategorie: (cate) => set({ selectedCategory: cate }),
}));

export default useCategorie;
