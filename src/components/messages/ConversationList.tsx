const CONVERSATIONS = [
  { name: "Emilia Sam", preview: "Sent image", time: "16:14" },
  { name: "Eleanor Pena", preview: "Typing...", time: "16:10" },
  { name: "Cody Fisher", preview: "Voice message", time: "15:44" },
  { name: "Marjorie", preview: "Good luck", time: "15:11" },
  { name: "Esther", preview: "Missed call", time: "12:24" },
];

export function ConversationList() {
  return (
    <aside className="border-r border-slate-200 p-5 lg:col-span-4">
      <h3 className="mb-5 text-2xl font-semibold text-slate-900">Messages (22)</h3>
      <input
        className="mb-4 h-12 w-full rounded-lg bg-slate-100 px-4 text-sm placeholder:text-slate-500"
        placeholder="Search Message"
      />
      <div className="space-y-2">
        {CONVERSATIONS.map((conversation) => (
          <div
            key={`${conversation.name}-${conversation.time}`}
            className="flex items-center justify-between rounded-lg p-3 transition hover:bg-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                {conversation.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="font-bold text-slate-900">{conversation.name}</p>
                <p className="text-sm text-slate-500">{conversation.preview}</p>
              </div>
            </div>
            <span className="text-sm text-slate-500">{conversation.time}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
