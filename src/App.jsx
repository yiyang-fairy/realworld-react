import "./index.css"
import { router } from "./router/index.jsx"
import { RouterProvider } from "react-router-dom"
import { UserProvider } from "./utils/user"

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
