import { createContext, useState } from "react"
import { useAsyncEffect } from "ahooks"
import { getUser } from "../api/user"

export const UserContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  useAsyncEffect(async () => {
    if (localStorage.getItem("token")) {
      const res = await getUser()
      setUser(res.user)
    }
  }, [])

  const [user, setUser] = useState(null)
  return {
    user,
    setUser,
  }
}

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const { user, setUser } = useUser()
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
