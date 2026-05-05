export default function Form() {
    return (
        <form action="" className="flex py-4 justify-center w-full bg-gray-200 border-t-2">
            <input type="text" className="flex-1 border-none outline-none py-3 px-4 bg-white rounded-full max-w-[500px]"
            placeholder="Enter you message..."
            />
            <button type="submit" className="bg-[#151717] text-white px-4 mx-4 rounded-xl">Send</button>
        </form>
    );
}