import Message from "./message";

export default function Messages() {
  return (
    <div className="flex flex-1 flex-col h-20">
      <Message message="Message 2" sender="me"/>
      <Message message="Message 3" sender="other"/>
      <Message message="Message 4" sender="me"/>
      <Message message="Message 5" sender="other"/>
      <Message message="Message 6" sender="me"/>
      <Message message="Message 7" sender="other"/>
    </div>
  );
}