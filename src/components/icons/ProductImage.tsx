import ImageGallery from "react-image-gallery";

// Importe as imagens dos produtos
import image1 from "./images/product1.jpg";
import image2 from "./images/product2.jpg";
import image3 from "./images/product3.jpg";

interface propsImg{
  imageUrl: string;
}

// Defina a lista de imagens
const images = [
  {
    original: image1,
    thumbnail: image1,
  },
  {
    original: image2,
    thumbnail: image2,
  },
  {
    original: image3,
    thumbnail: image3,
  },
];

function ProductImage() {
  return <ImageGallery items={images} />;
}

export default ProductImage;