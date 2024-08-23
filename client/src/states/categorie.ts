import { create } from "zustand";

interface CategoryStore {
  selectedCategory: string | null;
  setSelectedCategorie: (cat: string | null) => void;
}

const useCategorie = create<CategoryStore>((set) => ({
  selectedCategory: null,
  setSelectedCategorie: (cate) => set({ selectedCategory: cate }),
}));

export default useCategorie;
