const instagram = require("../assets/img/instagram.png");
const github = require("../assets/img/github.png");
type Props = {};

const ReferenceComponent = (props: Props) => {
  return (
    <div className="bar reference-bar p-3  flex flex-col ">
      <div className="flex-grow">
        <h1 className="title mt-3 text-white font-thin text-center">
          Chess by tyoma
        </h1>{" "}
      </div>
      <div className="mt-5 flex justify-center">
        <a
          href="https://www.instagram.com/zakharov_artem_"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagram} alt="instagram" className="icon mr-5" />
        </a>
        <a
          href="https://github.com/ZAKHAROV-Artem"
          target="_blank"
          rel="noreferrer"
        >
          <img src={github} alt="instagram" className="icon" />
        </a>
      </div>
    </div>
  );
};

export default ReferenceComponent;
