import { getTime } from "../lib/extractTimestamp"

export default function Message({ message, sender, timeStamp }: { message: string, sender: 'me' | 'other', timeStamp: string }) {
  
  return (
    <div
      className={`mx-4 my-2 p-4 w-fit max-w-[85%] rounded-lg ${sender === 'me' ? 'ml-auto bg-accent text-white' : 'bg-surface text-text-primary'}`}
    >
      <div>{message}</div>
      <span className={`text-xs ${sender === 'me' ? 'float-right mr-4 text-white/70' : 'text-text-secondary'}`}>
        {getTime(timeStamp)}
      </span>
    </div>
  );
}