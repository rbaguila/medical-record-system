const Field = ({name, children}) =>
  <form>
    <input
      id={name}
      type="text"
      placeholder = {children}
      />
  </form>