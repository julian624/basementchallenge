'use cleint'
import React, { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";

export default function Loader() {
  const [allIsLoaded, setAllIsLoaded] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);

  useLayoutEffect(() => {
    const images = Array.from(document.images);
    const len = images.length;
    let counter = 0;

    if (len === 0) {
      setProgressValue(100);
      setAllIsLoaded(true);
    } else {
      const loadImage = (image: HTMLImageElement) => {
        return new Promise<void>((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = image.src;
          loadImg.onload = () => {
            counter++;
            const currentProgress = Math.round((counter / len) * 100);
            setProgressValue(currentProgress);
            resolve();
          };
          loadImg.onerror = (err) => reject(err);
        });
      };

      Promise.all(images.map((image) => loadImage(image)))
        .then(() => {
          setProgressValue(100);
          setAllIsLoaded(true);
        })
        .catch((err) => {
          setAllIsLoaded(true);
          console.log("failed to load images", err);
        });
    }
  }, []);

  return (
    <>
      <motion.div
        animate={allIsLoaded ? { opacity: 0 } : ""}
        transition={{ duration: 1.5, delay: 1 }}
        className="firstloadercontainer"
      >
        <motion.h1
          style={{ pointerEvents: "none" }}
          transition={{ duration: 2 }}
          animate={allIsLoaded ? { opacity: 0, y: -100 } : ""}
        >
          {progressValue}%
        </motion.h1>
      </motion.div>
    </>
  );
}
