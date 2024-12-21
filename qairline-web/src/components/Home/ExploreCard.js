import "./ExploreCard.scss";
const ExploreCard = ({ title, link, position, onSearch }) => {
  return (
    <div className="explore_card" onClick={() => onSearch(title)}>
      <article className="card">
        <img
          className="card__background"
          src={link}
          alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
        />
        <h2 className={position + " card__title"}>{title}</h2>
      </article>
    </div>
  );
};
export default ExploreCard;
