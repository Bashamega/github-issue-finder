import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const [contributors, setContributors] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/bashamega/github-issue-finder/contributors"
      );
      const data = await response.json();
      setContributors(data);
    } catch (error) {
      console.error("Error fetching contributors:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="bg-gradient-to-t from-gray-800 to-gray-600">
      <nav className="flex justify-between items-center bg-gray-700 p-4 text-white">
        <div className="logo">
          <a
            href="https://github-issue-finder.vercel.app/"
            className="font-bold  text-lg hover:underline"
          >
            Github Issues Finder
          </a>
        </div>
        <a href="https://github-issue-finder.vercel.app/contributors" className="ml-4 hover:underline">
          Contributors
        </a>
        <a href="https://github.com/Bashamega/github-issue-finder" className="ml-4 hover:underline">
          Contribute
        </a>
        <a href="https://github-issue-finder.vercel.app/about" className="ml-4 hover:underline">
          About
        </a>
      </nav>

      <section className="flex min-h-screen flex-col items-center p-6 md:p-24 ">
        <h1 className="text-2xl text-center">Github Issue Finder <br />Contributors</h1>
        <p>Here is a comprehensive list of our fantastic contributors:</p>
        <div className="flex justify-center">
            <div className="flex gap-5 justify-center">
                {contributors && contributors.length > 0 ? (
                contributors.map((item: any, index: number) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4 flex flex-col items-center">
                    <a
                        href={item.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-white hover:underline mb-2"
                    >
                        <img
                        src={item.avatar_url}
                        alt={item.login}
                        className="w-12 h-12 mr-2 rounded-full"
                        />
                        {item.login}
                    </a>
                    <a
                        href={`https://github.com/${item.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:underline"
                    >
                        @{item.login}
                    </a>
                    </div>
                ))
                ) : (
                <p className="text-white">No data available</p>
                )}
            </div>
        </div>


        
      </section>
    </main>
  );
}
