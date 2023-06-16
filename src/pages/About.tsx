import React from "react";
import ListTable from "../components/dashboard/ListTable";

const exampleData = [
  {
    name: "File 1",
    cid: "CID-123",
    size: 1024,
    fileType: "PDF",
    lastUpdate: "2023-06-15",
  },
  {
    name: "File 2",
    cid: "CID-456",
    size: 2048,
    fileType: "DOCX",
    lastUpdate: "2023-06-16",
  },
  {
    name: "File 3",
    cid: "CID-789",
    size: 512,
    fileType: "PNG",
    lastUpdate: "2023-06-17",
  },
];

function About() {
  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptates, quod, quia, voluptate quae voluptatem quibusdam quos
        accusantium quas dolorum quidem. Quisquam, quae. Quisquam, quae.
        Quisquam,
      </p>

      <ListTable data={exampleData} />
    </div>
  );
}

export default About;
