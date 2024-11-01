import "./Title.css";

function Title({ mainTitle, subTitle }) {
  return (
    <div className="section-title">
      <p className="title_subtitle">{subTitle}</p>
      <h2 className="title_main-title">{mainTitle}</h2>
    </div>
  );
}

export default Title;
