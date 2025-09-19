interface ThreadContentProps {
  content: string;
  image?: string | null;
}

const BASE_URL = "http://localhost:3000";

function ThreadContent({ content, image }: ThreadContentProps) {
  return (
    <div className="mt-2">
      <p>{content}</p>
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
