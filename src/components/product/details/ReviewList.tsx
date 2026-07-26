import ReviewCard from "./ReviewCard";

export default function ReviewList() {
  return (
    <div className="space-y-6">

      <ReviewCard
        name="Aarav Sharma"
        rating={5}
        review="Beautiful craftsmanship and premium finish. The artwork looks even better in person."
      />

      <ReviewCard
        name="Neha Verma"
        rating={4}
        review="Excellent packaging and timely delivery. Highly recommended."
      />

    </div>
  );
}