type TitleProps = {
  title: string;
};

export const Title = ({ title }: TitleProps) => {
  return <h1 className="title">{title}</h1>;
};
