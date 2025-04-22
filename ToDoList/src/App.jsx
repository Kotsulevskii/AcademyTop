import './App.css'
import TodoList from './components/ToDo'
import Timer from './components/Timer'
import SearchList from './components/Search'
import DragAndDropList from './components/DragAndDrop'
import ColorGenerator from './components/ColorGen'
import ClickerGame from './components/ClickerGame'
import UserHook from './components/UserHook'
import DynamicForm from './components/DinamicForm'

function App() {

  return (
    <>
      <TodoList/>
      <Timer/>
      <SearchList/>
      <DragAndDropList/>
      <ColorGenerator/>
      <ClickerGame/>
      <UserHook/>
      <DynamicForm/>
    </>
  )
}

export default App
