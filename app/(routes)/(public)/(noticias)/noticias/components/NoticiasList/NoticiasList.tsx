"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;

export function NoticiasList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState([]);

  return <div className="space-y-8">{}</div>;
}
