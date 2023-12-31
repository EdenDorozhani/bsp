import Loader from "../Loader";
import PropertyCard from "../PropertyCard";
import classes from "./PropertiesList.module.css";
import { PropertiesListProps } from "./types";
import React from "react";

const PropertieList = ({
  cardsInfo,
  isLoading,
  animationType,
}: PropertiesListProps) => {
  return (
    <div className={classes.cont}>
      {isLoading ? (
        <Loader start />
      ) : (
        cardsInfo?.map((card, index) => (
          <PropertyCard
            key={index}
            buisnessType={card.business_type}
            id={card.id}
            title={card.title}
            zone={card.zone}
            propertyType={card.property_type}
            reference={card.reference}
            price={card.price}
            image={card.image}
            city={card.city}
            grosArea={card.gros_area}
            balcony={card.balcony_area}
            bathrooms={card.bathrooms}
            bedrooms={card.bedrooms}
            animationType={animationType}
          />
        ))
      )}
    </div>
  );
};

export default PropertieList;
