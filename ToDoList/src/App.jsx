import './App.css'
import TodoList from './components/ToDo'
import Timer from './components/Timer'
import SearchList from './components/Serarch'
import DragAndDropList from './components/DragAndDrop'

function App() {

  return (
    <>
      <TodoList/>
      <Timer/>
      <SearchList/>
      <DragAndDropList/>
    </>
  )
}

export default App
