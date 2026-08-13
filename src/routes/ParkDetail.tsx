import { useParams } from "react-router-dom";

export function ParkDetail() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <section>
      <h2>ParkDetail</h2>
      <p>slug: {slug}</p>
    </section>
  );
}
