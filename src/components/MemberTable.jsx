import React from "react";


const MemberTable = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contribution</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Joyce wildad</td>
            <td className="px-6 py-4 whitespace-nowrap">100000/=</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Paid
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">joyce david</td>
            <td className="px-6 py-4 whitespace-nowrap">00000/=</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                Unpaid
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">levina chifie </td>
            <td className="px-6 py-4 whitespace-nowrap">00000/=</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                Unpaid
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Edson lukiza </td>
            <td className="px-6 py-4 whitespace-nowrap">00000/=</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                Unpaid
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Ales msongole </td>
            <td className="px-6 py-4 whitespace-nowrap">00000/=</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                Unpaid
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;