import banner from "../assets/banner1.jpeg";
import banner2 from "../assets/banner2.jpeg";
import { useMobile } from "../hooks/useMobile";
const Home = () => {
  const [isMobile] = useMobile();
  return (
    <section className={"container section"}>
      <div className="flex flex-col px-6">
        {
          <img
            src={isMobile ? banner2 : banner}
            alt="banner"
            className="object-cover card md:h-[50vh] h-[30vh] mt-10 h"
          />
        }
      </div>
    </section>
  );
};

export default Home;
