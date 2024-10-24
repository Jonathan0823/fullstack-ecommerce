import NavBar from "@/app/components/NavBar"

const page = ({params}: { params: { key: string } }) => {
  return (
    <div>
      <NavBar />
      <h1>Showing result of {params.key}</h1>
    </div>
  )
}

export default page