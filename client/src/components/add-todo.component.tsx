import React, { useState } from 'react';
import {Button, Group, Modal, Textarea, TextInput} from '@mantine/core'
import { useForm } from '@mantine/form';
import { BASEURL, ITodo } from '../App';
import { KeyedMutator } from 'swr';
import {fetcher} from '../App'

const AddTodo = ({mutate}:{mutate: KeyedMutator<ITodo[]>}) => {
  const [open, setOpen] = useState(false)
  const form = useForm({
    initialValues: {
      title: '',
      body: ''
    }
  })
  const handleClose = () => setOpen(false)
  const createTodo = async (values: {title: string, body: string}) => {
    const created = await fetch(`${BASEURL}/api/todos`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    })
    if (!created.ok){
      console.log(created.body)
    }
    mutate(fetcher('api/todos'))
    form.reset()
    setOpen(false)
  }
  return (
    <>
    <Modal
    opened={open}
    onClose={handleClose}
    title="Create todo"
    >
      <form onSubmit={form.onSubmit(createTodo)}>
        <TextInput
        required
        mb={12}
        placeholder="What do you want to do?"
        label="Todo"
        {...form.getInputProps('title')}
        />
        <Textarea
        required
        mb={12}
        placeholder="tell me more ..."
        label="Body"
        {...form.getInputProps('body')}
         />
        <Button type='submit'>Create Todo</Button>
      </form>
    </Modal>
    <Group position='center'>
      <Button
      fullWidth mb={12} onClick={() => setOpen(true)} px={20} py={5}
      >Add Todo</Button>
    </Group>
    </>
  )
}

export default AddTodo