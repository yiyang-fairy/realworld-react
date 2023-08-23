import "./index.css"
import { useState } from "react"
import { router } from "./router/index.jsx"
import { RouterProvider } from "react-router-dom"
import { getUser } from "./api/user"
import { UserContext } from "./utils/user"
import { useAsyncEffect } from "ahooks"

function App() {
  const [user, setUser] = useState(null)
  useAsyncEffect(async () => {
    if (localStorage.getItem("token")) {
      const res = await getUser()
      setUser(res.user)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}

export default App
