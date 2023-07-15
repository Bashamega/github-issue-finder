import React from 'react';

export default function Home() {
  return (
    <main className="bg-gradient-to-t from-gray-800 to-gray-600 min-h-screen">
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

      <section className="flex  flex-col items-center p-6 md:p-24">
        <h1 className="text-2xl text-center">Github Issue Finder <br />About</h1>
        </section>
        <section className=' ml-20'>
        <p className="mb-4">GitHub Issue Finder is a web application that allows you to search for GitHub issues based on different
          topics or search terms. It provides a convenient way to explore and discover issues across various programming
          languages and issue labels.</p>

        <h2 className="text-xl font-bold mb-2">Features</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Search for GitHub issues using specific topics or search terms.</li>
          <li>Filter issues based on programming language or issue labels.</li>
          <li>View issue details including title, labels, creator, and more.</li>
          <li>Directly navigate to the issue on GitHub for further engagement.</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">Technologies Used</h2>
        <ul className="list-disc ml-6">
          <li>React: A JavaScript library for building user interfaces.</li>
          <li>GitHub REST API: Used to fetch GitHub issue data.</li>
          <li>Tailwind CSS: A utility-first CSS framework for styling the application.</li>
          <li>React Icons: A library for including popular icons in React applications.</li>
        </ul>
      </section>
    </main>
  );
}
