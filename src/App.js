import "./App.css";
import ChangePasswordForm from "./components/ChangePasswordForm.jsx";
import ChangePasswordHeader from "./components/ChangePasswordHeader.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChangePasswordHeader />
        <ChangePasswordForm />
      </header>
    </div>
  );
}

export default App;
