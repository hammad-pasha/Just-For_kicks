import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://th.bing.com/th/id/R.65138dbd196569257a0f3bf9db3345de?rik=wCS49hxUZn8%2fRw&pid=ImgRaw&r=0"
            alt=""
            style={{width:"150px", objectFit:"contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://th.bing.com/th/id/R.5d140629bd1eb88348c23cfcba13801b?rik=giLXckv6QdUOgQ&riu=http%3a%2f%2f2.bp.blogspot.com%2f-qaXQH8brdS8%2fUTJrGVjyDHI%2fAAAAAAAAABg%2fKTCk38iZJ9k%2fs1600%2fLogo%2bPuma.jpg&ehk=MeXAaq2lCNP4w143%2bXRDB%2fxiDAIbbTr7N%2fKnKemcBhs%3d&risl=&pid=ImgRaw&r=0"
            style={{width:"150px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://th.bing.com/th/id/R.6b0e329e8b1e9fa7a580ca6352369407?rik=%2bAkfpqwWhdZKaw&pid=ImgRaw&r=0"
            style={{width:"150px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://th.bing.com/th/id/R.5d140629bd1eb88348c23cfcba13801b?rik=giLXckv6QdUOgQ&riu=http%3a%2f%2f2.bp.blogspot.com%2f-qaXQH8brdS8%2fUTJrGVjyDHI%2fAAAAAAAAABg%2fKTCk38iZJ9k%2fs1600%2fLogo%2bPuma.jpg&ehk=MeXAaq2lCNP4w143%2bXRDB%2fxiDAIbbTr7N%2fKnKemcBhs%3d&risl=&pid=ImgRaw&r=0"
            style={{width:"150px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://th.bing.com/th/id/R.4d4a8f23bece4b507c3e0586aea150c0?rik=4SeNWDBJIPpnVg&pid=ImgRaw&r=0"
            style={{width:"150px", objectFit:"contain"}}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
