import React from "react";
//import { useSelector } from "react-redux";
//import { RootState } from "./app/store";
import ImageUploader from "./components/ImageUploader";
import HistoryTable from "./components/HistoryTable";

const App: React.FC = () => {
  //const images = useSelector((state: RootState) => state.image.images);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Waste Sorting</h1>
        <ImageUploader />
        <HistoryTable />
      </header>
    </div>
  );
};

export default App;

/*
import React from "react";
import DragAndDrop from "./components/DragAndDrop";
//import Loader from "./components/Loader";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DragAndDrop className="p-16 mt-10 border border-neutral-200" />
      </header>
    </div>
  );
}

export default App;
*/
