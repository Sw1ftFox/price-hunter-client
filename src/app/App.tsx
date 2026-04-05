import { ConfigProvider } from "antd";
import { AppRouter } from "./providers/router";
import { App as AppProvider } from "antd";

function App() {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FFD700",
          },
        }}
      >
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
