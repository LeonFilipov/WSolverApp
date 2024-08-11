import "./PopupCard.css";

type PopupCardProps = {
  onClose: () => void;
  title: string;
  content: string;
};

const PopupCard = ({ onClose, title, content }: PopupCardProps) => {
  return (
    <div className="popup-card-overlay" onClick={onClose}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PopupCard;