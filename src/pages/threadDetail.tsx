import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useThread } from "@/hooks/useThread";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

import Sidebar from "@/components/sidebar";
import SidebarCompact from "@/components/sidebarCompact";
import SidebarRight from "@/components/sidebarRight";

import ThreadDetailCard from "@/components/thread/threadDetailCard";
import ReplyForm from "@/components/thread/replyForm";
import ReplyList from "@/components/thread/replyList";

function ThreadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { thread, loading, posting, handleReply } = useThread(id);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="scroll-lock min-h-screen text-white grid grid-cols-12 gap-4 px-4 sm:px-6">
      <div className="hidden lg:block col-span-3">
        <Sidebar onOpenPost={() => {}} />
      </div>
      <div className="hidden md:block lg:hidden col-span-2">
        <SidebarCompact />
      </div>

      <main className="col-span-12 md:col-span-10 lg:col-span-6 space-y-4 py-4">
        <div className="px-5 pb-3 pt-2.5 flex items-center gap-3">
          <button
            onClick={() => navigate("/thread")}
            className="hover:text-gray-300 cursor-pointer"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold">Status</h1>
        </div>

        {loading && <p className="text-gray-400">Loading</p>}
        {!loading && !thread && (
          <p className="text-red-500">Thread tidak ditemukan</p>
        )}

        {thread && (
          <>
            <ThreadDetailCard thread={thread} />

            {user && (
              <ReplyForm
                onSubmit={(text, file) => handleReply(text, file)}
                posting={posting}
              />
            )}

            <ReplyList replies={thread.replies} />
          </>
        )}
      </main>

      <div className="hidden lg:block col-span-3">
        <SidebarRight />
      </div>
    </div>
  );
}

export default ThreadDetail;
