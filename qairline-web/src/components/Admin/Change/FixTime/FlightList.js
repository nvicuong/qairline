import React, { useState, useEffect } from "react";
import FlightItem from "./FlightItem";
import "./FlightList.scss";
import axios from "axios";
import API_BASE_URL from "../../../../config";

const FlightList = ({ flights, search }) => {
  const [visibleFlightId, setVisibleFlightId] = useState(null);
  const [flightData, setFlightData] = useState(flights);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = flightData.slice(indexOfFirstItem, indexOfLastItem);
  const subtractTimes = (time1, time2) => {
    const date1 = new Date(time1);
    const date2 = new Date(time2);

    const diffInMs = date1 - date2;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return hours * 60 + minutes;
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(flightData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleVisibility = (id) => {
    setVisibleFlightId((prevId) => (prevId === id ? null : id));
  };

  const handleTimeChange = (id, newTime) => {
    setFlightData((prevData) =>
      prevData.map((flight) => {
        if (flight === id) {
          const updatedDepartureTime = new Date(newTime);
          const newDate = new Date(
            updatedDepartureTime.getTime() + 7 * 60 * 60 * 1000
          );

          const durationInMinutes =
            subtractTimes(flight.arrival_time, flight.departure_time) || 0;

          const updatedArrivalTime = new Date(
            newDate.getTime() + durationInMinutes * 60000
          );
          console.log(
            "Updated Arrival Time:",
            newDate.toISOString().substring(0, 19)
          );
          return {
            ...flight,
            departure_time: newDate.toISOString().substring(0, 19),
            arrival_time: updatedArrivalTime.toISOString().substring(0, 19),
          };
        }
        return flight;
      })
    );
  };

  const changeTime = async (flight) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/flights/update/${flight.id}`,
        {
          departure_time: flight.departure_time,
          arrival_time: flight.arrival_time,
          status: "DELAY",
          reason: "Broken",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      toggleVisibility(null);
    }
  };
  useEffect(() => {
    const newFlightData = flights.filter((flight) => {
      return (
        flight.from.toLowerCase().includes(search.from.toLowerCase()) &&
        flight.to.toLowerCase().includes(search.to.toLowerCase())
      );
    });
    setFlightData(newFlightData);
  }, [search]);

  const deleteFlight = (flight) => async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/flights/delete/${flight.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.alert("Xóa chuyến bay thành công");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      const newFlightData = flightData.filter((f) => f.id !== flight.id);
      setFlightData(newFlightData);
    }
  };
  return (
    <div>
      {flights &&
        currentItems.map((flight, index) => (
          <div key={index}>
            <FlightItem flight={flight} toggleChange={toggleVisibility} />
            {visibleFlightId === flight.id && (
              <div className="overlay-custom">
                <div className="flight-info-modal">
                  <h2>Thông Tin Chuyến Bay</h2>
                  <p>
                    <strong>Mã Chuyến Bay:</strong> {flight.id}
                  </p>
                  <p>
                    <strong>Điểm Đi:</strong> {flight.from}
                  </p>
                  <p>
                    <strong>Điểm Đến:</strong> {flight.to}
                  </p>
                  <p>
                    <strong>Thời Gian Bay:</strong>
                    <input
                      type="datetime-local"
                      value={flight.departure_time}
                      onChange={(e) => handleTimeChange(flight, e.target.value)}
                    />
                  </p>

                  <button
                    className="delete-button"
                    onClick={deleteFlight(flight)}
                  >
                    Xóa chuyến bay
                  </button>
                  <button
                    className="closed-button"
                    onClick={() => changeTime(flight)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          className="purple-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        <span style={{ margin: "0 10px" }}>
          Trang {currentPage} / {Math.ceil(flightData.length / itemsPerPage)}
        </span>
        <button
          className="purple-button"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(flightData.length / itemsPerPage)}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default FlightList;
