import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { useFood } from '../../hooks/useFood';
import { Food } from '../../types/Food';

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: ()=> void;
}
export const ModalEditFood = ({isOpen, setIsOpen} : ModalEditFoodProps) => {
  const formRef = useRef(null);
  const { foodToEdit, updateFood } = useFood();
  async function handleSubmit(data : Food){
    updateFood(data);
    setIsOpen();
  };

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={foodToEdit}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui"/>

          <Input name="name" placeholder="Ex: Moda Italiana"/>
          <Input name="price" placeholder="Ex: 19.90"/>

          <Input name="description" placeholder="Descrição"/>

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};

