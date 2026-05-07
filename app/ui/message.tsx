export default function Message({ message, sender, timeStamp }: { message: string, sender: 'me' | 'other' , timeStamp: string}) {
  return (
    <div
      className={`mx-4 my-2 p-4 w-fit max-w-[85%] rounded-lg ${sender === 'me' ? 'ml-auto bg-[#151717] text-white' : 'bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100'}`}
    >
      <div>{message}</div>
      <span className={`text-xs ${sender === 'me' ? 'float-right mr-4 text-gray-300' : 'text-gray-500 dark:text-gray-300'}`}>
        {new Date(timeStamp).toLocaleTimeString()}
      </span>
    </div>
  );
}