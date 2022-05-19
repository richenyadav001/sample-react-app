import { useSelector } from "react-redux";

function Products() {
  const selectedData = useSelector((state) => state.dashboardData);
  const listItems = selectedData.map((item, index) => (
    <div
      className="card border-info mb-3"
      data-testid="card-container"
      key={index}
    >
      <img
        className="card-img-top"
        src={item.imagePath}
        aria-current="true"
        alt="Card image cap"
      />
      <div className="card-body text-info">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
      </div>
    </div>
  ));
  return <div className="card-deck">{listItems}</div>;
}

export default Products;
