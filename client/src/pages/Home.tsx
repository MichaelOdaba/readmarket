import banner from "../assets/banner1.jpeg";
const Home = () => {
  return (
    <section className={"container section"}>
      <div className="flex flex-col px-6">
        {
          <img
            src={banner}
            alt="banner"
            className="object-cover card h-72 mt-10 h"
          />
        }
      </div>
    </section>
  );
};

export default Home;
