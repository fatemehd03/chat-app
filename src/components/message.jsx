const Message = ({ message }) => {
  if (message.type === "text") {
    return (
      <div className="bg-green-200 p-3 m-2 rounded-xl whitespace-pre-wrap break-words">
        {message.content}
      </div>
    );
  }

  if (message.type === "file") {
    // اگر عکس بود
    if (message.file.type.startsWith("image/")) {
      return (
        <div className="p-2 m-2 rounded-xl bg-blue-100">
          <img src={message.url} className="max-w-[200px] rounded-lg" />
        </div>
      );
    }

    // فایل‌های دیگر (PDF, ZIP, ...)
    return (
      <div className="p-3 m-2 bg-gray-200 rounded-xl">
        <a
          href={message.url}
          download={message.file.name}
          className="text-blue-600 underline"
        >
          دانلود {message.file.name}
        </a>
      </div>
    );
  }

  return null;
};

export default Message;
