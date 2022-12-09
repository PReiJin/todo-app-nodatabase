import React, { useState } from 'react';
import { Modal,} from '@mantine/core'
import {  ITodo } from '../App';
interface IProps {
    todo:ITodo;
    isOpen:boolean;
    handleClose:()=>void;
}
const TodoInfo= ({todo, isOpen, handleClose}:IProps) => {
  return (
    <>
    <Modal
    opened={isOpen}
    onClose={handleClose}
    title={todo.title}
    >
        <p>{todo.body}</p>
    </Modal>
    </>
  )
}

export default TodoInfo