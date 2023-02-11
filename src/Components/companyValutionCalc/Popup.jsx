import "../../Styles/toMany/Popup.sass";

const Popup = ({ content, setShowPopup }) => {
  return (
    <div className="popup">
      <p className="popup__content">{content}</p>
      <div
        className="popup__close"
        onClick={() => {
          setShowPopup(false);
          document.body.classList.remove('blur')
        }}
      >
        WYŁĄCZ
      </div>
    </div>
  );
};
export default Popup;
