import "./pill.css";

type Props = {
  label: string;
};

export const Pill = ({ label }: Props) => <div className="pill"> {label} </div>;
