import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Search } from "lucide-react";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

export default function SearchDialog() {
  return (
    <Dialog>

      <DialogTrigger asChild>

        <button>
          <Search className="h-5 w-5 transition hover:text-[#C58A5C]" />
        </button>

      </DialogTrigger>

      <DialogContent className="max-w-3xl border-white/10 bg-[#111111] p-8">

        <SearchInput />

        <SearchResults />

      </DialogContent>

    </Dialog>
  );
}