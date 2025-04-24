import './App.css'
import TodoList from './components/ToDo'
import Timer from './components/Timer'
import SearchList from './components/Search'
import DragAndDropList from './components/DragAndDrop'
import ColorGenerator from './components/ColorGen'
import ClickerGame from './components/ClickerGame'
import UserHook from './components/UserHook'
import DynamicForm from './components/DinamicForm'
import SimpleFetch from './components/SimpleFetch'
import Posts from './components/FetchPost'
import NasaPhoto from './components/NasaPhoyo'

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
      <SimpleFetch/>
      <Posts/>
      <NasaPhoto/>
    </>
  )
}

export default App
