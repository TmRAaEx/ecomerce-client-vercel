import {FormEvent, useState, useRef, ChangeEvent} from "react";
import axios from "axios";
import SearchIcon from "../../assets/search.svg?react";

export default function SearchBar() {
    type SearchResult = {
        title: string;
        link: string;
        displayLink: string;
        formattedUrl: string;
        htmlFormattedUrl: string;
        htmlSnippet: string;
        htmlTitle: string;
        kind: string;
        snippet: string;
        pagemap?: {
            cse_thumbnail?: { src: string; width: string; height: string }[];
            metatags?: Record<string, string>[];
            cse_image?: { src: string }[];
        };
    };

    const [search, setSearch] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);


    const searchFunc = async (searchTerm: string = search) => {
        const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
            params: {
                q: searchTerm,
                key: import.meta.env.VITE_GOOGLE_API_KEY,
                cx: import.meta.env.VITE_SEARCH_ENGINE_ID,
                num: 10,
            },

        });
        const data = response.data;
        console.log(data)
        setResults(data.items || []);


    }

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await searchFunc();
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;

        setSearch(value);


        if (value.length < 1) {
            setResults([]);
        }

        if (value.length >= 3) {
            await searchFunc(value);
        }
    }

    return (
        <div
            className="w-full flex flex-col items-center gap-6 py-1 relative z-50"
            ref={containerRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
                setTimeout(() => {
                    if (!containerRef.current?.contains(document.activeElement)) {
                        setIsFocused(false);
                    }
                }, 100);
            }}
            tabIndex={-1}
        >
            <form
                onSubmit={handleSearch}
                className="search flex bg-white h-14 w-[80%] rounded-xl items-center px-4 shadow-md gap-4"
            >
                <SearchIcon/>
                <input
                    type="search"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="flex-1 text-md bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Search
                </button>
            </form>

            {results.length > 0 && isFocused && (
                <ul className="absolute top-[65px] w-[80%] bg-white rounded-xl shadow-lg divide-y divide-gray-200 max-h-96 overflow-y-auto z-40">
                    {results.map((result, idx) => {
                        const image = result.pagemap?.cse_image?.[0]?.src;

                        return (
                            <li key={idx} className="p-4 hover:bg-gray-50 transition flex gap-4 items-start">
                                {image && (
                                    <img
                                        src={image}
                                        alt={result.title}
                                        className="w-16 h-16 object-scale-down rounded-md flex-shrink-0"
                                    />
                                )}
                                <div>
                                    <a
                                        href={result.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-700 font-semibold hover:underline"
                                    >
                                        {result.title}
                                    </a>
                                    <p className="text-sm text-gray-500">{result.displayLink}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>

            )}
        </div>
    );
}
