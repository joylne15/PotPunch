import React from 'react';
// Note: You can install 'lucide-react' for professional icons
// npm install lucide-react

const MemberTable = ({ members }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Reg No.</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Full Name</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Total Goal</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Paid</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Remaining</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-4 text-sm font-medium text-gray-600">
                  #{member.regNo}
                </td>
                <td className="p-4 text-sm font-bold text-gray-800">
                  {member.name}
                </td>
                <td className="p-4 text-sm text-gray-600 font-mono">
                  {member.total.toLocaleString()}
                </td>
                <td className="p-4 text-sm">
                  <span className="text-green-600 font-semibold">
                    {member.paid.toLocaleString()}
                  </span>
                </td>
                <td className="p-4 text-sm">
                  <span className={`font-semibold ${member.total - member.paid > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                    {(member.total - member.paid).toLocaleString()}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center space-x-2">
                    {/* History Button */}
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg title='History'">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Ref-Icon-Clock-History-Logic" />
                        <circle cx="12" cy="12" r="9" strokeWidth="2"/><path d="M12 7v5l3 3" strokeWidth="2"/>
                      </svg>
                    </button>

                    {/* Edit Button */}
                    <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    {/* Delete Button */}
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberTable;