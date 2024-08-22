"use client";

const { createContext, useState, useContext } = require("react");

const AppContext = createContext({
  subscriptionDetails: {
    theatre: "Test",
    billingCycle: "Test",
    loginEmail: "Test",
    checkoutDetails: {
      cardNumber: "0002515411458",
      time: new Date(),
    },
  },
});

const AppContextProvider = ({ children }) => {
  const [details, setDetails] = useState({
    theatre: "Test",
    billingCycle: "Test",
    loginEmail: "Test",
    checkoutDetails: {
      cardNumber: "0002515411458",
      time: new Date(),
    },
  });
  const updateSubscriptionDetails = (val) => {
    setDetails(val);
  };
  return (
    <AppContext.Provider
      value={{
        subscriptionDetails: details,
        updateSubscriptionDetails: updateSubscriptionDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default AppContextProvider;
