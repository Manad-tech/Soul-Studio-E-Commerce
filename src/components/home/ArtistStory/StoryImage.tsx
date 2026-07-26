export default function StoryImage() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      <img
        src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=900&fit=crop"
        alt="Dr. Sheetal Chaudhary - Soul Studio"
        className="h-[520px] w-full object-cover transition duration-700 hover:scale-105"
      />
    </div>
  );
}