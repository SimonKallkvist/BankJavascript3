import BackButton from "../components/BackButton/BackButton.jsx";
import { useTheme } from "../utils/ThemeContext.jsx"; // Import the useTheme hook

const Settings = () => {
  const { setTheme } = useTheme(); // Access the theme and setTheme function from context

  return (
    <div className="settingsContainer">
      <BackButton />
      <h1>Settings</h1>
      <div className="settings">
        <button className="settingsBtn" onClick={() => setTheme("light")}>
          Light
        </button>
        <button className="settingsBtn" onClick={() => setTheme("dark")}>
          Dark
        </button>
        <button className="settingsBtn" onClick={() => setTheme("funky")}>
          Funky
        </button>
      </div>
    </div>
  );
};

export default Settings;
