import React from "react";

interface TableData {
  name: string;
  cid: string;
  size: number;
  fileType: string;
  lastUpdate: string;
}

interface TableProps {
  data: TableData[];
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  return (
    <table className="mt-8 min-w-full">
      <thead>
        <tr className="text-black">
          <th className="py-2 px-4 bg-gray-200">Name</th>
          <th className="py-2 px-4 bg-gray-200">CID</th>
          <th className="py-2 px-4 bg-gray-200">Size</th>
          <th className="py-2 px-4 bg-gray-200">File Type</th>
          <th className="py-2 px-4 bg-gray-200">Last Update</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-gray-100" : " bg-gray-200"
            } text-black`}
          >
            <td className="py-2 px-4">{item.name}</td>
            <td className="py-2 px-4">{item.cid}</td>
            <td className="py-2 px-4">{item.size}</td>
            <td className="py-2 px-4">{item.fileType}</td>
            <td className="py-2 px-4">{item.lastUpdate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
