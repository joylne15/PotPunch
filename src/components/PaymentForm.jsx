import React, { useState } from "react";

const PaymentForm = ({ members = [], target = 130000, onPayment = () => {} }) =>  {
  const [memberId, setMemberId] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState(null);

  const unpaidMembers = members.filter((m) => m.paid < target);

  function flash(type, text) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  }

  function handlePay() {
    if (!memberId) {
      flash("error", "Please select a member");
      return;
    }
    const amt = parseInt(amount);
    if (!amt || amt <= 0) {
      flash("error", "Please enter a valid amount");
      return;
    }
    const member = members.find((m) => m.id === parseInt(memberId));
    const remaining = target - member.paid;
    if (amt > remaining) {
      flash(
        "error",
        "Amount exceeds remaining balance of " + remaining.toLocaleString() + "/="
      );
      return;
    }
    onPayment(parseInt(memberId), amt);
    flash(
      "success",
      "✅ " + amt.toLocaleString() + "/= recorded for " + member.name
    );
    setMemberId("");
    setAmount("");
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-700 mb-4"> Record Payment</h2>

      <select
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white"
      >
        <option value="">-- Select member --</option>
        {unpaidMembers.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name} (owes {(target - m.paid).toLocaleString()}/=)
          </option>
        ))}
      </select>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handlePay()}
        placeholder="Amount e.g. 50000"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
      />

      <button
        onClick={handlePay}
        className="w-full text-white rounded-lg py-2 text-sm font-medium transition-colors duration-200"
        style={{ background: "#1D9E75" }}
        onMouseOver={(e) => (e.target.style.background = "#0F6E56")}
        onMouseOut={(e) => (e.target.style.background = "#1D9E75")}
      >
        Record Payment
      </button>

      {msg && (
        <p
          className={`text-xs mt-2 font-medium ${
            msg.type === "error" ? "text-red-500" : "text-green-600"
          }`}
        >
          {msg.text}
        </p>
      )}
    </div>
  );
}

export default PaymentForm;