import {Box, Container, Flex, List, ThemeIcon} from '@mantine/core'
import { ListItem } from '@mantine/core/lib/List/ListItem/ListItem'
import { CheckCircleFillIcon, TrashIcon } from '@primer/octicons-react'
import useSWR from 'swr'
import AddTodo from './components/add-todo.component'
import TodoCard from './components/todo-card.componen'
export const BASEURL = "http://localhost:5001"
export interface ITodo {
  id: number,
  title: string,
  body: string,
  done: boolean
}
export const fetcher = (url: string): Promise<ITodo[]> => fetch(`${BASEURL}/${url}`).then(r => r.json())
function App() {
  const {data, mutate} = useSWR<ITodo[]>('api/todos', fetcher)
  const markTodoAdDone= async (id: number) => {
    const doned = await fetch(`${BASEURL}/api/todos/${id}/done`, {method: "PATCH"})
    if (!doned.ok) {
      console.log(doned.statusText)
    }
    mutate(fetcher('api/todos'))
  }
  const deleteTodo = async (id:number) => {
    const deleted= await fetch(`${BASEURL}/api/todos/${id}`, {method: "DELETE"})
    if (!deleted.ok){
      console.log(deleted.statusText)
    }
    mutate(fetcher('api/todos'))
  }
  return (
    <Box
    sx={(theme) => ({
       padding: "2rem",
        width: "100%",
        maxWidth: "40rem",
        margin: "0 auto",
    })}
    >
    <List spacing='xs' size='sm' mb={12} center>
      {data?.map((todo: ITodo) =>{
        return (
          <Flex justify='space-between' key={`todo_list__${todo.id}`}>
            <TodoCard 
              todo={todo}
              markTodoAdDone={markTodoAdDone}
              deleteTodo={deleteTodo}
            />
          </Flex>
        )
      })}
    </List>
    <AddTodo mutate={mutate} />
    </Box>
  )
}

export default App
