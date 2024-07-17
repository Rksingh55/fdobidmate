import { useEffect } from 'react';
import Image from 'next/image';

const ImageZoom = ({ src, alt }) => {
  useEffect(() => {
    const imageZoom = (imgID, resultID) => {
      let img, lens, result, cx, cy;
      img = document.getElementById(imgID);
      result = document.getElementById(resultID);
      lens = document.createElement('DIV');
      lens.setAttribute('class', 'img-zoom-lens');
      img.parentElement.insertBefore(lens, img);
      cx = result.offsetWidth / lens.offsetWidth;
      cy = result.offsetHeight / lens.offsetHeight;
      result.style.backgroundImage = `url(${img.src})`;
      result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;
      lens.addEventListener('mousemove', moveLens);
      img.addEventListener('mousemove', moveLens);
      lens.addEventListener('touchmove', moveLens);
      img.addEventListener('touchmove', moveLens);

      img.addEventListener('mouseenter', () => {
        result.style.display = 'block';
      });

      img.addEventListener('mouseleave', () => {
        result.style.display = 'none';
      });

      function moveLens(e) {
        let pos, x, y;
        e.preventDefault();
        pos = getCursorPos(e);
        x = pos.x - lens.offsetWidth / 2;
        y = pos.y - lens.offsetHeight / 2;
        if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
        if (x < 0) x = 0;
        if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
        if (y < 0) y = 0;
        lens.style.left = `${x}px`;
        lens.style.top = `${y}px`;
        result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
      }

      function getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x -= window.scrollX;
        y -= window.scrollY;
        return { x, y };
      }
    };

    imageZoom('myimage', 'myresult');
  }, []);

  return (
    <div className="img-zoom-container relative">
      <Image
        id="myimage"
        src={src}
        width={500}
        height={440}
        alt={alt}
      />
      <div id="myresult" className="img-zoom-result border absolute"></div>
    </div>
  );
};

export default ImageZoom;
