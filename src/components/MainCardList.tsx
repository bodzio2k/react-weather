import { Swiper, SwiperSlide } from "swiper/react";
import CurrentLocationCard from "./CurrentLocationCard";
// import 'swiper/css';

<Swiper
  slidesPerView={3}
  spaceBetween={10}
  onSlideChange={() => console.log("slide change")}
>
  {items.map((item) => (
    <SwiperSlide key={item.id}>
      <CurrentLocationCard item={item} />
    </SwiperSlide>
  ))}
</Swiper>;
