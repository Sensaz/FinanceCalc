import "../../Styles/Popup.sass";

const Popup = ({ content, setShowPopup }) => {
  return (
    <div className="popup" >
      <p>{content}</p>
      <div
        onClick={() => {
          setShowPopup(false);
        }}
      >
        X WYŁĄCZ
      </div>
    </div>
  );
};
export default Popup;
