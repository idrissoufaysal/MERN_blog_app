import { create } from "zustand";
import Axios from "../utils/fecth";

interface FavorieItem {
  userId: number | undefined;
  postId: number;
}

interface FavorieStore {
  favorie: FavorieItem[];
  loading: boolean;
  status: boolean;
  error: string | null | Error;
  addOrRemoveFavorite: (
    item: FavorieItem,
    currentUser: string | undefined
  ) => Promise<void>;
  fetchFavorites: (currentUser: string | undefined) => Promise<void>;
}

const useFavoriteStore = create<FavorieStore>((set) => ({
  favorie: [],
  loading: false,
  error: null,
  status: false,

  fetchFavorites: async (currentUser) => {
    set({ loading: true, error: null });
    try {
      const response = await Axios.get("/favorie", {
        headers: {
          Authorization: "Bearer " + currentUser,
        },
      });
      set({ favorie: response.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false, error: "Erreur lors du chargement des favoris." });
    }
  },

  addOrRemoveFavorite: async (item, currentUser) => {
    set({ loading: true, error: null });
    try {
      // Faites votre appel API pour ajouter un favori
    const response=  await Axios.post("/favorie", item, {
        headers: {
          Authorization: "Bearer " + currentUser,
        },
      });

      if(response.data.status===false){
        set((state) => ({
          favorie: state.favorie.filter(ite => ite.postId !==item.postId),
          loading: false,
          status:false
        }));
      }
      else {
        // Le favori a été ajouté
        set((state) => ({
          favorie: [...state.favorie,item],
          loading: false,
          status:true
        }));
      }

     // set((state) => ({ favorie: [...state.favorie, item], loading: false }));
    } catch (error) {
      if (error) {
        set({ loading: false, error: "une erreur s'est produite  " });
      } else {
        set({ loading: false, error: "Une erreur s'est produite." });
      }
    }
  },
}));

export default useFavoriteStore;
