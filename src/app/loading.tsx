"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Loading() {
  return (
    // <div className="spinner center">
    //   <div className="spinner-blade"></div>
    //   <div className="spinner-blade"></div>
    //   <div className="spinner-blade"></div>
    //   <div className="spinner-blade"></div>
    //   <div className="spinner-blade"></div>
    //   <div className="spinner-blade"></div>
    //   <div className="spinner-blade"></div>
    //   <div className="spinner-blade"></div>
    //   <div className="spinner-blade"></div>
    //   <div className="spinner-blade"></div>
    //   <div className="spinner-blade"></div>
    //   <div className="spinner-blade"></div>
    // </div>
    <div className="w-full min-h-[50vh] h-full flex items-center justify-center">
      <div className="loader"></div>
    </div>
  );
}
