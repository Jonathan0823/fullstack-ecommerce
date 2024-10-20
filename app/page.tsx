import CategoryFilter from "./components/CategoryFilter";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="w-max flex-col mx-auto">
      <NavBar />
      <CategoryFilter />
    </div>
  );
}
