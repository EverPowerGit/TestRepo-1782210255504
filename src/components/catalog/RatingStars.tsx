export default function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const arr = [0,1,2,3,4];
  return (
    <div aria-label={`Rating ${rating} out of 5`} className="flex items-center gap-0.5 text-amber-500">
      {arr.map((i) => (
        <span key={i} aria-hidden="true">{i < full ? '★' : i === full && half ? '☆' : '☆'}</span>
      ))}
      <span className="sr-only">{rating} out of 5</span>
    </div>
  );
}
