type Props = {
  value: number;
  trackClassName?: string;
  fillClassName?: string;
};

export default function GoalProgressBar({
  value,
  trackClassName = "bg-muted-foreground/20",
  fillClassName = "bg-primary",
}: Props) {
  return (
    <div className={`w-full h-2 relative rounded-full ${trackClassName}`}>
      <div
        className={`absolute h-2 rounded-full ${fillClassName} transition-all duration-300`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
