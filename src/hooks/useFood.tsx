import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import api from "../services/api";
import { Food } from "../types/Food";
import { toast } from "react-toastify";
interface FoodProviderProps {
  children: ReactNode;
}

interface FoodContextData {
  foods: Food[];
  foodToEdit: Food;
  createFood: (food: Food) => void;
  updateFood: (food: Food) => void;
  deleteFood: (id: string) => void;
  setFoodToEdit: (food: Food) => void;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export function FoodProvider({ children }: FoodProviderProps): JSX.Element {
  const [foods, setFoods] = useState<Food[]>([]);
  const [foodToEdit, setFoodToEdit] = useState<Food>({} as Food);
  useEffect(() => {
    async function loadFoods() {
      const foods = await api.get("/foods").then((response) => response.data);
      setFoods(foods);
    }
    loadFoods();
  }, []);
  async function createFood(food: Food) {
    const foodsUpdated = [...foods];
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });
      foodsUpdated.push(response.data);
      toast.success("Prato adicionado com sucesso")
      setFoods(foodsUpdated);
    } catch (err) {
      toast.error("Erro ao adicionar Prato")
    }
  }
  async function updateFood(food: Food) {
    let foodsUpdated = [...foods];
    try {
      const foodUpdated = await api.put(`/foods/${foodToEdit.id}`, {
        ...foodToEdit,
        ...food,
      });
      foodsUpdated = foodsUpdated.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );
      toast.success("Prato atualizado com sucesso");
      setFoods(foodsUpdated);
    } catch (err) {
      toast.error("Erro ao atualizar Prato")
    }
  }
  async function deleteFood(id: string) {
    try {
      const foodsUpdated = [...foods];
      const foodIndex = foodsUpdated.findIndex((food) => food.id === id);
      if (foodIndex !== -1) {
        await api.delete(`/foods/${id}`);
        foodsUpdated.splice(foodIndex, 1);
        setFoods(foodsUpdated);
        toast.success("Prato removido com sucesso");
        return;
      }
      throw Error()
    } catch {
      toast.error("Erro ao remover Prato")
    }
  }
  return (
    <FoodContext.Provider
      value={{
        foods,
        createFood,
        deleteFood,
        foodToEdit,
        updateFood,
        setFoodToEdit,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export const useFood = () => {
  const context = useContext(FoodContext);
  return context;
};
