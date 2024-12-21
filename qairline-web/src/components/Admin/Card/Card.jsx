import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";


const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: '#910A67',
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        {/* <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        /> */}
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>{param.value}</span>
        <span></span> {/* Cập nhật chuỗi này */}
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  // Tạo danh sách 7 ngày trước ngày hiện tại
  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i); // Lấy ngày trước đó
      dates.push(date.toISOString().split("T")[0]); // Chỉ lấy phần ngày (YYYY-MM-DD)
    }
    return dates;
  };

  const categories = getLast7Days();

  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yyyy", // Hiển thị ngày tháng
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: categories, // Sử dụng danh sách ngày động
      },
    },
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: '#f2f3fa',
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "black" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={data.options} series={param.series} type="area" />
      </div>
      <span></span>
    </motion.div>
  );
}

export default Card;
