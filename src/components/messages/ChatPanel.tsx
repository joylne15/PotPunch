const THREAD_MESSAGES = [
  { side: "left", text: "Hi! I had a question about my last transaction." },
  { side: "right", text: "Hi, how can I help you?" },
  { side: "left", text: "Is this possible to refund?" },
  { side: "right", text: "Yes, we can assist after verification." },
] as const;

export function ChatPanel() {
  return (
    <section className="border-r border-slate-200 p-6 lg:col-span-5">
      <header className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-slate-200" />
          <div>
            <h4 className="font-bold text-slate-900">Ajoy Sarkar</h4>
            <p className="text-sm text-emerald-500">Online</p>
          </div>
        </div>
        <button className="h-10 w-10 rounded-full bg-slate-100 text-lg">?</button>
      </header>

      <div className="space-y-4">
        {THREAD_MESSAGES.map((message, index) => (
          <div
            key={`${message.side}-${index}`}
            className={`max-w-[70%] p-3 text-sm ${
              message.side === "right"
                ? "ml-auto rounded-l-lg rounded-br-lg bg-emerald-500 text-white"
                : "rounded-r-lg rounded-bl-lg bg-slate-100 text-slate-800"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <input
          className="h-12 flex-1 rounded-lg border border-slate-200 px-4 text-sm placeholder:text-slate-500"
          placeholder="Write a message..."
        />
        <button className="rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white">
          Send
        </button>
      </div>
    </section>
  );
}
