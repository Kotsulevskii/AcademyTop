import './App.css'
import TodoList from './components/ToDo'
import Timer from './components/Timer'
import SearchList from './components/Search'
import DragAndDropList from './components/DragAndDrop'
import ColorGenerator from './components/ColorGen'
import ClickerGame from './components/ClickerGame'

function App() {

  return (
    <>
      <TodoList/>
      <Timer/>
      <SearchList/>
      <DragAndDropList/>
      <ColorGenerator/>
      <ClickerGame/>
    </>
  )
}

export default App
