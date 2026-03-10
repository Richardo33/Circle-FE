interface ThreadContentProps {
  content: string;
  image?: string | null;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ThreadContent({ content, image }: ThreadContentProps) {
  console.log("CONTENT:", JSON.stringify(content));
  return (
    <div className="mt-2">
      <p style={{ whiteSpace: "pre-line" }}>{content}</p>
      {image && (
        <div className="mt-3">
          <img
            src={`${BASE_URL}${image}`}
            alt="Thread attachment"
            className="rounded-xl max-h-96 object-cover border border-gray-700"
          />
        </div>
      )}
    </div>
  );
}

export default ThreadContent;
