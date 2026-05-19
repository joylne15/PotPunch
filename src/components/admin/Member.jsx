import React from "react";
import AddMemberForm from "../AddMemberForm";
import MemberTable from "../MemberTable";
import History from "../History";

export default function Members({
  members, target, onAdd, onDelete,
  onViewHistory, showHistory,
  selectedMember, onCloseHistory,
}) {
  return (
    <div className="space-y-6">

      {/* Page title */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Members</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage all members and their contributions
        </p>
      </div>

      {/* Add member form */}
      <div className="max-w-md">
        <AddMemberForm onAdd={onAdd} />
      </div>

      {/* Members table */}
      <MemberTable
        members={members}
        target={target}
        onDelete={onDelete}
        onViewHistory={onViewHistory}
      />

      {/* History modal */}
      {showHistory && selectedMember && (
        <History
          member={members.find((m) => m.id === selectedMember.id)}
          target={target}
          onClose={onCloseHistory}
        />
      )}

    </div>
  );
}