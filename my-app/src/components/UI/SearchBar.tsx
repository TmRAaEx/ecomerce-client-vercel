import {FormEvent, useState} from "react";
import axios from "axios";
import SearchIcon from "../../assets/search.svg?react"


export default function SearchBar() {


    const [search, setSearch] = useState("");


    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
                params: {
                    q: search,
                    key: import.meta.env.VITE_GOOGLE_API_KEY,
                    cx: import.meta.env.VITE_SEARCH_ENGINE_ID,
                }
            });
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }


    // modified version of https://flowbite.com/docs/forms/search-input/#search-bar-example
    return <form className="max-w-3xl w-[50%] mx-auto my-auto" onSubmit={handleSearch}>
        <label htmlFor="default-search"
               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon/>
            </div>
            <input type="search" id="default-search"
                   className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Search..."
                   value={search}
                   onChange={e => setSearch(e.target.value)}
            />

            <button type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
            </button>
        </div>
    </form>
}