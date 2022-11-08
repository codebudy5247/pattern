import styles from "../../styles/CreatePattern.module.css";

const SavedBackground = () => {
  return (
    <div className="max-w-initial rounded overflow-hidden shadow-lg p-2 mt-2">
            <div className="font-bold text-sm mb-2 mb-2text-left">Saved Backgrounds</div>
            <div className={
                styles.center
            }>
                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 flex items-center gap-2">
                    0 Backgrounds
                </button>
            </div>
        </div>
  )
}

export default SavedBackground