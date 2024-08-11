import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";

import './HomePage.css';

const responsive = {
  0: { items: 1 },
};

const Content: React.FC = () => {
  const history = useNavigate();
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState<any>([]); 

  useEffect(() => {
    const fetchCollections = async () => {
      const response = await axios.get("/api/collections");
      setCollections(response.data);
    };

    const fetchCarouseuls = async () => {
      const response = await axios.get("/api/carousels");
      const newItems = response.data.map((carousel: any, index: any) => {
        return (
          <div className="item" data-value={index + 1} key={index}>
            <img
              src={carousel.src}
              height={carousel.height}
              loading={carousel.loading}
              sizes={carousel.sizes}
              alt={`Carousel ${index}`}
              width={800}
            />
          </div>
        );
      });
      setItems(newItems);
    };

    fetchCollections();
    fetchCarouseuls();
  }, []);
  return (
    <div className="content">
      <div id="auto-carousel" className="carousel">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
          autoPlay
          autoPlayControls
          autoPlayStrategy="none"
          autoPlayInterval={1000}
          animationDuration={1000}
          animationType="fadeout"
          infinite
          disableDotsControls
          autoHeight
        />
      </div>
      <div className="flex flex-col items-center justify-content w-full px-3 text-[#996633]">
        {collections.map((collection: any, index: any) => {
          return (
            <div className="flex flex-row w-full border-[1px] border-solid border-[#996633] my-5">
              {index % 2 ? (
                <div className="w-[50%] border-[#996633] border-[1px] border-solid items-center justify-center">
                  <div className="font-bold">{collection.title}</div>
                  <div>{collection.description}</div>
                </div>
              ) : (
                <img
                  src={collection.image}
                  className="w-[50%] border-[#996633] border-[1px] border-solid cursor-pointer"
                  onClick={() => history(`/collections/${collection.title}`)}
                ></img>
              )}
              {index % 2 === 0 ? (
                <div className="w-[50%] border-[#996633] border-[1px] border-solid items-center justify-center">
                  <div className="font-bold">{collection.title}</div>
                  <div>{collection.description}</div>
                </div>
              ) : (
                <img
                  src={collection.image}
                  className="w-[50%] border-[#996633] border-[1px] border-solid cursor-pointer"
                  onClick={() => history(`/collections/${collection.title}`)}
                ></img>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
