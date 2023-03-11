import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import rupiahFormater from "../../../utils/rupiahFormater";

const ProductsFeatured = ({ price, discountPrice, slug, title, img }) => {
  const navigate = useNavigate()
  return (
  <div className="col-span-1 h-full flex flex-col justify-between px-5 lg:px-0">
    <div className="w-full h-[530px] border border-gray-100 rounded overflow-hidden">
      <img onClick={() => navigate(`/product/${slug}`)} alt={slug} src={img} className="w-full h-full object-cover hover:opacity-70 transition-all duration-300 cursor-pointer" />
    </div>
    <Link to={`/product/${slug}`} className="tracking-wide font-semibold mt-3 ">
      {title}
    </Link>
    <span className="text-gray-500 flex tracking-wide">
      {rupiahFormater(discountPrice ? discountPrice : price)}
      {discountPrice && (
        <span className="text-sm block ml-1 line-through text-gray-400">
          {rupiahFormater(price)}
        </span>
      )}
    </span>
  </div>
)};

const ProductsFeaturedSkelton = () =>
  Array.from({ length: 3 }).map((_, i) => (
    <div
      className="col-span-1 h-full flex flex-col justify-between animate-pulse px-5 lg:px-0"
      key={i}
    >
      <div className="w-full h-[530px] bg-gray-300 rounded"></div>
      <p className="bg-gray-300 w-[200px] h-5 mt-3 rounded"></p>
      <span className="bg-gray-300 flex h-5 w-[150px] rounded mt-3"></span>
    </div>
  ));

export default function OurFeatured() {
  const { data, isLoading } = useFetch(
    "/api/products?populate=img&filters[type][$eq]=Featured"
  );
  return (
    <section>
      <div className="mx-auto container lg:mt-32 mt-10 px-2 lg:px-0">
        <h2 className="text-2xl font-bold">Our Products Featured</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:h-[600px] lg:gap-14 mt-10 gap-8">
          {isLoading ? (
            <ProductsFeaturedSkelton />
          ) : (
            data?.data?.map(({ attributes: item, id }) => {
              return (
                <ProductsFeatured
                  title={item.title}
                  price={item.price}
                  discountPrice={item.priceDiscount}
                  slug={item.slug}
                  img={item.img.data.attributes.url}
                  key={id}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
