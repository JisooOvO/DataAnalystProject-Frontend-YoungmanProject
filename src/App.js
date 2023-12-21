import WhiteBox from "./component/common/WhiteBox";
import "./index.css"

function App() {
  return (
    <div className="App flex gap-10 w-full h-full">
      <div className="text-xl w-[20%] h-[40%]">
        <WhiteBox title={"박민호"}/>
      </div>
      <div className="text-2xl font-bold w-[50%] h-[20%]">
        <WhiteBox title={"호호호"}/>
      </div>
    </div>
  );
}

export default App;
