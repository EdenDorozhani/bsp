import classes from "./PropertyCard.module.css";
import { Link } from "react-router-dom";
import PropertyType from "../PropertyType";
import PropertyReference from "../PropertyReference";
import Paragraph from "../Paragraph/Paragraph";
import { motion } from "framer-motion";

const PropertieCard = ({
  buisnessType,
  title,
  zone,
  propertyType,
  reference,
  price,
  image,
  availability,
  city,
  grosArea,
  balcony,
  bathrooms,
  bedrooms,
  id,
}) => {
  return (
    <Link
      to={`property/${id}/${reference}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <motion.div
        className={classes.cardCont}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={classes.relative}>
          <PropertyType content={propertyType} />
          <PropertyReference content={reference} type={availability} />
          <img src={image} className={classes.image} />
        </div>
        <div className={classes.info}>
          <div>
            <Paragraph content={price} type="number" price={"yes"} />
            <p className={classes.buisnessType}>{buisnessType}</p>
          </div>
          <p> {title}</p>
          <div className={classes.space}>
            {grosArea} m<sup>2</sup>
            {balcony !== "0" && (
              <Paragraph content={`|  ${balcony} balcony `} type="number" />
            )}
            {bathrooms !== "0" && (
              <Paragraph content={`|  ${bathrooms} baths `} type="number" />
            )}
            {bedrooms !== "0" && (
              <Paragraph content={`|  ${bedrooms} beds `} type="number" />
            )}
          </div>
          <p className={classes.place}>{`${city}, ${zone}`}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default PropertieCard;
