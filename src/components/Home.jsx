import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors Box";

export default function Home({
  search,
  setSearch,
  name,
  setName,
  number,
  setNumber,
}) {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSearch("");
    setName("");
    setNumber("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (name.length == 0) {
      setErrors((prev) => [...prev, "Name is required."]);
      return;
    }
    if (number.length == 0) {
      setErrors((prev) => [...prev, "Number is required."]);
      return;
    }

    navigate("/map");
  };
  return (
    <section className="">
      <h2 className="bg-primary w-full p-5 text-center font-mono text-3xl text-white uppercase shadow-[0_10px_10px_rgba(4,71,30,0.4)] sm:text-4xl">
        Ottermap Frontend Task
      </h2>
      <div className="container mx-auto mt-14 flex flex-col items-center gap-10">
        <div className="border-primary flex flex-col justify-center gap-5 rounded-2xl border-2 p-5 shadow-lg shadow-[#04471e88]">
          {errors.length != 0 && <Errors errors={errors} />}

          <div className="flex items-center justify-between gap-3">
            <label htmlFor="search" className="cursor-pointer font-medium">
              Search :
            </label>
            <input
              type="text"
              id="search"
              className="border-primary rounded-lg border-2 px-2 py-1"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="name" className="cursor-pointer font-medium">
              First Name : <span className="font-bold text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="border-primary rounded-lg border-2 px-2 py-1"
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="number" className="cursor-pointer font-medium">
              Number : <span className="font-bold text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="number"
              className="border-primary rounded-lg border-2 px-2 py-1"
              placeholder="Number"
              pattern="[0-9]{10}"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <button
            className="bg-primary hover:text-primary border-primary cursor-pointer rounded-xl border-2 px-5 py-2 font-mono text-xl font-bold text-white transition-all duration-300 ease-in-out hover:bg-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}