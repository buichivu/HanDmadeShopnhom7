import React from "react";
import menu from "../assets/svgs/menu.svg";
import logo from "../assets/svgs/logo.svg";
import cart from "../assets/svgs/cart.svg";
import search from "../assets/svgs/search.svg";
import next from "../assets/svgs/next.svg";
import logo_white from "../assets/svgs/logo_white.svg";
import menu_white from "../assets/svgs/menu_white.svg";
import back_arrow from "../assets/svgs/back_arrow.svg";
import arrow_down from "../assets/svgs/arrow_down.svg";
import sort from "../assets/svgs/sort.svg";
import filter from "../assets/svgs/filter.svg";
import heart_white from "../assets/svgs/heart_white.svg";
import heart_black from "../assets/svgs/heart_black.svg";
import check from "../assets/svgs/check.svg";
import star from "../assets/svgs/star.svg";
import star_silver from "../assets/svgs/star_silver.svg";
import play from "../assets/svgs/play.svg";
import share from "../assets/svgs/share.svg";
import arrow_next from "../assets/svgs/arrow_next.svg";
import subtract from "../assets/svgs/subtract.svg";
import plus from "../assets/svgs/plus.svg";

const SVGs = {
  menu,
  logo,
  cart,
  search,
  next,
  menu_white,
  logo_white,
  back_arrow,
  arrow_down,
  sort,
  filter,
  heart_black,
  heart_white,
  check,
  star,
  star_silver,
  play,
  share,
  arrow_next,
  subtract,
  plus,
};

export default {
  Icons: ({ name = "", height, width }) => {
    if (name in SVGs) {
      const Icons = SVGs[name];
      return <Icons name={name} height={height} width={width} />;
    } else {
      return null;
    }
  },
};
