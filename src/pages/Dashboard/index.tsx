import { useState } from "react";

import Header from "../../components/Header";
import { FoodCard } from "../../components/FoodCard";
import {ModalAddFood} from "../../components/ModalAddFood";
import {ModalEditFood} from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { useFood } from "../../hooks/useFood";

export const Dashboard = () => {
  const [isModalAddFoodOpen, setIsModalAddFoodOpen] = useState(false);
  const [isModalEditFoodOpen, setIsModalEditFoodOpen] = useState(false);
  const { foods, setFoodToEdit } = useFood();

  const toggleAddFoodModal = () => {
    setIsModalAddFoodOpen(!isModalAddFoodOpen);
  };

  const toggleEditFoodModal = () => {
    setIsModalEditFoodOpen(!isModalEditFoodOpen);
  };

  const handleEditFood = (food : any) => {
    setFoodToEdit({...food});
    setIsModalEditFoodOpen(true);
  };

  return (
    <>
      <Header openModal={toggleAddFoodModal} />
      <ModalAddFood
        isOpen={isModalAddFoodOpen}
        setIsOpen={toggleAddFoodModal}
        // handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={isModalEditFoodOpen}
        setIsOpen={toggleEditFoodModal}
        // editingFood={editingFood}
        // handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} handleEditFood = {handleEditFood}/>
        ))}
      </FoodsContainer>
    </>
  );
};
