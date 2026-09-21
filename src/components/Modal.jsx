/**
 * A generic modal shell. It doesn't know or care what's inside it -
 * whatever is passed as `children` gets rendered in the box.
 * This is what "reusable component" means in practice: Modal could
 * just as easily wrap a confirmation dialog or an edit form later.
 */
export default function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        // Stop the click from bubbling up to the overlay,
        // so clicking inside the modal doesn't close it.
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
