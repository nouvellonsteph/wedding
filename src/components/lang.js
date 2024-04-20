'use client'
import { useState } from "react";
import React from 'react'
import {Link, Divider} from "@nextui-org/react";

const Lang = () => {

  return (
    <div className="flex flex-row-reverse bg-amber-50 font-raleway font-small items-right">
        <Link className="opacity-50 mx-3" href="#">
              FR
        </Link>
        <div>
        <Divider orientation="vertical"/>
        </div>
        <Link className="opacity-50 mx-3" href="#">
            EN
        </Link>
        <div>
        <Divider orientation="vertical"/>
        </div>
        <Link className="opacity-50 mx-3" href="#">
          RU
        </Link>
    </div>
  );
}

export default Lang;


