"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Alert-Dialog";
import { ArrowLeft } from "@/components/ui/Icons";
import PosterGrid from "@/components/ui/PosterGrid";
import { deleteAllListContent, deleteList, getListContent } from "@/lib/lists";
import { useListContentStore } from "@/store/listContentStore";
import { useListsStore } from "@/store/listsStore";
import { useUserStore } from "@/store/userStore";

export default function ListPage() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const { username } = useUserStore((state) => ({
    username: state.username,
  }));
  const { activeList, removeList } = useListsStore((state) => ({
    activeList: state.activeList,
    removeList: state.removeList,
  }));
  const { listContent, setListContent } = useListContentStore((state) => ({
    listContent: state.listContent,
    setListContent: state.setListContent,
  }));

  useEffect(() => {
    (async () => {
      if (activeList) {
        const results = await getListContent(activeList.id);
        results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setListContent(results);
      }
    })();
  }, [activeList, setListContent]);

  useEffect(() => {
    if (isEditing && listContent.length === 0) {
      setIsEditing(false);
    }
  }, [isEditing, listContent]);

  function handleEditClick() {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }

  async function handleClick() {
    if (activeList) {
      await deleteAllListContent(activeList.id);
      await deleteList(activeList.id);
      removeList(activeList.id);
      router.replace(`/${username}/lists`);
    }
  }

  return (
    <div className="mb-36 md:mb-20">
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center transition-colors duration-150 ease-in-out hover:text-zinc-50"
      >
        <ArrowLeft fill="#e4e4e7" classes="w-[18px] h-[18px] mr-2" /> Back to
        lists
      </button>

      <div className="animate-fade-in rounded bg-gray-850/35 px-3 py-4 ring-2 ring-neutral-800">
        <div className="mb-5 flex items-center justify-between">
          <h3>List by {username}</h3>
          <button className="px-3 py-2" onClick={handleEditClick}>
            {isEditing ? "Done" : "Edit"}
          </button>
        </div>
        {listContent && (
          <div className="animate-fade-in">
            <PosterGrid
              media={listContent}
              tooltipEnabled={false}
              mode={isEditing ? "edit" : undefined}
            />
          </div>
        )}
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="float-right mt-4 rounded px-4 py-2 font-medium tracking-wide outline-none ring-1 ring-red-500 transition-colors duration-150 ease-in hover:bg-red-500 hover:text-gray-850 active:bg-red-600">
            Delete list
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-200">
              Delete this list?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              list and its content from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="!border-neutral-800 !bg-neutral-900 hover:!bg-neutral-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="!bg-rose-600 active:!bg-rose-700"
              onClick={handleClick}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
