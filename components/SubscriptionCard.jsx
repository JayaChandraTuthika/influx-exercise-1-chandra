import Image from "next/image";
import React from "react";

const SubscriptionCard = ({ data }) => {
  const { imageUrl, title, description, sup } = data;
  return (
    <div className="subscription-card">
      <Image src={imageUrl} height={30} width={40} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default SubscriptionCard;
