import { toast } from 'react-hot-toast'
import { supabase } from '../data/supabase'

interface BoardData {
  name: string
  users: {
    name: string | null
    img: string | null
    id: string
  }[]
  cover_img: string
  cover_blurhash: string
  isPrivate: boolean
}

export type ListData =
  | {
      name: string
      board_id: number
    }
  | {
      task_name: string
      list_id: number
      users: { name?: string; img: string; id: string }[]
    }

const addBoard = async function (boardData: BoardData) {
  const { data, error } = await supabase
    .from('Boards')
    .insert([boardData])
    .select()

  if (error) toast.error(error.message)
  return data
}

const getBoards = async function () {
  const { data: Boards, error } = await supabase.from('Boards').select('*')
  if (error) toast.error(error.message)
  return Boards
}

const getUser = async function (id: string) {
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', id)
  if (error) toast.error('Error getting user')
  return users
}

const addList = async function (listData: ListData) {
  const { error } = await supabase.from('BoardList').insert([listData]).select()
  if (error) toast.error(error.message)
  if (!error) toast.success('Saved successfully')
}
const addTask = async function (taskData: ListData) {
  const { error } = await supabase.from('Tasks').insert([taskData]).select()
  if (error) toast.error(error.message)
  if (!error) toast.success('Saved successfully')
}

const getLists = function (boardId: number) {
  return async function () {
    const { data: boardList, error } = await supabase
      .from('BoardList')
      .select('*')
      .eq('board_id', boardId)
    if (error) toast.error(error.message)
    return boardList
  }
}

const getBoard = function (boardId: number) {
  return async function () {
    const { data, error } = await supabase
      .from('Boards')
      .select('*')
      .eq('id', boardId)
    if (error) toast.error('Could not fetch board data')
    return data
  }
}

const getListTasks = function (listId: number) {
  return async function () {
    const { data, error } = await supabase
      .from('Tasks')
      .select('*')
      .eq('list_id', listId)
    if (error) toast.error(error.message)
    return data
  }
}

export {
  addBoard,
  getBoards,
  getUser,
  addList,
  getLists,
  getBoard,
  addTask,
  getListTasks,
}
