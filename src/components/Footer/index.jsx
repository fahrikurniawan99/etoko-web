import React, { useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "../Accordion";
import Button from "../Button";

export default function Footer() {
  const [active, setActive] = useState(1);
  return (
    <section>
      <div className="container mx-auto lg:mt-32 mt-10">
        <div className="lg:flex justify-between lg:h-[250px]">
          <div className="h-full px-2 lg:px-0">
            <Link
              to={"/"}
              className="italic font-bold text-gray-800 text-2xl"
              style={{ letterSpacing: -1.4 }}
            >
              E-Toko
            </Link>
            <p className="text-gray-500 tracking-tight">
              Online shopping made easy.
            </p>
          </div>
          <div className="lg:flex h-full hidden">
            <div className="w-[160px] ml-auto">
              <h1 className="tracking-tight font-medium">Shop</h1>
              <ul className="space-y-4 mt-4">
                <li className="tracking-tigh text-gray-500 text-sm">
                  <Link to="/products/1">Men</Link>
                </li>
                <li className="tracking-tigh text-gray-500 text-sm">
                  <Link to="/products/2">Women</Link>
                </li>
                <li className="tracking-tigh text-gray-500 text-sm">
                  <Link to="/products/3">Child</Link>
                </li>
                <li className="tracking-tigh text-gray-500 text-sm">
                  <Link to="/products/4">Accessories</Link>
                </li>
              </ul>
            </div>
            <div className="w-[160px]">
              <h1 className="tracking-tight font-medium">Connect</h1>
              <ul className="space-y-4 mt-4">
                <li className="tracking-tigh text-gray-500 text-sm">
                  Contact Us
                </li>
                <li className="tracking-tigh text-gray-500 text-sm">
                  Instagram
                </li>
                <li className="tracking-tigh text-gray-500 text-sm">Twitter</li>
                <li className="tracking-tigh text-gray-500 text-sm">
                  Pinterest
                </li>
              </ul>
            </div>
            <div className="w-[400px]">
              <h1 className="tracking-tight font-medium">
                Sign Up for Newsletter
              </h1>
              <ul className="space-y-4 mt-4">
                <li className="tracking-tigh text-gray-500 text-sm">
                  The latest deals and savings, sent to your inbox weekly.
                  <div className="flex gap-3 mt-2">
                    <input className="outline-none text-sm border border-gray-200 rounded py-2 px-3 w-full" />
                    <Button text={"Sign Up"} />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:hidden">
            <Accordion
              active={active}
              toggleAccordion={setActive}
              index={1}
              title={"Shop"}
            >
              <ul className="space-y-4 mt-4">
                <li className="tracking-tigh text-gray-500 text-sm">
                  <Link to="/products/1">Men</Link>
                </li>
                <li className="tracking-tigh text-gray-500 text-sm">
                  <Link to="/products/2">Women</Link>
                </li>
                <li className="tracking-tigh text-gray-500 text-sm">
                  <Link to="/products/3">Child</Link>
                </li>
                <li className="tracking-tigh text-gray-500 text-sm">
                  <Link to="/products/4">Accessories</Link>
                </li>
              </ul>
            </Accordion>
            <Accordion
              active={active}
              toggleAccordion={setActive}
              index={2}
              title={"Connect"}
            >
              <ul className="space-y-4 mt-4">
                <li className="tracking-tigh text-gray-500 text-sm">
                  Contact Us
                </li>
                <li className="tracking-tigh text-gray-500 text-sm">
                  Instagram
                </li>
                <li className="tracking-tigh text-gray-500 text-sm">Twitter</li>
                <li className="tracking-tigh text-gray-500 text-sm">
                  Pinterest
                </li>
              </ul>
            </Accordion>
            <Accordion
              active={active}
              toggleAccordion={setActive}
              index={3}
              title={"Sign Up for Newsletter"}
            >
              <ul className="space-y-4 mt-4">
                <li className="tracking-tigh text-gray-500 text-sm">
                  The latest deals and savings, sent to your inbox weekly.
                  <div className="flex gap-3 mt-2">
                    <input className="outline-none text-sm border border-gray-200 rounded py-2 px-3 w-full" />
                    <Button text={"Sign Up"} />
                  </div>
                </li>
              </ul>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
