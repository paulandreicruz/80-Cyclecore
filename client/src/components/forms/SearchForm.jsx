import axios from "axios";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";

export default function Search() {
  //hooks

  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values.keyword}`);

      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-max md:block">
      <input
        type="search"
        name="search"
        id="search"
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        value={values.keyword}
        className="relative peer z-10 bg-transparent w-6 rounded-lg border cursor-pointer outline-none focus:w-52 border-[#FFA500] focus:border-[#FFA500] focus:cursor-text focus:pl-10 uppercase focus:pr-4 pl-8 duration-500 p-1"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke=""
        className="h-5 w-5 absolute left-2.5 inset-y-0 my-auto stroke-[#FFA500] border-r border-transparent peer-focus:border-[#FFA500] peer-focus:stroke-[#FFA500]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </form>
  );
}
