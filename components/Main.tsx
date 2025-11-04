import CountryCard from "./ui/CountryCard";

const Main = () => {
  return (
    <section className="dark:bg-blue-950 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-3 px-6 md:px-10 lg:px-20 w-full">
      <CountryCard />
    </section>
  );
};

export default Main;
