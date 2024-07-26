import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  console.log("Events Page");
  console.log(allEvents);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <br />
          <div className={`${styles.section}`}>
            {allEvents && allEvents.length === 0 && (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No Events Found!
              </h1>
            )}
            {allEvents && allEvents.length !== 0 && (
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px]">
                {allEvents &&
                  allEvents.map((i, index) => (
                    <EventCard active={true} data={i} />
                  ))}
              </div>
            )}
          </div>

          {/* <EventCard active={true} data={allEvents && allEvents[0]} /> */}
        </div>
      )}
    </>
  );
};

export default EventsPage;
