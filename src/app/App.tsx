import { ConfigProvider } from "antd";
import { AppRouter } from "./providers/router";

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
        <AppRouter />
      </ConfigProvider>
    </div>
  );
}

export default App;
