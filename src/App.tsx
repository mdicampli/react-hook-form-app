import NextUIForm from "./components/NextUIForm"

export interface IUser {
  firstName: string
  lastName: string
  email?: string
}

function App() {

  return (
    <div className="flex justify-center items-center min-h-screen">
      <NextUIForm />
    </div>
  )
}

export default App
