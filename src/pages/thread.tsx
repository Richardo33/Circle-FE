import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { ImageUp } from "lucide-react";
import Sidebar from "@/components/sidebar";
import SidebarCompact from "@/components/sidebarCompact";
import SidebarRight from "@/components/sidebarRight";
import ThreadCard from "@/components/thread/threadCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CreatePostDialog from "@/components/createPostDialog";
import { useThreads } from "@/hooks/useThreads";
import { useState } from "react";

function Thread() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useSelector((state: RootState) => state.auth.user);
  const { threads, loading } = useThreads();
  const [open, setOpen] = useState(false);

  const handleReply = (id: string) => {
    console.log("Reply to thread:", id);
  };

  return (
    <div className="scroll-lock min-h-full text-white grid grid-cols-12 gap-4 px-4 sm:px-6">
      <div className="hidden lg:block col-span-3">
        <Sidebar onOpenPost={() => setOpen(true)} />
      </div>
      <div className="hidden md:block lg:hidden col-span-2">
        <SidebarCompact />
      </div>

      <main className="col-span-12 md:col-span-10 lg:col-span-6 space-y-4 py-4">
        <div className="px-5 pb-3 pt-2.5">
          <h1 className="text-3xl font-bold">Home</h1>
        </div>

        <div
          className="flex items-start gap-3 border-b border-gray-700 pb-3 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Textarea
            placeholder="What is happening?!"
            className="flex-1 bg-transparent resize-none outline-none ring-0 focus:ring-0 text-white placeholder-gray-400 p-2 focus-visible:ring-0 border-none"
            rows={2}
            readOnly
          />
          <div className="flex items-center gap-2 h-fit">
            <Button variant="secondary" size="icon">
              <ImageUp className="w-8 h-8 text-green-400" />
            </Button>
            <Button className="px-5 bg-green-600 rounded-2xl font-semibold hover:bg-green-500">
              Post
            </Button>
          </div>
        </div>

        {loading && <p className="text-gray-400">Loading...</p>}

        <div className="space-y-4">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} onReply={handleReply} />
          ))}

          {!loading && threads.length === 0 && (
            <p className="text-gray-400 text-center mt-4">
              Belum ada postingan.
            </p>
          )}
        </div>
      </main>

      <div className="hidden lg:block col-span-3">
        <SidebarRight />
      </div>

      <CreatePostDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}

export default Thread;
