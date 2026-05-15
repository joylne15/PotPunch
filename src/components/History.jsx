import React from "react";

const History = ({ member, target, onClose }) => {
  if (!member) return null;

  const payments = member.payments || [];
  const totalPaid = member.paid || 0;
  const remaining = target - totalPaid;
  const progress = Math.min((totalPaid / target) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
            <p className="text-sm text-gray-500">Payment History</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 uppercase">Total Paid</p>
                <p className="text-lg font-bold text-green-700">
                  {totalPaid.toLocaleString()}/=
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Remaining</p>
                <p className="text-lg font-bold text-amber-600">
                  {remaining.toLocaleString()}/=
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Progress</p>
                <p className="text-lg font-bold text-gray-800">{progress}%</p>
              </div>
            </div>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Payment List */}
          {payments.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No payments recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {payment.amount.toLocaleString()}/=
                    </p>
                    <p className="text-xs text-gray-500">{payment.date}</p>
                  </div>
                  <span className="text-green-600 text-sm font-semibold">✓</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;