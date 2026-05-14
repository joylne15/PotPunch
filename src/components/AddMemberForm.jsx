import React, { useState } from "react";

const AddMemberForm = ({ onAdd = () => ({ error: "No add handler provided" }) }) => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState(null);

  function flash(type, text) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  }

  function handleAdd() {
    if (!name.trim()) {
      flash("error", "Please enter a name");
      return;
    }
    const result = onAdd(name.trim());
    if (result.error) {
      flash("error", result.error);
    } else {
      flash("success", "✅ " + name.trim() + " added successfully!");
      setName("");
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">➕ Add Member</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="Full name e.g. Joyce Wildad"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
      />

      <button
        onClick={handleAdd}
        className="w-full text-white rounded-lg py-2 text-sm font-medium transition-colors duration-200"
        style={{ background: "#1D9E75" }}
        onMouseOver={(e) => (e.target.style.background = "#0F6E56")}
        onMouseOut={(e) => (e.target.style.background = "#1D9E75")}
      >
        Add Member
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
export default AddMemberForm;