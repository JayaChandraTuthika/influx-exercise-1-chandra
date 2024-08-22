import Faqs from "@/components/Faqs";
import Header from "../../components/Header";
import Subscription from "../../components/Subscription";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="hero-section">
        <Header />
        <div className="banner-section">
          <h1>MVP subscription</h1>
          <p>Your go-to Movie Membership Program</p>
        </div>
      </div>
      <Subscription />
      <Faqs />
      <Footer />
    </>
  );
}
