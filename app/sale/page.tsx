import { partyProducts } from "../dashboard/data/party";
import { weddingProducts } from "../dashboard/data/wedding";



export default function SalePage() {
  const saleItems = [...partyProducts, ...weddingProducts].filter(
    (p) => parseInt(p.discount) >= 15
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Sale 🔥</h1>

        <p>Grab the best deals before they’re gone!</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))", gap: 20 }}>
          {saleItems.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.title} width="100%" />
              <h4>{item.title}</h4>
              <p>
                ₹{item.price} <s>₹{item.oldPrice}</s>
              </p>
              <strong>{item.discount}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
