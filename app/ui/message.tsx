export default function Message({ message, sender }: { message: string, sender: 'me' | 'other' }) {
  return (
    <div
      className={`mx-4 my-2 p-4 w-fit max-w-[85%] rounded-lg ${sender === 'me' ? 'ml-auto bg-[#151717] text-white' : 'bg-white'}`}
    >
      <div>{message}</div>
      <span className={`text-xs ${sender === 'me' ? 'float-right mr-4 text-gray-300' : 'text-gray-500'}`}>10:00 AM</span>
    </div>
  );
}