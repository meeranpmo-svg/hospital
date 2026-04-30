export default function TokenDisplay({ token, status, size = 'md' }) {
  const colors = {
    waiting:     'bg-amber-100   text-amber-800   border-amber-200',
    in_progress: 'bg-blue-100    text-blue-800    border-blue-200',
    done:        'bg-emerald-100 text-emerald-800 border-emerald-200',
  };
  const sizes = {
    sm: 'text-sm px-2.5 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-2xl px-5 py-3',
  };
  return (
    <span className={`inline-flex items-center font-mono font-bold rounded-lg border ${colors[status] || colors.waiting} ${sizes[size]}`}>
      {token}
    </span>
  );
}
