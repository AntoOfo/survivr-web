import Header from "./components/Header"
import Grid from "./components/Grid"
import { useState } from "react"

export default function App() {
  // hold current search
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
    <Header 
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery} />
    <Grid 
      searchQuery={searchQuery}/>
    </>
  )
}
