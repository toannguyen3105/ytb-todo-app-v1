import { format } from "date-fns/esm";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../slices/todoSlice";
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Deleted successfully");
  };

  const handleEdit = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <CheckButton />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "complete" && styles["todoText--complete"],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), "p, MM/dd/yyyy")}
            </p>
          </div>
          <div className={styles.todoActions}>
            <div
              className={styles.icon}
              onClick={handleEdit}
              onKeyDown={handleEdit}
              role="button"
              tabIndex={0}
            >
              <MdEdit />
            </div>
            <div
              className={styles.icon}
              onClick={handleDelete}
              onKeyDown={handleDelete}
              role="button"
              tabIndex={0}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={todo}
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
};

export default TodoItem;
