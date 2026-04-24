export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-base uppercase transition-opacity hover:opacity-80 md:px-8 md:py-4 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
