import React from "react";
import PaymentForm from "../PaymentForm";

export default function Payments({ members, target, onPayment }) {
  const allPayments = members.flatMap((m) =>
    m.payments.map((p) => ({
      ...p,
      memberName: m.name,
      memberId: m.id,
    }))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Payments</h1>
        <p className="text-sm text-gray-400 mt-0.5">Record and view all payment transactions</p>
      </div>

      <div className="max-w-md">
        <PaymentForm members={members} target={target} onPayment={onPayment} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">All Transactions</h2>
          <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
            {allPayments.length} transactions
          </span>
        </div>

        {allPayments.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">-</div>
            <p className="text-gray-400 text-sm">No payments recorded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Member</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {allPayments.map((p, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: "#1D9E75" }}
                        >
                          {p.memberName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">{p.memberName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "#1D9E75" }}>
                      {Number(p.amount).toLocaleString()}/=
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {allPayments.length > 0 && (
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-400">Total transactions: <strong>{allPayments.length}</strong></span>
            <span className="text-xs font-semibold" style={{ color: "#1D9E75" }}>
              Total: {allPayments.reduce((s, p) => s + Number(p.amount), 0).toLocaleString()}/=
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
