import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface Props {
  images: string[];
  selected: number;

  open: boolean;

  onClose: () => void;

  onPrevious: () => void;

  onNext: () => void;
}

export default function ProductLightbox({
  images,
  selected,
  open,
  onClose,
  onPrevious,
  onNext,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95">

      {/* Close */}

      <button
        onClick={onClose}
        className="absolute right-8 top-8 rounded-full bg-white/10 p-3 transition hover:bg-[#C58A5C] hover:text-black"
      >
        <X />
      </button>

      {/* Previous */}

      <button
        onClick={onPrevious}
        className="absolute left-8 rounded-full bg-white/10 p-4 transition hover:bg-[#C58A5C] hover:text-black"
      >
        <ChevronLeft />
      </button>

      {/* Image */}

      <img
        src={images[selected]}
        className="max-h-[88vh] max-w-[90vw] rounded-3xl object-contain"
      />

      {/* Next */}

      <button
        onClick={onNext}
        className="absolute right-8 rounded-full bg-white/10 p-4 transition hover:bg-[#C58A5C] hover:text-black"
      >
        <ChevronRight />
      </button>

    </div>
  );
}