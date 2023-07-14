import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [topic, setTopic] = useState("html");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  useEffect(() => {
    if (searchButtonClicked) {
      fetchData();
    }
  }, [topic, searchTerm, searchButtonClicked]);

  function fetchData() {
    let apiUrl = "";

    if (searchTerm !== "") {
      apiUrl = "api/issues/search/?term=" + searchTerm;
    } else {
      apiUrl = "api/issues/topics/?label=" + topic;
    }

    try {
      if (apiUrl !== "") {
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => {
            setData(data.items);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function changeTopic(t: string) {
    setSearchTerm("");
    setTopic(t);
    fetchData();
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSearchClick() {
    setSearchButtonClicked(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const labelslang = ["HTML", "CSS", "JS", "PHP"];
  const labelsgit = [
    "bug",
    "documentation",
    "duplicate",
    "enhancement",
    "good first issue",
    "help wanted",
    "invalid",
    "question"
  ];

  function isDarkColor(color: string) {
    // Convert the color to RGB
    const hexColor = color.replace("#", "");
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    // Calculate the luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if luminance is less than 0.5 (considered dark)
    return luminance < 0.5;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 bg-gradient-to-t from-gray-800 to-gray-600">
      <h1 className="text-2xl">Github Issue Finder</h1>
      <a href="https://github.com/bashamega/github-issue-finder" className="m-5">
        <FaGithub size={50} />
      </a>
      <input
        placeholder="Search.."
        className="w-full md:w-2/3 text-lg rounded bg-slate-500 mb-4 md:mb-0 p-4"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button
        onClick={handleSearchClick}
        className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Search
      </button>
      <p className="mt-2">Label: {topic}</p>
      <div className="flex flex-wrap mt-3">
        {labelsgit.map((item) => {
          const isDark = isDarkColor(item);
          const textColor = isDark ? "text-white" : "text-gray-800";

          return (
            <a
              key={item}
              onClick={() => changeTopic(item)}
              className={`bg-gray-300 ${textColor} px-2 py-1 rounded mr-2 mb-2 cursor-pointer`}
              style={{ backgroundColor: `#${item}` }}
            >
              {item}
            </a>
          );
        })}
      </div>
      <div className="flex flex-wrap mt-3">
        {labelslang.map((item) => {
          const isDark = isDarkColor(item);
          const textColor = isDark ? "text-white" : "text-gray-800";

          return (
            <a
              key={item}
              onClick={() => changeTopic(item)}
              className={`bg-gray-300 ${textColor} px-2 py-1 rounded mr-2 mb-2 cursor-pointer`}
              style={{ backgroundColor: `#${item}` }}
            >
              {item}
            </a>
          );
        })}
      </div>
      <h1 className="mt-5 text-lg">Issues</h1>
      <div>
        {data && data.length > 0 ? (
          data.map((item: any, index: number) => (
            <div
              key={item.id}
              className="bg-slate-500 flex flex-col justify-center items-center rounded mb-5 pl-5"
            >
              <a
                href={item.html_url}
                className="text-white font-bold text-3xl hover:underline text-center"
              >
                {item.title}
              </a>
              <div className="flex flex-wrap mt-2 items-center">
                {item.labels && item.labels.length > 0 ? (
                  item.labels.map((label: any) => {
                    const isDark = isDarkColor(label.color);
                    const textColor = isDark ? "text-white" : "text-gray-800";

                    return (
                      <a
                        key={label.id}
                        onClick={() => changeTopic(label.name)}
                        className={`bg-gray-300 ${textColor} px-2 py-1 rounded mr-2 mb-2 cursor-pointer`}
                        style={{ backgroundColor: `#${label.color}` }}
                      >
                        {label.name}
                      </a>
                    );
                  })
                ) : (
                  <p>No labels</p>
                )}
              </div>
              <div className="flex items-center">
                <p>Created by:</p>
                <a
                  href={item.user.html_url}
                  className="flex items-center text-white ml-5"
                >
                  <img
                    src={item.user.avatar_url}
                    className="rounded-full w-6 h-6 mr-2"
                    alt="User Avatar"
                  />
                  <p className="text-white">{item.user.login}</p>
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </main>
  );
}
