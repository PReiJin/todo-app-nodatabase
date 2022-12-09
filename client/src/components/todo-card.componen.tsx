import { List, ThemeIcon } from "@mantine/core"
import { CheckCircleFillIcon, TrashIcon } from "@primer/octicons-react"
import { useState } from "react";
import { ITodo } from "../App"
import TodoInfo from "./todo-info.component";

interface IProps {
    todo: ITodo;
    markTodoAdDone: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoCard = ({ todo, markTodoAdDone, deleteTodo }: IProps) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    return (
        <div onClick={() => setOpen(true)}
            style={{
                display: 'flex', 
                justifyContent: 'space-between',
                width: '100%', height: '30px',
                alignContent: 'center', marginBlock: '5px'
            }}
        >
            <div
                onClick={() => { markTodoAdDone(todo.id); setOpen(true) }}
                style={{width: '24', height: '100%'}}>
                {
                    todo.done ? (
                        <ThemeIcon color="teal" size={24} radius="xl">
                            <CheckCircleFillIcon size={20} />
                        </ThemeIcon>
                    ) : (
                        <ThemeIcon color="gray" size={24} radius="xl">
                            <CheckCircleFillIcon size={20} />
                        </ThemeIcon>
                    )
                }
            </div>
            <div
            style={{width: '80%'}}
            >
            {todo.title}
            </div>
            <div onClick={() => deleteTodo(todo.id)}>
                <TrashIcon size={20} />
            </div>
            <TodoInfo todo={todo} isOpen={open} handleClose={handleClose} />
        </div>
    )
}
export default TodoCard