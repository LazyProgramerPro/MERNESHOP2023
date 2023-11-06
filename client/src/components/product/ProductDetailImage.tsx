/* eslint-disable @typescript-eslint/no-explicit-any */

interface ProductDetailImageProps{
  images:any;
}

export default function ProductDetailImage(props:ProductDetailImageProps) {
  const {images} = props

  console.log("images:",images)
  return (
    <div>   {JSON.stringify(images)}
      
    </div>
  )
}
