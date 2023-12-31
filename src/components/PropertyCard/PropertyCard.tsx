import classes from "./PropertyCard.module.css";
import { Link } from "react-router-dom";
import Paragraph from "../Paragraph/Paragraph";
import { motion } from "framer-motion";
import React from "react";
import { PropertyCardProps } from "./types";
import { cardAnimationOpt } from "./configs";
import CardTag from "../CardTag";

const PropertieCard = ({
  buisnessType,
  title,
  zone,
  propertyType,
  reference,
  price,
  image,
  city,
  grosArea,
  balcony,
  bathrooms,
  bedrooms,
  id,
  animationType,
}: PropertyCardProps) => {
  const maxLength = 20;

  const shouldTruncade = title.length > maxLength;

  const truncadedTitle = shouldTruncade
    ? `${title.slice(0, maxLength)}...`
    : title;

  const options = cardAnimationOpt(animationType);

  const balconyInfo = balcony !== "0" && (
    <Paragraph content={`|  ${balcony} balcony `} type="number" />
  );

  const bathroomsInfo = bathrooms !== "0" && (
    <Paragraph content={`|  ${bathrooms} baths `} type="number" />
  );

  const bedroomsInfo = bedrooms !== "0" && (
    <Paragraph content={`|  ${bedrooms} beds `} type="number" />
  );

  return (
    <Link
      to={`property/${id}/${reference}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <motion.div {...options} className={classes.cardCont}>
        <div className={classes.relative}>
          <CardTag content={propertyType} type="property" />
          <CardTag content={reference} type="reference" />
          <img src={image} className={classes.image} />
        </div>
        <div className={classes.info}>
          <div>
            <Paragraph content={price} type="number" price={"yes"} />
            <p className={classes.buisnessType}>{buisnessType}</p>
          </div>
          <p> {truncadedTitle}</p>
          <div className={classes.space}>
            {grosArea} m<sup>2</sup>
            {balconyInfo}
            {bathroomsInfo}
            {bedroomsInfo}
          </div>
          <p className={classes.place}>{`${city}, ${zone}`}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default PropertieCard;
